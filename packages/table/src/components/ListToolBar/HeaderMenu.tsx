import type { Key, VueNode } from '@antdv-next/pro-utils'
import { DownOutlined } from '@antdv-next/icons'
import { useProConfig } from '@antdv-next/pro-provider'
import { classNames, useMergedState } from '@v-c/util'
import { Dropdown, Space, Tabs } from 'antdv-next'
import { defineComponent, toRef } from 'vue'

export interface ListToolBarMenuItem {
  key: Key
  label: VueNode
  disabled?: boolean
}

export interface ListToolBarHeaderMenuProps {
  type?: 'inline' | 'dropdown' | 'tab'
  activeKey?: Key
  defaultActiveKey?: Key
  items?: ListToolBarMenuItem[]
  onChange?: (activeKey?: Key) => void
  prefixCls?: string
  hashId?: string
}
const HeaderMenu = defineComponent<ListToolBarHeaderMenuProps>((props) => {
  const proProvide = useProConfig()
  const [activeKey, setActiveKey] = useMergedState<Key | undefined>(
    props.activeKey || (props.defaultActiveKey as Key),
    {
      value: toRef(() => props.activeKey),
      onChange: props.onChange,
    },
  )

  return () => {
    const { items = [], hashId, type = 'inline', prefixCls } = props
    if (items.length < 1) {
      return null
    }
    const activeItem
      = items.find((item) => {
        return item.key === activeKey.value
      }) || items[0]
    if (type === 'inline') {
      return (
        <div
          class={classNames(
            `${prefixCls}-menu`,
            `${prefixCls}-inline-menu`,
            hashId || proProvide.value.hashId,
          )}
        >
          {items.map((item, index) => (
            <div
              key={item.key || index}
              onClick={() => setActiveKey(item.key)}
              class={classNames(
                `${prefixCls}-inline-menu-item`,
                activeItem?.key === item.key ? `${prefixCls}-inline-menu-item-active` : undefined,
                hashId || proProvide.value.hashId,
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      )
    }
    if (type === 'tab') {
      return (
        <Tabs
          activeKey={activeItem?.key as string}
          items={items.map(item => ({
            ...item,
            key: item.key?.toString(),
          }))}
          onTabClick={key => setActiveKey(key)}
        />

      )
    }
    return (
      <div class={classNames(`${prefixCls}-menu`, `${prefixCls}-dropdownmenu`, hashId || proProvide.value.hashId)}>
        <Dropdown
          trigger={['click']}
          menu={{
            selectedKeys: [activeItem?.key as string],
            onClick: (item) => {
              setActiveKey(item.key)
            },
            items: items.map((item, index) => ({
              key: item.key || index,
              disabled: item.disabled,
              label: item.label,
            })),
          }}
          v-slots={{
            default: () => (
              <Space class={classNames(`${prefixCls}-dropdownmenu-label`, hashId || proProvide.value.hashId)}>
                {activeItem?.label}
                <DownOutlined />
              </Space>
            ),
          }}
        />
      </div>
    )
  }
}, {
  name: 'ListToolBarHeaderMenu',
  inheritAttrs: false,

})

export default HeaderMenu
