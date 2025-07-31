import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { CellEllipsisType } from 'ant-design-vue/es/vc-table/interface';
import type { LabelTooltipType } from '../typing';
import { Typography } from 'ant-design-vue';

const isNeedTranText = (item: any): boolean => {
  if (item?.valueType?.toString().startsWith('date')) {
    return true;
  }
  if (item?.valueType === 'select' || item?.valueEnum) {
    return true;
  }
  return false;
};

const getEllipsis = (item: any) => {
  if (item.ellipsis?.showTitle === false) {
    return false;
  }

  return item.ellipsis;
};

/**
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom
 * @param item
 * @param text
 */
const genCopyable = (
  dom: VueNode,
  item: { copyable?: boolean; ellipsis?: CellEllipsisType; tooltip?: LabelTooltipType },
  text: string
) => {
  if (item.copyable || item.ellipsis) {
    const copyable =
      item.copyable && text
        ? {
            text,
            tooltip: false,
          }
        : undefined;

    /** 有些 valueType 需要设置copy的为string */
    const needTranText = isNeedTranText(item);

    const ellipsis =
      getEllipsis(item) && text
        ? {
            tooltip:
              // 支持一下 tooltip 的关闭
              item?.tooltip !== false && needTranText ? dom : text,
          }
        : false;

    return <Typography.Text copyable={copyable} ellipsis={ellipsis} content={dom} />;
  }
  return dom;
};
export default genCopyable;
