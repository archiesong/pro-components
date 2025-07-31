import type { PropType, ExtractPropTypes } from 'vue';
import type { ProFieldFC } from '../../typing';
import type { ProFieldValueEnumType, RequestOptionsType } from '@ant-design-vue/pro-utils';
import { defineComponent, ref } from 'vue';
import { objectToMap, proFieldParsingText, useEffect } from '@ant-design-vue/pro-utils';
import SearchSelect from './SearchSelect';
import { useIntl } from '@ant-design-vue/pro-provider';
import { Key } from 'ant-design-vue/es/_util/type';
type SelectOptionType = Partial<RequestOptionsType>[];

/**
 * 把 value 的枚举转化为数组
 *
 * @param valueEnum
 */
export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType
): SelectOptionType => {
  const enumArray: Partial<
    RequestOptionsType & {
      text: string;
      /** 是否禁用 */
      disabled?: boolean;
    }
  >[] = [];
  const valueEnum = objectToMap(valueEnumParams);

  valueEnum.forEach((_, key) => {
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
      disabled?: boolean;
    };

    if (!value) {
      return;
    }

    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: value?.text as unknown as string,
        value: key,
        label: value?.text as unknown as string,
        disabled: value.disabled,
      });
      return;
    }
    enumArray.push({
      text: value as unknown as string,
      value: key,
    });
  });
  return enumArray;
};

export const fieldSelectProps = () => ({
  // ...pick(selectProps(), [])
  mode: {
    type: String as PropType<ProFieldFC['mode']>,
    default: undefined,
  },
  text: {
    type: String as PropType<string>,
    default: undefined,
  },
  label: {
    type: [String, Function, Object] as PropType<ProFieldFC['label']>,
    default: undefined,
  },
  /** 值的枚举，如果存在枚举，Search 中会生成 select */
  valueEnum: {
    type: Object as PropType<ProFieldValueEnumType>,
    default: undefined,
  },
  fieldProps: {
    type: Object as PropType<ProFieldFC['fieldProps']>,
    default: undefined,
  },
  light: {
    type: Boolean as PropType<ProFieldFC['light']>,
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
});

export type FieldSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSelectProps>>>;

const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: Key;
    defaultKeyWords?: string;
    cacheForSwr?: boolean;
  }
) => [];

const FieldSelect = defineComponent({
  name: 'FieldSelect',
  inheritAttrs: false,
  props: fieldSelectProps(),
  setup(props) {
    const selectRef = ref();
    const keyWordsRef = ref<string>('');
    const intl = useIntl();
    useEffect(() => {
      keyWordsRef.value = props.fieldProps?.searchValue;
    }, [() => props.fieldProps?.searchValue]);
    const [loading, options, fetchData, resetData] = useFieldFetchData(props);

    return () => {
      const { mode, customRender, label, light, valueEnum, fieldProps, ...rest } = props;
      if (mode === 'read') {
        const dom = <>{proFieldParsingText(rest.text!, objectToMap(valueEnum))}</>;

        if (customRender) {
          return customRender(dom, { mode, ...fieldProps }, dom) ?? null;
        }
        return dom;
      }
      if (mode === 'edit' || mode === 'update') {
        const renderDom = () => {
          // if (light) {
          //   return (
          //     <LightSelect
          //       {...compatibleBorder(bordered)}
          //       id={id}
          //       loading={loading}
          //       ref={inputRef}
          //       allowClear
          //       size={componentSize}
          //       options={options}
          //       label={label}
          //       placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          //       lightLabel={lightLabel}
          //       labelTrigger={labelTrigger}
          //       fetchData={fetchData}
          //       {...fieldProps}
          //     />
          //   );
          // }
          return (
            <SearchSelect
              key="SearchSelect"
              ref={selectRef}
              allowClear
              placeholder={intl.value.getMessage({
                id: 'tableForm.selectPlaceholder',
                defaultMessage: '请选择',
              })}
              label={label}
              {...fieldProps}
              options={options}
            />
          );
        };
        const dom = renderDom();
        // if (renderFormItem) {
        //   return renderFormItem(rest.text, { mode, ...fieldProps, options, loading }, dom) ?? null;
        // }
        return dom;
      }
      return null;
    };
  },
});
export default FieldSelect;
