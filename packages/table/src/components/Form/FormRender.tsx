import type { PropType, ExtractPropTypes } from 'vue';
import type { ProFieldValueType, ProSchemaComponentTypes } from '@ant-design-vue/pro-utils';
import type { BaseQueryFilterProps, ProFormInstance, ProFormProps } from '@ant-design-vue/pro-form';
import type { ActionType, ProColumns, WithFalse } from '../../typing';
import { defineComponent, computed } from 'vue';
import { Table } from 'ant-design-vue';
import { formItemProps } from 'ant-design-vue/es/form';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { classNames, omit, useMemo } from '@ant-design-vue/pro-utils';
import ProCard from '@ant-design-vue/pro-card';
import { SchemaForm } from '@ant-design-vue/pro-form';
import { ProTableProps } from '../../proTableProps';

export type SearchConfig = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};

const toLowerLine = (str: string) => {
  let temp = str.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`;
  });

  if (temp.startsWith('-')) {
    // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1);
  }
  return temp;
};

/**
 * 获取当前选择的 Form Layout 配置
 *
 * @param isForm
 * @param searchConfig
 * @returns LightFilter | QueryFilter | ProForm
 */
const getFormCompetent = (
  isForm: boolean,
  searchConfig?: SearchConfig | false
): 'Form' | 'LightFilter' | 'QueryFilter' => {
  if (!isForm && searchConfig !== false) {
    if (searchConfig?.filterType === 'light') {
      return 'LightFilter';
    }
    return 'QueryFilter';
  }
  return 'Form';
};

/**
 * 获取需要传给相应表单的props
 *
 * @param searchConfig
 * @param name
 */
const getFromProps = (isForm: boolean, searchConfig: any, name: string) => {
  if (!isForm && name === 'LightFilter') {
    // 传给 lightFilter 的问题
    return omit(
      {
        ...searchConfig,
      },
      ['labelWidth', 'defaultCollapsed', 'filterType']
    );
  }

  if (!isForm) {
    // 传给 QueryFilter 的配置
    return omit(
      {
        labelWidth: searchConfig ? searchConfig?.labelWidth : undefined,
        defaultCollapsed: true,
        ...searchConfig,
      },
      ['filterType']
    );
  }
  return {};
};

/**
 * 从formConfig中获取传给相应表单的配置
 *
 * @param isForm
 * @param formConfig
 */
const getFormConfigs = (isForm: boolean, formConfig: any) => {
  if (isForm) {
    // 传给Form的配置
    return omit(formConfig, ['ignoreRules']);
  }
  // 传给Filter的配置
  return { ignoreRules: true, ...formConfig };
};

export const formRenderProps = () => ({
  ...formItemProps(),
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  columns: {
    type: Array as PropType<ProColumns[]>,
    default: undefined,
  },
  bordered: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  type: {
    type: String as PropType<ProSchemaComponentTypes>,
    default: undefined,
  },
  form: {
    type: Object as PropType<Omit<ProFormProps, 'form'>>,
    default: undefined,
  },
  search: {
    type: [Boolean, Object] as PropType<WithFalse<SearchConfig>>,
    default: undefined,
  },
  onSubmit: {
    type: Function as PropType<(value: Record<string, any>, firstLoad: boolean) => void>,
    default: undefined,
  },
  ghost: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  manualRequest: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  onReset: {
    type: Function as PropType<(value: Record<string, any>) => void>,
    default: undefined,
  },
  action: {
    type: Object as PropType<ActionType>,
    default: undefined,
  },
  dateFormatter: {
    type: [Boolean, String, Object, Function] as PropType<ProTableProps['dateFormatter']>,
    default: undefined,
  },
  formRef: {
    type: Object as PropType<ProFormInstance>,
    default: undefined,
  },
  'onUpdate:formRef': {
    type: Function as PropType<(formRef: ProFormInstance) => void>,
    default: undefined,
  },
});

export type FormRenderProps = Partial<ExtractPropTypes<ReturnType<typeof formRenderProps>>>;

const FormRender = defineComponent({
  name: 'FormRender',
  inheritAttrs: false,
  props: formRenderProps(),
  setup(props) {
    const { getPrefixCls } = useConfigContextInject();
    const proProvide = useProConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-table-search`);
    const isForm = computed(() => props.type === 'form');
    const competentName = useMemo(
      () => getFormCompetent(isForm.value, props.search),
      [() => props.search, () => isForm.value]
    );
    /** 提交表单，根据两种模式不同，方法不相同 */
    const submit = (values: Record<string, any>, firstLoad: boolean) => {
      if (props.onSubmit) {
        props.onSubmit(values, firstLoad);
      }
    };
    const columnsList = useMemo(() => {
      return props.columns
        ?.filter((item) => {
          if (item === Table.EXPAND_COLUMN || item === Table.SELECTION_COLUMN) {
            return false;
          }
          if ((item.hideInSearch || item.search === false) && props.type !== 'form') {
            return false;
          }
          if (props.type === 'form' && item.hideInForm) {
            return false;
          }
          return true;
        })
        .map((item) => {
          const finalValueType =
            !item.valueType ||
            (['textarea', 'jsonCode', 'code'].includes(item?.valueType as ProFieldValueType) &&
              props.type === 'table')
              ? 'text'
              : (item?.valueType as 'text');
          const columnKey = item?.key || item?.dataIndex?.toString();
          return {
            ...item,
            width: undefined,
            ...(item.search && typeof item.search === 'object' ? item.search : {}),
            valueType: finalValueType,
            proFieldProps: {
              ...item.proFieldProps,
              proFieldKey: columnKey ? `table-field-${columnKey}` : undefined,
            },
          };
        });
    }, [() => props.columns, () => props.type]);
    return () => {
      const {
        type,
        loading,
        action,
        manualRequest,
        formRef,
        search: searchConfig,
        form: formConfig,
      } = props;
      return (
        <ProCard
          class={classNames(baseClassName.value, proProvide.value.hashId, {
            [`${baseClassName.value}-${toLowerLine(competentName.value)}`]: true,
            [`${prefixCls.value}-table-form`]: isForm.value,
          })}
        >
          <SchemaForm
            layoutType={competentName.value}
            columns={columnsList.value}
            type={type}
            submitter={{
              submitButtonProps: {
                loading,
              },
            }}
            {...getFromProps(isForm.value, searchConfig, competentName.value)}
            {...getFormConfigs(isForm.value, formConfig || {})}
            action={action}
            onInit={(values: any, form) => {
              console.log(form, values, 'onInit:form');
              props['onUpdate:formRef']?.(form);
              // 触发一个 submit，之所以这里触发是为了保证 value 都被 format了
              if (type !== 'form') {
                /** 如果是手动模式不需要提交 */
                if (manualRequest) return;
                submit(values, true);
              }
            }}
            // onReset={(values) => {
            //   // onReset?.(values);
            // }}
            // onFinish={(values) => {
            //   // submit(values, false);
            // }}
            model={formConfig?.model}
          />
        </ProCard>
      );
    };
  },
});

export default FormRender;
