import type { ExtractPropTypes, PropType, InjectionKey } from 'vue';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design-vue/pro-utils';
import type { LightWrapperProps } from '../../BaseForm';
import { defineComponent, inject, provide } from 'vue';
import { formItemProps } from 'ant-design-vue/es/form';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';

const proFormItemProps = () => ({
  ...formItemProps(),
  ignoreFormItem: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  valueType: {
    type: String as PropType<ProFieldValueType>,
    default: undefined,
  },
  /**
   * @name 提交时转化值，一般用于将值转化为提交的数据
   * @param value 字段的值
   * @param namePath 字段的name
   * @param allValues 所有的字段
   * @returns 字段新的值，如果返回对象，会和所有值 merge 一次
   *
   * @example {name:[a,b] => {name:a,b }    transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }    transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:dayjs} => {name:string transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:dayjs}=> {name:时间戳} transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string} transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  } transform: (value,namePath,allValues)=> { valueName:value.value, labelName:value.name }
   */
  transform: {
    type: Function as PropType<SearchTransformKeyFn>,
    default: undefined,
  },
  dataFormat: {
    type: String as PropType<string>,
    default: undefined,
  },
  lightProps: {
    type: Object as PropType<LightWrapperProps>,
    default: undefined,
  },
  proFormFieldKey: {
    type: String as PropType<Key>,
    default: undefined,
  },
});
export type ProFormItemProps = Partial<ExtractPropTypes<ReturnType<typeof proFormItemProps>>>;

export const formItemContextKey: InjectionKey<{ name?: NamePath; label?: VueNode }> =
  Symbol('formItemContext');

export const useFormItemContextProvider = (props: { name?: NamePath; label?: VueNode }) =>
  provide(formItemContextKey, props);

export const useFormItemContextInject = () =>
  inject(
    formItemContextKey,
    {} as {
      name?: NamePath;
      label?: VueNode;
    }
  );

const ProFormItem = defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps(),
  setup(props, { slots }) {
    const { componentSize } = useConfigContextInject();
    return () => {
      const { valueType, transform, dataFormat, ignoreFormItem, lightProps, ...rest } = props;
      return <>{slots.default?.()}</>;
    };
  },
});

export default ProFormItem;
