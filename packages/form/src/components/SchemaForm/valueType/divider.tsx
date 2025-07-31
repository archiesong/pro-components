import { Divider } from 'ant-design-vue';
import type { ItemType } from '../typing';

const divider = <DataType, ValueType = 'divider'>(item: ItemType<DataType, ValueType>) => {
  /** 分割线 */
  if (item.valueType === 'divider') {
    return <Divider {...item.getFieldProps?.()} key={item.key} />;
  }

  return true;
};
export default divider;
