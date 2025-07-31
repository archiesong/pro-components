import type { AnyObject, Key } from 'ant-design-vue/es/_util/type';
import type { ProColumns } from '../typing';
import type { ProFieldEmptyText } from '@ant-design-vue/pro-field';
import type { ProFormFieldProps } from '@ant-design-vue/pro-form';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design-vue/pro-utils';
import type { ContainerType } from '../Store/Provide';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import { ProFormField } from '@ant-design-vue/pro-form';
import { runFunction, getFieldPropsOrFormItemProps } from '@ant-design-vue/pro-utils';
const SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

type CellRenderFromItemProps<T extends AnyObject> = {
  text: Key | Key[];
  valueType: ProColumns<T>['valueType'];
  index: number;
  record?: T;
  columnEmptyText?: ProFieldEmptyText;
  columnProps?: ProColumns<T>;
  type?: ProSchemaComponentTypes;
  // 行的唯一 key
  recordKey?: Key;
  mode: 'edit' | 'read';
  /**
   * If there is, use EditableTable in the Form
   */
  prefixName?: NamePath;
  counter: ReturnType<ContainerType>;
  //   proFieldProps: ProFormFieldProps;
  subName: string[];
  editableUtils: UseEditableUtilType;
};
/**
 * 根据不同的类型来转化数值
 *
 * @param text
 * @param valueType
 */
const cellRenderToFromItem = <T extends AnyObject>(config: CellRenderFromItemProps<T>) => {
  const { text, valueType, record, columnProps } = config;
  // 如果 valueType === text ，没必要多走一次 render
  if (
    (!valueType || ['textarea', 'text'].includes(valueType.toString())) &&
    // valueEnum 存在说明是个select
    !columnProps?.valueEnum &&
    config.mode === 'read'
  ) {
    // 如果是''、null、undefined 显示columnEmptyText
    return SHOW_EMPTY_TEXT_LIST.includes(text as string) ? config.columnEmptyText : text;
  }

  const columnKey = columnProps?.key || columnProps?.dataIndex?.toString();

  /**
   * 生成公用的 proField dom 配置
   */
  const proFieldProps: ProFormFieldProps = {
    valueEnum: runFunction<[T | undefined]>(columnProps?.valueEnum, record),
    request: columnProps?.request,
    params: runFunction(columnProps?.params, record, columnProps),
    readonly: columnProps?.readonly,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
    mode: config.mode,
    renderFormItem: undefined,
    valueType,
    record,
    proFieldProps: {
      emptyText: config.columnEmptyText,
      proFieldKey: columnKey ? `table-field-${columnKey}` : undefined,
    },
  };
  /** 只读模式直接返回就好了，不需要处理 formItem */
  if (config.mode !== 'edit') {
    return (
      <ProFormField
        mode="read"
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(columnProps?.fieldProps, null, columnProps)}
        {...proFieldProps}
      />
    );
  }
  return <>sds</>;
};
export default cellRenderToFromItem;
