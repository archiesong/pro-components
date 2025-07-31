import type { ExtractPropTypes, PropType, VNode, VNodeNormalizedChildren } from 'vue';
import type { FormInstance, FormItemProps } from 'ant-design-vue';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { NamePath } from 'ant-design-vue/lib/form/interface';
import type { SubmitterProps } from '../components';
import type { FieldProps, ProFormGridConfig, ProFormGroupProps, WithFalse } from '../typing';
import type { ProFieldPropsType, ProFormInstanceType } from '@ant-design-vue/pro-utils';
import { defineComponent, isVNode, cloneVNode, Fragment, ref } from 'vue';
import { formProps } from 'ant-design-vue/es/form';
import dayjs from 'dayjs';
import { Submitter } from '../components';
import { ProRequestData } from '../../../utils/src/useFetchData';
import { useProFormContextProvider, omit } from '@ant-design-vue/pro-utils';
import { useGridHelpers } from '../helpers';

export type ProFormInstance<T = any> = FormInstance & ProFormInstanceType<T>;

export const commonFormProps = () => ({
  grid: {
    type: Boolean as PropType<ProFormGridConfig['grid']>,
    default: undefined,
  },
  colProps: {
    type: Object as PropType<ProFormGridConfig['colProps']>,
  },
  rowProps: {
    type: Object as PropType<ProFormGridConfig['rowProps']>,
  },
  /**
   * @name 自定义提交的配置
   *
   * @example 不展示提交按钮和重置按钮
   * submitter={false}
   * @example 修改重置按钮的样式，并且隐藏提交按钮
   * submitter={{resetButtonProps: { type: 'dashed'},submitButtonProps: { style: { display: 'none', }}}}
   *
   * @example 修改提交按钮和重置按钮的顺序
   * submitter={{ render:(props,dom)=> [...dom]}}
   *
   * @example 修改提交和重置按钮文字
   * submitter={{ searchConfig: { submitText: '提交2',resetText: '重置2'}}}
   */
  submitter: {
    type: [Object, Boolean] as PropType<WithFalse<SubmitterProps>>,
    default: undefined,
  },
  /**
   * @name 表单结束后调用
   * @description 支持异步操作，更加方便
   *
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish: {
    type: Function as PropType<(formData: any) => Promise<boolean | void> | void>,
    default: undefined,
  },
  /**
   * @name 表单按钮的 loading 状态
   */
  loading: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /**
   * @name 这是一个可选的属性(onLoadingChange)，它接受一个名为loading的参数，类型为boolean，表示加载状态是否改变。
   * 当loading状态发生变化时，将会调用一个函数，这个函数接受这个loading状态作为参数，并且没有返回值(void)。
   */
  onLoadingChange: {
    type: Function as PropType<(loading?: boolean) => void>,
    default: undefined,
  },

  // /**
  //  * @name 获取 ProFormInstance
  //  *
  //  * ProFormInstance 可以用来获取当前表单的一些信息
  //  *
  //  * @example 获取 name 的值 formRef.getFieldValue("name");
  //  * @example 获取所有的表单值 formRef.getFieldsValue(true);
  //  *
  //  */
  // formRef: {
  //   type: Object as PropType<ProFormRef | undefined>,
  //   default: undefined,
  // },
  /**
   * 如果为 false,会原样保存。
   *
   * @default true
   * @param 要不要值中的 Null 和 undefined
   */
  omitNil: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * 格式化 Date 的方式，默认转化为 string
   *
   * @example  dateFormatter="string" : Moment -> YYYY-MM-DD
   * @example  dateFormatter="YYYY-MM-DD  HH:mm:SS" Moment -> YYYY-MM-DD  HH:mm:SS
   * @example  dateFormatter="HH:mm:SS" Moment -> HH:mm:SS
   * @example  dateFormatter="number" Moment -> timestamp
   * @example  dateFormatter=false Moment -> Moment
   * @example  dateFormatter={(value)=>value.format("YYYY-MM-DD")}
   */
  dateFormatter: {
    type: [String, Boolean, Function, Object] as PropType<
      | (string & Record<string, any>)
      | 'string'
      | 'number'
      | ((value: dayjs.Dayjs, valueType: string) => string | number)
      | false
    >,
    default: 'string',
  },
  /**
   * @name 表单初始化成功，比如布局，label等计算完成
   * @example  (values)=>{ console.log(values) }
   */
  onInit: {
    type: Function as PropType<(values: any, form: ProFormInstance) => void>,
    default: undefined,
  },
  /**
   * @name 发起网络请求的参数
   *
   * @example  params={{productId: 1}}
   * */
  params: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },
  /**
   * @name 发起网络请求的参数,返回值会覆盖给 initialValues
   *
   * @example async (params)=>{ return initialValues }
   */
  request: {
    type: Function as PropType<ProRequestData<any>>,
    default: undefined,
  },
  /** 是否回车提交 */
  isKeyPressSubmit: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  formKey: {
    type: [String, Number] as PropType<Key>,
    default: undefined,
  },
  /**
   * @name自动选中第一项
   * @description 只对有input的类型有效
   */
  autoFocusFirstInput: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   *  @name 是否只读模式，对所有表单项生效
   *  @description 优先低于表单项的 readonly
   */
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

export const baseFormProps = () => ({
  ...omit(formProps(), ['onFinish']),
  ...commonFormProps(),
  contentRender: {
    type: Function as PropType<
      (
        items: VueNode[],
        submitter: VNode<any, any, SubmitterProps> | undefined,
        form: FormInstance
      ) => VueNode
    >,
    default: undefined,
  },
  fieldProps: {
    type: Object as PropType<FieldProps<any>>,
    default: undefined,
  },
  proFieldProps: {
    type: Object as PropType<ProFieldPropsType>,
    default: undefined,
  },
  /** 表单初始化完成，form已经存在，可以进行赋值的操作了 */
  onInit: {
    type: Function as PropType<(values: Record<string, any>, form: ProFormInstance) => void>,
    default: undefined,
  },
  formItemProps: {
    type: Object as PropType<FormItemProps>,
    default: undefined,
  },
  groupProps: {
    type: Object as PropType<ProFormGroupProps>,
    default: undefined,
  },
  /** 是否回车提交 */
  isKeyPressSubmit: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /** Form 组件的类型，内部使用 */
  formComponentType: {
    type: String as PropType<'DrawerForm' | 'ModalForm' | 'QueryFilter'>,
    default: undefined,
  },
  transformKey: {
    type: Function as PropType<(values: any, omit: boolean, parentKey?: NamePath) => any>,
    default: undefined,
  },
});
// 递归展开多维数组为一维数组
const flattenVNodes = (vnodes: VNode[] | VNodeNormalizedChildren) => {
  const result: VNode[] = [];
  (vnodes as VNode[]).forEach((vnode) => {
    if (Array.isArray(vnode)) {
      // 如果是数组，递归处理
      result.push(...flattenVNodes(vnode));
    } else if (isVNode(vnode)) {
      if (vnode.type === Fragment) {
        // 如果是 Fragment，递归处理其子节点
        result.push(...flattenVNodes(vnode.children || ([] as VNodeNormalizedChildren)));
      } else {
        // 如果是普通 VNode，直接添加
        result.push(vnode);
      }
    }
  });
  return result;
};

export type BaseFormProps = Partial<ExtractPropTypes<ReturnType<typeof baseFormProps>>>;
export type CommonFormProps = Partial<ExtractPropTypes<ReturnType<typeof commonFormProps>>>;

const BaseFormComponents = defineComponent({
  name: 'BaseFormComponents',
  inheritAttrs: false,
  props: {
    ...baseFormProps(),
    loading: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    transformKey: {
      type: Function as PropType<(values: any, omit: boolean, parentKey?: NamePath) => any>,
      default: undefined,
    },
    form: {
      type: Object as PropType<FormInstance>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    // console.log(props, slots);
    const formRef = ref();
    /**
     * 获取布局
     */
    const { RowWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps });

    // const formatValues = useMemo(
    //   () => ({
    //     /**
    //      * 获取被 ProForm 格式化后的所有数据
    //      * @param allData boolean
    //      * @returns T
    //      *
    //      * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
    //      */
    //     getFieldsFormatValue: (allData?: true) => {
    //       // return transformKey(getFormInstance()?.getFieldsValue(allData!), omitNil);
    //     },
    //     /**
    //      * 获取被 ProForm 格式化后的单个数据
    //      * @param nameList (string|number)[]
    //      * @returns T
    //      *
    //      * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
    //      */
    //     /** 获取格式化之后的单个数据 */
    //     getFieldFormatValue: (paramsNameList: NamePath = []) => {
    //       // const nameList = covertFormName(paramsNameList);
    //       // if (!nameList) throw new Error('nameList is require');
    //       // const value = getFormInstance()?.getFieldValue(nameList!);
    //       // const obj = nameList ? set({}, nameList as string[], value) : value;
    //       // //transformKey会将keys重新和nameList拼接，所以这里要将nameList的首个元素弹出
    //       // const newNameList = [...nameList];
    //       // newNameList.shift();
    //       // return get(transformKey(obj, omitNil, newNameList), nameList as string[]);
    //     },
    //     /**
    //      * 获取被 ProForm 格式化后的单个数据, 包含他的 name
    //      * @param nameList (string|number)[]
    //      * @returns T
    //      *
    //      * @example  {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
    //      */
    //     /** 获取格式化之后的单个数据 */
    //     getFieldFormatValueObject: (paramsNameList?: NamePath) => {
    //       // const nameList = covertFormName(paramsNameList);
    //       // const value = getFormInstance()?.getFieldValue(nameList!);
    //       // const obj = nameList ? set({}, nameList as string[], value) : value;
    //       // return transformKey(obj, omitNil, nameList);
    //     },
    //     /**
    //     /**
    //      *验字段后返回格式化之后的所有数据
    //      * @param nameList (string|number)[]
    //      * @returns T
    //      *
    //      * @example validateFieldsReturnFormatValue -> {a:{b:value}}
    //      */
    //     validateFieldsReturnFormatValue: async (nameList?: NamePath[]) => {
    //       // if (!Array.isArray(nameList) && nameList) throw new Error('nameList must be array');
    //       // const values = await getFormInstance()?.validateFields(nameList);
    //       // const transformedKey = transformKey(values, omitNil);
    //       // return transformedKey ? transformedKey : {};
    //     },
    //   }),
    //   [() => props.omitNil, () => props.transformKey]
    // );

    useProFormContextProvider({});

    return () => {
      const {
        autoFocusFirstInput = true,
        submitter,
        transformKey,
        omitNil = true,
        form,
        loading,
        grid,
        contentRender,
      } = props;
      /** 计算 props 的对象 */
      const submitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;
      /** 渲染提交按钮与重置按钮 */
      const submitterNode =
        submitter === false ? null : (
          <Submitter
            key="submitter"
            {...submitterProps}
            form={form}
            onReset={() => {
              console.log(formRef.value);
              // const finalValues = transformKey?.(formRef.value.getFieldsValue(), omitNil);
              // submitterProps?.onReset?.(finalValues);
              // onReset?.(finalValues);
            }}
            submitButtonProps={{
              loading,
              ...submitterProps.submitButtonProps,
            }}
          />
        );

      // 将多维数组转换为一维数组
      const items = flattenVNodes(slots.default?.() || []).map((item, index) => {
        if (index === 0 && isVNode(item) && autoFocusFirstInput) {
          return cloneVNode(item, {
            ...item.props,
            autoFocus: autoFocusFirstInput,
          });
        }
        return item;
      });
      const wrapItems = grid ? <RowWrapper>{items}</RowWrapper> : items;
      const content = contentRender
        ? contentRender(wrapItems as VNode[], submitterNode as VNode, formRef.value)
        : wrapItems;
      return <>{content}</>;
    };
  },
});
export default BaseFormComponents;
