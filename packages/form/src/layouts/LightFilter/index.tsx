import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { LightFilterFooterRender } from '../../typing';
import type { FormProps } from 'ant-design-vue';
import type { CommonFormProps } from '../../BaseForm';
import { TooltipPlacement } from 'ant-design-vue/es/tooltip';

export type LightFilterProps = {
  collapse?: boolean;
  /**
   * @name 收起的label dom
   *
   * @example collapseLabel={"收起"}
   */
  collapseLabel?: VueNode;
  /**
   * @name 是否有边框
   */
  bordered?: boolean;
  /**
   * @name 忽略rules，一般而言 LightFilter 应该不支持rules，默认是 false。
   */
  ignoreRules?: boolean;
  /**
   * @name 自定义 footerRender
   *
   * @example 自定义清除
   * footerRender={(onConfirm,onClear)=>{  return <a onClick={onClear}>清除</a> })}
   */
  footerRender?: LightFilterFooterRender;
  /**
   * @name 支持配置弹出的位置
   * @default bottomLeft
   */
  placement?: TooltipPlacement;
} & Omit<FormProps, 'onFinish'> &
  CommonFormProps;
