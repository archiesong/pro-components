import type {
  ItemType,
  ProFormRenderValueTypeHelpers,
  ProSchemaRenderValueTypeFunction,
} from '../typing';
import dependency from './dependency';
import divider from './divider';
import field from './field';
import formList from './formList';
import formSet from './formSet';
import group from './group';
import ignore from './ignore';
// 按照数组顺序执行
const tasks: ProSchemaRenderValueTypeFunction[] = [
  ignore,
  group,
  formList,
  formSet,
  divider,
  dependency,
];
export const renderValueType = (item: ItemType, helpers: ProFormRenderValueTypeHelpers) => {
  for (let cur = 0; cur < tasks.length; cur++) {
    const task = tasks[cur];
    const dom = task(item, helpers);
    if (dom === true) {
      // True 继续下一次
      continue;
    } else {
      // Other Is Dom
      return dom;
    }
  }
  // 最后执行
  return field(item, helpers);
};
