import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { Ref, VNode } from 'vue'
import type { ProFieldLightProps } from '../typing'
import { childrenToArray, isSpecialNode, useState } from '@antdv-next/pro-utils'
import { cloneVNode, defineComponent, isVNode, shallowRef } from 'vue'

export type FieldHOCProps = ProFieldLightProps & {
  isLight?: boolean
}

const FieldHOC = defineComponent<FieldHOCProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
}>>(
  (props, { slots, expose }) => {
    const [labelTrigger, setLabelTrigger] = useState(false)
    const lightLabel = shallowRef<{
      labelRef?: Ref<HTMLSpanElement>
      clearRef?: Ref<HTMLSpanElement>
    }>()

    // 是label且不是label里面的clear图标触发事件
    const isTriggeredByLabel = (e: MouseEvent) => {
      // 两条语句结果分别命名，可读性好点
      const isLabelMouseDown = lightLabel.value?.labelRef?.value?.contains(e.target as HTMLElement)
      const isClearMouseDown = lightLabel.value?.clearRef?.value?.contains(e.target as HTMLElement)
      return isLabelMouseDown && !isClearMouseDown
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (isTriggeredByLabel(e)) {
        setLabelTrigger(true)
      }
    }
    const handleMouseUp = () => setLabelTrigger(false)
    expose({})
    return () => {
      if (props.isLight) {
        return (
          <div onMousedown={handleMouseDown} onMouseup={handleMouseUp}>
            { childrenToArray(slots.default?.(), true).map((item: VNode<any, any, { [key: string]: any }>) => {
              if (isVNode(item) && !isSpecialNode(item)) {
                return cloneVNode(item, {
                  labelTrigger: labelTrigger.value,
                  lightLabel,
                })
              }
              return item
            })}
          </div>
        )
      }
      return <>{ slots.default?.()}</>
    }
  },
  {
    name: 'FieldHOC',
    inheritAttrs: false,
  },
)

export default FieldHOC
