import { reactive as t } from "vue";
const o = [
  // https://www.antdv.com/components/form-cn#form-item
  "autoLink",
  "colon",
  "extra",
  "hasFeedback",
  "help",
  "htmlFor",
  "label",
  "labelAlign",
  "labelCol",
  "name",
  "required",
  "rules",
  "validateFirst",
  "validateStatus",
  "validateTrigger",
  "wrapperCol",
  // 我自定义的
  "addonBefore",
  "addonAfter",
  "addonWarpStyle"
], d = (e) => {
  const r = t({});
  return o.forEach((a) => {
    e.value[a] !== void 0 && (r[a] = e.value[a]);
  }), r;
};
export {
  d as default
};
