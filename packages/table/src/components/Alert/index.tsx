import type { ExtractPropTypes, PropType } from 'vue';
import type { Key } from 'ant-design-vue/es/_util/type';
import type { AlertRender } from '../../RenderTypings';
import { defineComponent, computed } from 'vue';
import { Alert } from 'ant-design-vue';
import { alertProps } from 'ant-design-vue/es/alert';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
// import { useIntl } from '@ant-design-vue/pro-provider';
import { useStyle } from './style';
import { classNames } from '@ant-design-vue/pro-utils';

const tableAlertProps = () => ({
  ...alertProps(),
  selectedRowKeys: {
    type: Array as PropType<Key[]>,
    default: undefined,
  },
  selectedRows: {
    type: Array as PropType<any[]>,
    default: undefined,
  },
  alwaysShowAlert: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  alertInfoRender: {
    type: [Boolean, Function] as PropType<AlertRender>,
    default: undefined,
  },
  onCleanSelected: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  alertOptionRender: {
    type: [Boolean, Function] as PropType<AlertRender>,
    default: undefined,
  },
});

export type TableAlertProps = Partial<ExtractPropTypes<ReturnType<typeof tableAlertProps>>>;

const TableAlert = defineComponent({
  name: 'TableAlert',
  inheritAttrs: false,
  props: tableAlertProps(),
  setup(props) {
    const { getPrefixCls } = useConfigContextInject();
    const className = computed(() => props.prefixCls || getPrefixCls('pro-table-alert'));
    const { wrapSSR, hashId } = useStyle(className);
    // const intl = useIntl();

    return () => {
      return wrapSSR(<Alert class={classNames(className.value, hashId.value)} />);
    };
  },
});

export default TableAlert;
