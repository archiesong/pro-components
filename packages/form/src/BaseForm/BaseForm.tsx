import type { FormInstance } from 'ant-design-vue';
import type { ProFormInstance, BaseFormProps, CommonFormProps } from './BaseFormComponents';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design-vue/pro-utils';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import { computed, defineComponent, ref } from 'vue';
import { Form, Spin } from 'ant-design-vue';
import namePathSet from 'ant-design-vue/es/vc-util/set';
import {
  useEffect,
  useMountMergeState,
  useFetchData,
  classNames,
  transformKeySubmitValue,
  conversionMomentValue,
  nanoid,
  useMemo,
} from '@ant-design-vue/pro-utils';
import ProConfigProvider from '@ant-design-vue/pro-provider';
import { useEditOrReadOnlyContextProvider } from './EditOrReadOnlyContext';
import { useFieldContextProvider } from '../FieldContext';
import BaseFormComponents, { baseFormProps, commonFormProps } from './BaseFormComponents';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { useStyle } from './style';

// type ProFormRef<T = any> = ProFormInstanceType<T> & any;

export type { FormInstance, ProFormInstance, BaseFormProps, CommonFormProps };
export { baseFormProps, commonFormProps };
const BaseForm = defineComponent({
  name: 'BaseForm',
  inheritAttrs: false,
  props: baseFormProps(),
  setup(props, { slots, attrs, expose }) {
    const formRef = ref<FormInstance>();
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-form`);
    /** 保存 transformKeyRef，用于对表单key transform */
    const transformKeyRef = ref<Record<string, SearchTransformKeyFn | undefined>>({});
    const fieldsValueType = ref<
      Record<
        string,
        {
          valueType: ProFieldValueType;
          dateFormat: string;
        }
      >
    >({});
    const { wrapSSR, hashId } = useStyle(baseClassName);

    useEditOrReadOnlyContextProvider({
      mode: props.readonly ? 'read' : 'edit',
    });

    const transformKey = (values: any, paramsOmitNil: boolean, parentKey?: NamePath) =>
      transformKeySubmitValue(
        conversionMomentValue(
          values,
          props.dateFormatter,
          fieldsValueType.value,
          paramsOmitNil,
          parentKey
        ),
        transformKeyRef.value,
        paramsOmitNil
      );

    const getPopupContainer = useMemo(() => {
      if (typeof window === 'undefined') return undefined;
      // 如果在 drawerForm 和  modalForm 里就渲染dom到父节点里
      // modalForm 可能高度太小不适合
      if (props.formComponentType && ['DrawerForm'].includes(props.formComponentType)) {
        return (e: HTMLElement) => e.parentNode || document.body;
      }
      return undefined;
    }, [() => props.formComponentType]);

    const [loading, setLoading] = useMountMergeState<boolean | undefined>(false, {
      onChange: props.onLoadingChange,
      value: computed(() => props.loading),
    });
    const [initialData] = useFetchData({
      request: props.request,
      params: props.params,
      proFieldKey: props.formKey,
    });

    useEffect(() => {
      const finalValues = props.transformKey?.(
        formRef.value?.getFieldsValue?.(true),
        props.omitNil
      );
      props.onInit?.(finalValues, {
        ...formRef.value!,
      });
    }, []);
    const onFinish = () => {
      // 没设置 onFinish 就不执行
      if (!props.onFinish) return;
      // 防止重复提交
      if (loading) return;
      try {
        // const finalValues = formRef?.current?.getFieldsFormatValue?.();
        // const response = props.onFinish(finalValues);
        // if (response instanceof Promise) {
        //   setLoading(true);
        // }
        // await response;
        // if (syncToUrl) {
        //   // 把没有的值设置为未定义可以删掉 url 的参数
        //   const syncToUrlParams = Object.keys(
        //     formRef?.current?.getFieldsFormatValue?.(undefined, false),
        //   ).reduce((pre, next) => {
        //     return {
        //       ...pre,
        //       [next]: finalValues[next] ?? undefined,
        //     };
        //   }, extraUrlParams);
        //   // fix #3547: 当原先在url中存在的字段被删除时，应该将 params 中的该字段设置为 undefined,以便触发url同步删除
        //   Object.keys(urlSearch).forEach((key) => {
        //     if (
        //       syncToUrlParams[key] !== false &&
        //       syncToUrlParams[key] !== 0 &&
        //       !syncToUrlParams[key]
        //     ) {
        //       syncToUrlParams[key] = undefined;
        //     }
        //   });
        //   /** 在同步到 url 上时对参数进行转化 */
        //   setUrlSearch(genParams(syncToUrl, syncToUrlParams, 'set'));
        // }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    useFieldContextProvider({
      // formRef,
      fieldProps: props.fieldProps,
      proFieldProps: props.proFieldProps,
      formItemProps: props.formItemProps,
      groupProps: props.groupProps,
      formComponentType: props.formComponentType,
      getPopupContainer: getPopupContainer.value,
      formKey: nanoid(),
      setFieldValueType: (name, { valueType = 'text', dateFormat, transform }) => {
        if (!Array.isArray(name)) return;
        transformKeyRef.value = namePathSet(transformKeyRef.value, name, transform);
        fieldsValueType.value = namePathSet(fieldsValueType.value, name, {
          valueType,
          dateFormat,
        });
      },
    });
    expose(formRef.value);
    return () => {
      const {
        isKeyPressSubmit,
        contentRender,
        submitter,
        // fieldProps,
        proFieldProps,
        formItemProps,
        groupProps,
        dateFormatter,
        // formRef: propsFormRef,
        onInit,
        formComponentType,
        grid,
        rowProps,
        colProps,
        omitNil,
        request,
        params,
        formKey,
        autoFocusFirstInput,
        readonly,
        onLoadingChange,
        loading,
        ...propRest
      } = props;

      if (!initialData.value && request) {
        return (
          <div style={{ paddingTop: 50, paddingBottom: 50, textAlign: 'center' }}>
            <Spin />
          </div>
        );
      }
      // console.log(propRest, 'propRest');
      return wrapSSR(
        <ProConfigProvider>
          <Form
            {...propRest}
            ref={formRef}
            onFinish={onFinish}
            class={classNames(baseClassName.value, hashId.value, attrs.class)}
          >
            <BaseFormComponents
              {...props}
              form={formRef.value}
              transformKey={transformKey}
              loading={loading}
            >
              {slots.default?.()}
            </BaseFormComponents>
          </Form>
        </ProConfigProvider>
      );
    };
  },
});
export default BaseForm;
