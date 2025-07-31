import type { AnyObject, VueNode } from 'ant-design-vue/es/_util/type';
import type { ProFieldEmptyText } from '@ant-design-vue/pro-field';
import type {
  ProFieldValueType,
  ProSchemaComponentTypes,
  ProTableEditableFnType,
  UseEditableUtilType,
} from '@ant-design-vue/pro-utils';
import type { ActionType, ProColumns } from '../typing';
import type { ContainerType } from '../Store/Provide';
import { isVNode } from 'vue';
import { Space, Divider } from 'ant-design-vue';
import get from 'ant-design-vue/es/vc-util/get';
import { LabelIconTip, genCopyable, isNil } from '@ant-design-vue/pro-utils';
import cellRenderToFromItem from './cellRenderToFromItem';
/** 转化列的定义 */
type ColumnRenderInterface<T> = {
  columnProps: ProColumns<T>;
  text: VueNode;
  record: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  counter: ReturnType<ContainerType>;
  editableUtils: UseEditableUtilType;
  subName: string[];
  marginSM?: number;
};

export const isMergeCell = (
  dom: any // 如果是合并单元格的，直接返回对象
) => dom && typeof dom === 'object' && dom?.props?.colSpan;

/**
 * 增加了 icon 的功能 render title
 *
 * @param item
 */
export const renderColumnsTitle = (item: ProColumns) => {
  const { title } = item;
  const ellipsis = typeof item?.ellipsis === 'boolean' ? item?.ellipsis : item?.ellipsis?.showTitle;
  if (title && typeof title === 'function') {
    return title(item, 'table', <LabelIconTip label={null} tooltip={item.tooltip} />);
  }
  return <LabelIconTip label={title} tooltip={item.tooltip} ellipsis={ellipsis} />;
};

/** 判断是否为不可编辑的单元格 */
function isNotEditableCell<T>(
  text: VueNode,
  record: T,
  index: number,
  editable?: ProTableEditableFnType<T> | boolean
) {
  if (typeof editable === 'boolean') {
    return editable === false;
  }
  return editable?.(text, record, index) === false;
}

/**
 * 默认的 filter 方法
 *
 * @param value
 * @param record
 * @param dataIndex
 * @returns
 */
export const defaultOnFilter = (value: string, record: any, dataIndex: string | string[]) => {
  const recordElement = Array.isArray(dataIndex)
    ? get(record, dataIndex as string[])
    : record[dataIndex];
  const itemValue = String(recordElement) as string;

  return String(itemValue) === String(value);
};

/**
 * 这个组件负责单元格的具体渲染
 *
 * @param param0
 */
const columnRender = <T extends AnyObject>({
  columnProps,
  text,
  record,
  index,
  columnEmptyText,
  counter,
  type,
  subName,
  marginSM,
  editableUtils,
}: ColumnRenderInterface<T>) => {
  const { action, prefixName } = counter;
  const { isEditable, recordKey } = editableUtils.isEditable({
    ...record,
    index,
  });
  const { renderText = (val: VueNode) => val } = columnProps;
  const renderTextStr: string = renderText(text, record, index, action.value!);
  const mode =
    isEditable && !isNotEditableCell(text, record, index, columnProps?.editable) ? 'edit' : 'read';
  const textDom = cellRenderToFromItem<T>({
    text: renderTextStr,
    valueType: (columnProps.valueType as ProFieldValueType) || 'text',
    index,
    record,
    subName,
    columnProps,
    counter,
    columnEmptyText,
    type,
    recordKey,
    mode,
    prefixName: prefixName.value,
    editableUtils,
  });
  const dom = mode === 'edit' ? textDom : genCopyable(textDom, columnProps, renderTextStr);

  /** 如果是编辑模式，并且 renderFormItem 存在直接走 renderFormItem */
  if (mode === 'edit') {
    //   <div
    //   style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     gap: marginSM,
    //     justifyContent: columnProps.align === 'center' ? 'center' : 'flex-start',
    //   }}
    // >
    // </div>
    if (columnProps.valueType === 'option') {
      return (
        <Space size={marginSM}>
          {/* {editableUtils.actionRender({
            ...rowData,
            index: columnProps.index || index,
          })} */}
        </Space>
      );
    }
    return dom;
  }

  if (!columnProps.customRender) {
    const isVueNode = isVNode(dom) || ['string', 'number'].includes(typeof dom);
    return !isNil(dom) && isVueNode ? dom : null;
  }
  const renderDom = columnProps.customRender?.(
    {
      text: dom,
      index,
      record,
      column: {
        ...columnProps,
        isEditable,
        type: 'table',
      },
    },
    {
      ...(action.value || ({} as ActionType)),
      ...editableUtils,
    }
  );

  // 如果是合并单元格的，直接返回对象
  if (isMergeCell(renderDom)) {
    return renderDom;
  }
  if (renderDom && columnProps.valueType === 'option' && Array.isArray(renderDom)) {
    return <Space v-slots={{ split: () => <Divider type="vertical" /> }}>{renderDom}</Space>;
  }
  return renderDom;
};

export default columnRender;
