import type { InjectionKey } from 'vue';
import type { FormItemProps } from 'ant-design-vue';
import type { ProFieldProps } from '@ant-design-vue/pro-field';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design-vue/pro-utils';
import type { FieldProps, ProFormGroupProps } from './typing';
// import type { CommonFormProps } from './BaseForm';
import { inject, provide } from 'vue';
import { CommonFormProps } from './BaseForm';

export type FiledContextProps = {
  fieldProps?: FieldProps<unknown>;
  proFieldProps?: ProFieldProps;
  formItemProps?: FormItemProps;
  groupProps?: ProFormGroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType;
      dateFormat?: string;
      /** 数据转化的地方 */
      transform?: SearchTransformKeyFn;
    }
  ) => void;
  /** Form 组件的类型 */
  formComponentType?: string;
  /** 获取表单实例计数器 */
  formKey?: string;

  /** 表单的 getPopupContainer 控制 */
  getPopupContainer?: (e: HTMLElement) => ParentNode;
} & Pick<CommonFormProps, 'grid'>;

export const fieldContextKey: InjectionKey<FiledContextProps> = Symbol('fieldContext');

export const useFieldContextProvider = (props: FiledContextProps) =>
  provide(fieldContextKey, props);

export const useFieldContextInject = () => inject(fieldContextKey, {} as FiledContextProps);
