import type { PropType } from 'vue';
import type { ProFieldFC } from '../../typing';
import { defineComponent } from 'vue';
import { DatePicker } from 'ant-design-vue';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useIntl } from '@ant-design-vue/pro-provider';
import { parseValueToDay } from '@ant-design-vue/pro-utils';

dayjs.extend(weekOfYear);

const formatDate = (
  text: dayjs.ConfigType,
  format: string | string[] | ((value: dayjs.Dayjs) => string)
) => {
  if (!text) return '-';
  if (typeof format === 'function') {
    return format(dayjs(text));
  } else {
    return dayjs(text).format((Array.isArray(format) ? format[0] : format) || 'YYYY-MM-DD');
  }
};

const FieldDatePicker = defineComponent({
  name: 'FieldDatePicker',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<ProFieldFC['mode']>,
      default: undefined,
    },
    text: {
      type: [String, Object, Number] as PropType<ProFieldFC['text']>,
      default: undefined,
    },
    customRender: {
      type: Function as PropType<ProFieldFC['customRender']>,
      default: undefined,
    },
    renderFormItem: {
      type: Function as PropType<ProFieldFC['renderFormItem']>,
      default: undefined,
    },
    fieldProps: {
      type: Object as PropType<ProFieldFC['fieldProps']>,
      default: undefined,
    },
    format: {
      type: String as PropType<string>,
      default: undefined,
    },
    light: {
      type: Boolean as PropType<ProFieldFC['light']>,
      default: undefined,
    },
    picker: {
      type: String as PropType<'time' | 'date' | 'week' | 'month' | 'quarter' | 'year'>,
      default: undefined,
    },
    showTime: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    plain: {
      type: Boolean as PropType<ProFieldFC['plain']>,
      default: undefined,
    },
  },
  setup(props) {
    const intl = useIntl();
    // const [open, setOpen] = useState<boolean>(false);

    return () => {
      const { mode, text, customRender, plain, picker, showTime, light, fieldProps, format } =
        props;

      if (mode === 'read') {
        const dom = formatDate(text as dayjs.ConfigType, fieldProps.format || format);
        if (customRender) {
          return customRender(text, { mode, ...fieldProps }, <>{dom}</>);
        }
        return <>{dom}</>;
      }
      if (mode === 'edit' || mode === 'update') {
        let dom;
        const {
          value,
          placeholder = intl.value.getMessage({
            id: 'tableForm.selectPlaceholder',
            defaultMessage: '请选择',
          }),
        } = fieldProps;
        const dayValue = parseValueToDay(value) as dayjs.Dayjs;
        if (light) {
          return 'light';
          // dom = (
          //   <FieldLabel
          //     label={label}
          //     onClick={() => {
          //       fieldProps?.onOpenChange?.(true);
          //       setOpen(true);
          //     }}
          //     style={
          //       dayValue
          //         ? {
          //             paddingInlineEnd: 0,
          //           }
          //         : undefined
          //     }
          //     disabled={disabled}
          //     value={
          //       dayValue || open ? (
          //         <DatePicker
          //           picker={picker}
          //           showTime={showTime}
          //           format={format}
          //           ref={ref}
          //           {...fieldProps}
          //           value={dayValue}
          //           onOpenChange={(isOpen) => {
          //             setOpen(isOpen);
          //             fieldProps?.onOpenChange?.(isOpen);
          //           }}
          //           {...compatibleBorder(false)}
          //           open={open}
          //         />
          //       ) : undefined
          //     }
          //     allowClear={false}
          //     downIcon={dayValue || open ? false : undefined}
          //     bordered={bordered}
          //     ref={lightLabel}
          //   />
          // );
        } else {
          dom = (
            <DatePicker
              picker={picker}
              showTime={showTime}
              format={format}
              bordered={plain === undefined ? true : !plain}
              placeholder={placeholder}
              {...fieldProps}
              value={dayValue}
            />
          );
        }
        return dom;
      }
      return null;
    };
  },
});

export default FieldDatePicker;
