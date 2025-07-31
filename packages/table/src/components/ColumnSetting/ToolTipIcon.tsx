import type { PropType } from 'vue';
import type { ColumnsState } from '../../Store/Provide';
import { defineComponent, reactive } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { useTableContextInject } from '../../Store/Provide';

const ToolTipIcon = defineComponent({
  name: 'ToolTipIcon',
  inheritAttrs: false,
  props: {
    title: {
      type: String as PropType<string>,
      default: undefined,
    },
    columnKey: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    show: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    fixed: {
      type: String as PropType<'left' | 'right'>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const { columnsMap, setColumnsMap } = useTableContextInject();
    return () => {
      if (!props.show) {
        return null;
      }
      return (
        <Tooltip title={props.title}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const config = columnsMap.value?.[props.columnKey!] || {};
              const columnKeyMap = {
                ...columnsMap.value,
                [props.columnKey!]: reactive({ ...config, fixed: props.fixed } as ColumnsState),
              };
              setColumnsMap(columnKeyMap);
            }}
          >
            {slots.default?.()}
          </span>
        </Tooltip>
      );
    };
  },
});

export default ToolTipIcon;
