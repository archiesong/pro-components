import type {
  ProHelpDataSource,
  ProHelpDataSourceChildren,
} from './HelpProvide'
import { useEffect, useState } from '@antdv-next1/pro-utils'
import { Spin } from 'antdv-next'
import { defineComponent } from 'vue'
import { useProHelpContext } from './HelpProvide'
import RenderContentPanel from './RenderContentPanel'

export interface AsyncContentPanelProps {
  item?: ProHelpDataSource<any>['children'][number]
  onInit?: (ref: HTMLDivElement) => void
}

const AsyncContentPanel = defineComponent<AsyncContentPanelProps>((props) => {
  const proHelpContextProvide = useProHelpContext() // 获取上下文中的 onLoadContext
  const [loading, setLoading] = useState(false) // 加载状态
  const [content, setContent] = useState<ProHelpDataSourceChildren<any>[]>() // 内容数据
  useEffect(() => {
    if (!props.item?.key)
      return // 如果没有key则返回
    setLoading(true) // 开始加载
    proHelpContextProvide.value.onLoadContext?.(props.item.key, props.item).then((res) => {
      // 调用加载方法
      setLoading(false) // 加载完成
      setContent(res) // 设置内容数据
    })
  }, [() => props.item?.key])

  return () => {
    const { item, onInit } = props
    // 如果没有key，则返回null
    if (!props.item?.key)
      return null
    // 如果正在加载并且有key，则显示加载中的状态
    if (loading.value && item?.key) {
      return (
        <div
          key={item.key}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box',
            padding: '24px',
          }}
        >
          <Spin />
        </div>
      )
    }
    // 加载完成后，渲染内容面板
    return (
      <RenderContentPanel
        onInit={(ref) => {
          onInit?.(ref)
        }}
        dataSourceChildren={content.value!}
      />
    )
  }
}, {
  name: 'AsyncContentPanel',
  inheritAttrs: false,
})

export default AsyncContentPanel
