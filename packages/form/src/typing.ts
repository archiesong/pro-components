import type { CSSProperties, Ref } from 'vue';
import type { ColProps, FormItemProps, RowProps } from 'ant-design-vue';
import type {
  ProFieldPropsType,
  ProFieldValueType,
  ProFormBaseGroupProps,
  SearchConvertKeyFn,
} from '@ant-design-vue/pro-utils';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { ProFormInstance } from './BaseForm';
import type { ProFormItemProps } from './components';

export type FormModeType = 'edit' | 'read' | 'update';

export interface ProFormGridConfig {
  /**
   * open grid layout
   * @default false
   */
  grid?: boolean;
  /**
   * only works when grid is enabled
   *
   * When passing the `span` attribute, the default value is empty
   * @default
   * { xs: 24 }
   */
  colProps?: ColProps;
  /**
   * only works when grid is enabled
   * @default
   * { gutter: 8 }
   */
  rowProps?: RowProps;
}
export type ProFormItemCreateConfig = {
  /** 自定义类型 */
  valueType?: ProFieldValueType;
  /** 自定义 lightMode */
  customLightMode?: boolean;
  /** Light mode 自定义的 label 模式 */
  lightFilterLabelFormatter?: (value: any) => string;
  /** 默认的props，如果用户设置会被覆盖 */
  defaultProps?: Record<string, any>;
  /** @name 不使用默认的宽度 */
  ignoreWidth?: boolean;
} & ProFormItemProps;

// 给控件扩展的通用的属性
export type ExtendsProps = {
  secondary?: boolean;
  allowClear?: boolean;
  bordered?: boolean;
  colSize?: number;
  /**
   * 需要与 request 配合使用
   *
   * @name 网络请求用的输出，会触发reload
   */
  params?: ((form: ProFormInstance) => Record<string, any>) | Record<string, any>;

  /** @name 需要放在formItem 时使用 */
  ignoreFormItem?: boolean;

  /**
   * 实验性质，可能 api 会有改动，谨慎使用
   *
   * @name 只读模式
   */
  readonly?: boolean;

  /**
   * @name 获取时转化值，一般用于将数据格式化为组件接收的格式
   */
  convertValue?: SearchConvertKeyFn;

  /**
   * 给 protable 开的口子
   *
   * @name 自定义的 formItemProps
   */
  formItemProps?: FormItemProps;

  /** 给自定义组件行为开的口子 */
  filedConfig?: ProFormItemCreateConfig;
  // 给proForm添加fieldRef,用来获取暴露的方法
  // fieldRef?: Ref<CaptFieldRef | null | undefined>;
};

export type ProFormGroupProps = ProFormBaseGroupProps & ProFormGridConfig;

export type FieldProps<K> = {
  style?: CSSProperties;
  width?: string;
  ref?: Ref<K>;
};

export type LightFilterFooterRender =
  | ((
      /**
       * @name 确认选择的值
       */
      onConfirm?: (e?: MouseEvent) => void,
      /**
       * @name 清除选择
       */
      onClear?: (e?: MouseEvent) => void
    ) => VueNode | false)
  | false;

export type ProFormFieldItemProps<T = Record<string, any>, K = any> = {
  /**
   * @name 设置到控件上的属性
   *
   * @example 设置select 多选
   * <ProFormSelect fieldProps={{mode:"multiple"}} />
   * @example 设置select 多选
   * <ProFormText fieldProps={{placeholder:"请输入！"}} />
   */
  fieldProps?: Partial<FieldProps<K> & T>;
  /**
   * @name 输入的描述，没有值的时候展示
   */
  placeholder?: string | string[];
  /**
   * @name 只读模式渲染文本,没有值的时候展示
   */
  emptyText?: VueNode;
  /**
   * @name disabled=true 时控件不可用
   */
  disabled?: boolean;
  /**
   * @type auto 使用组件默认的宽度
   * @type xs=104px 适用于短数字、短文本或选项。
   * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * @type md=328px 标准宽度，适用于大部分字段长度。
   * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';

  /**
   * @name 设置到 ProField 上面的 Props，内部属性
   */
  proFieldProps?: ProFieldPropsType;
  /**
   * @name QueryFilter 上的footer
   *
   * @example 自定义清除按钮
   * footerRender={(onConfirm,onClear)=>{ return <Button onClick={onClear}>清除</Button> }}
   */
  footerRender?: LightFilterFooterRender;
} & Partial<Omit<ProFormItemProps, 'valueType'>> &
  Pick<ProFormGridConfig, 'colProps'> &
  ExtendsProps;

export type WithFalse<T> = T | false;
