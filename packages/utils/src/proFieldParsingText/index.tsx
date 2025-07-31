import type { FunctionalComponent } from 'vue';
import type { BadgeProps } from 'ant-design-vue';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import { Fragment } from 'vue';
import { Badge, Space } from 'ant-design-vue';
import { ProFieldValueEnumType, ProSchemaValueEnumMap } from '../typing';

/**
 * 获取类型的 type
 *
 * @param obj
 */
function getType(obj: any) {
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)?.[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}
export const ProFieldBadgeColor: FunctionalComponent<BadgeProps> = (
  { color, ...rest },
  { slots }
) => <Badge {...rest} color={color} text={slots.default?.()} />;

export const objectToMap = (value: ProFieldValueEnumType | undefined): ProSchemaValueEnumMap => {
  if (getType(value) === 'map') {
    return value as ProSchemaValueEnumMap;
  }
  return new Map(Object.entries(value || {}));
};

const TableStatus: {
  Success: FunctionalComponent<BadgeProps>;
  Error: FunctionalComponent<BadgeProps>;
  Processing: FunctionalComponent<BadgeProps>;
  Default: FunctionalComponent<BadgeProps>;
  Warning: FunctionalComponent<BadgeProps>;
  success: FunctionalComponent<BadgeProps>;
  error: FunctionalComponent<BadgeProps>;
  processing: FunctionalComponent<BadgeProps>;
  default: FunctionalComponent<BadgeProps>;
  warning: FunctionalComponent<BadgeProps>;
} = {
  Success: (props, { slots }) => <Badge {...props} status="success" text={slots.default?.()} />,
  Error: (props, { slots }) => <Badge {...props} status="error" text={slots.default?.()} />,
  Default: (props, { slots }) => <Badge {...props} status="default" text={slots.default?.()} />,
  Processing: (props, { slots }) => (
    <Badge {...props} status="processing" text={slots.default?.()} />
  ),
  Warning: (props, { slots }) => <Badge {...props} status="warning" text={slots.default?.()} />,
  success: (props, { slots }) => <Badge {...props} status="success" text={slots.default?.()} />,
  error: (props, { slots }) => <Badge {...props} status="error" text={slots.default?.()} />,
  default: (props, { slots }) => <Badge {...props} status="default" text={slots.default?.()} />,
  processing: (props, { slots }) => (
    <Badge {...props} status="processing" text={slots.default?.()} />
  ),
  warning: (props, { slots }) => <Badge {...props} status="warning" text={slots.default?.()} />,
};

type ProFieldStatusType =
  | 'success'
  | 'warning'
  | 'error'
  | 'default'
  | 'processing'
  | 'Success'
  | 'Error'
  | 'Processing'
  | 'Default'
  | 'Warning';

/**
 * 转化 text 和 valueEnum 通过 type 来添加 Status
 *
 * @param text
 * @param valueEnum
 * @param pure 纯净模式，不增加 status
 */
const proFieldParsingText = (
  text: Key | Key[] | { label: string },
  valueEnumParams: ProFieldValueEnumType,
  key?: number | string
): VueNode => {
  if (Array.isArray(text)) {
    return (
      <Space
        key={key}
        v-slots={{
          split: ',',
        }}
        size={2}
        wrap
      >
        {text.map((value, index) => proFieldParsingText(value, valueEnumParams, index))}
      </Space>
    );
  }
  const valueEnum = objectToMap(valueEnumParams);
  if (!valueEnum.has(text as Key) && !valueEnum.has(`${text}`)) {
    return (text as { label: string })?.label || (text as Key);
  }
  const domText = (valueEnum.get(text as Key) || valueEnum.get(`${text}`)) as {
    text: VueNode;
    status: ProFieldStatusType;
    color?: string;
  };
  if (!domText) {
    return <Fragment key={key}>{(text as { label: string })?.label || text}</Fragment>;
  }
  const { status, color } = domText;
  const Status = TableStatus[status || 'Init'];
  // 如果类型存在优先使用类型
  if (Status) {
    return <Status key={key}>{domText.text}</Status>;
  }
  // 如果不存在使用颜色
  if (color) {
    return (
      <ProFieldBadgeColor key={key} color={color}>
        {domText.text}
      </ProFieldBadgeColor>
    );
  }
  // 什么都没有使用 text
  return <Fragment key={key}>{domText.text || (domText as unknown as VueNode)}</Fragment>;
};

export default proFieldParsingText;
