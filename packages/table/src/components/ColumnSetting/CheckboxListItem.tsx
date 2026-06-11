import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import {
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@antdv-next/icons'
import { useIntl, useProConfig } from '@antdv-next/pro-provider'
import { classNames } from '@v-c/util'
import { defineComponent } from 'vue'
import ToolTipIcon from './ToolTipIcon'

export interface CheckboxListItemProps {
  columnKey: string | number
  title?: VueNode
  fixed?: boolean | 'start' | 'end'
  showListItemOption?: boolean
  isLeaf?: boolean
}

const CheckboxListItem = defineComponent<CheckboxListItemProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>((props, { attrs }) => {
  const intl = useIntl()
  const proProvide = useProConfig()
  return () => {
    const { isLeaf, columnKey, fixed, title, showListItemOption } = props
    return (
      <span
        class={classNames(`${attrs.class}-list-item`, proProvide.value.hashId)}
        key={columnKey}
      >
        <span class={classNames(`${attrs.class}-list-item-title`, proProvide.value.hashId)}>
          {title}
        </span>
        {showListItemOption && !isLeaf ? (
          <span class={classNames(`${attrs.class}-list-item-option`, proProvide.value.hashId)}>
            <ToolTipIcon
              columnKey={columnKey}
              fixed="start"
              title={intl.value.getMessage({
                id: 'tableToolBar.startPin',
                defaultMessage: '固定在列首',
              })}
              show={props.fixed !== 'start'}
            >
              <VerticalAlignTopOutlined />
            </ToolTipIcon>
            <ToolTipIcon
              columnKey={columnKey}
              fixed={undefined}
              title={intl.value.getMessage({ id: 'tableToolBar.noPin', defaultMessage: '不固定' })}
              show={!!fixed}
            >
              <VerticalAlignMiddleOutlined />
            </ToolTipIcon>
            <ToolTipIcon
              columnKey={columnKey}
              fixed="end"
              title={intl.value.getMessage({
                id: 'tableToolBar.endPin',
                defaultMessage: '固定在列尾',
              })}
              show={fixed !== 'end'}
            >
              <VerticalAlignBottomOutlined />
            </ToolTipIcon>
          </span>
        ) : null}
      </span>
    )
  }
}, {
  name: 'CheckboxListItem',
  inheritAttrs: false,
})
export default CheckboxListItem
