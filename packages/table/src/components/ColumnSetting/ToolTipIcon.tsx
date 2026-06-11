import type { ColumnsState } from '../../Store/Provide'
import { Tooltip } from 'antdv-next'
import { defineComponent, reactive } from 'vue'
import { useTableContextInject } from '../../Store/Provide'

export interface ToolTipIconProps {
  title?: string
  columnKey?: string | number
  show?: boolean
  fixed?: 'start' | 'end'
}

const ToolTipIcon = defineComponent<ToolTipIconProps>((props, { slots }) => {
  const { columnsMap, setColumnsMap } = useTableContextInject()
  return () => {
    if (!props.show) {
      return null
    }
    return (
      <Tooltip title={props.title}>
        <span
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            const config = columnsMap?.value?.[props.columnKey!] || {}
            const columnKeyMap = {
              ...columnsMap?.value,
              [props.columnKey!]: reactive({ ...config, fixed: props.fixed } as ColumnsState),
            }
            setColumnsMap?.(columnKeyMap)
          }}
        >
          {slots.default?.()}
        </span>
      </Tooltip>
    )
  }
}, {
  name: 'ToolTipIcon',
  inheritAttrs: false,
})

export default ToolTipIcon
