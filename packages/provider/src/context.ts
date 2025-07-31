import type { InjectionKey, Ref } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { Theme } from 'ant-design-vue/es/_util/cssinjs';
import type { IntlType } from './intl';
import type { ProAliasToken } from './useStyle';
import { inject, provide, ref } from 'vue';
import { zhCNIntl } from './intl';
import { defaultToken, emptyTheme } from './useStyle/token';

/**
 * 用于配置 ValueEnum 的通用配置
 */
export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: VueNode;

  /** @name 预定的颜色 */
  status?: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Object
 *
 * @name ValueEnum 的类型
 */
type ProSchemaValueEnumMap = Map<string | number | boolean, ProSchemaValueEnumType | VueNode>;

/**
 * 支持 Map 和 Object
 */
type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | VueNode>;

export type ProFieldFCMode = 'read' | 'edit' | 'update';

/**
 * BaseProFieldFC 的类型设置
 */
export type BaseProFieldFC = {
  /** 值的类型 */
  text: VueNode;
  /** 放置到组件上 props */
  fieldProps?: any;
  /**
   * 组件的渲染模式类型
   * @option read 渲染只读模式
   * @option edit 渲染编辑模式
   * */
  mode: ProFieldFCMode;
  /**
   * 简约模式
   */
  plain?: boolean;
  /** 轻量模式 */
  light?: boolean;

  /** Label */
  label?: VueNode;

  /** 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
};

/** Render 第二个参数，里面包含了一些常用的参数 */
export type ProFieldFCRenderProps = {
  mode?: ProFieldFCMode;
  readonly?: boolean;
  placeholder?: string | string[];
  value?: any;
  onChange?: (...rest: any[]) => void;
} & BaseProFieldFC;

export type ProRenderFieldPropsType = {
  /**
   * 自定义只读模式的渲染器
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于读的 dom
   */
  customRender?:
  | ((
    text: any,
    props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>,
    dom: VueNode
  ) => VueNode)
  | undefined;
  /**
   * 一个自定义的编辑渲染器。
   * @params text 默认的值类型
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于编辑的dom
   */
  renderFormItem?: ((text: any, props: ProFieldFCRenderProps, dom: VueNode) => VueNode) | undefined;
};

/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
  intl?: IntlType;
  valueTypeMap?: Record<string, ProRenderFieldPropsType>;
  token: ProAliasToken;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  compact?: boolean;
  theme?: Theme<any, any>;
};


export const proConfigProviderKey: InjectionKey<Ref<ConfigContextPropsType>> = Symbol('proConfigProvider');

/**
 * The default value for ProConfigContext, used as a fallback when no provider is found.
 */
const defaultProConfigContext: ConfigContextPropsType = {
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
  theme: emptyTheme,
  valueTypeMap: {},
  hashed: true,
  dark: false,
  compact: false,
  token: defaultToken as ProAliasToken,
}
/**
 * Provide the ProConfig context to child components.
 * @param props - The context value (should be a Ref for reactivity)
 */
export const useProConfigContextProvider = (props: Ref<ConfigContextPropsType>) =>
  provide(proConfigProviderKey, props);

/**
 * Inject the ProConfig context. If not found, use the default value.
 * @returns The context value (as a Ref)
 */
export const useProConfigContextInject = () =>inject(proConfigProviderKey,ref(defaultProConfigContext));
