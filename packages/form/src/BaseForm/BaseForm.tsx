import type {
  CommomProFieldProps,
  FormItemProps,
  ProFieldValueType,
  ProFormInstanceType,
  ProRequestData,
  SearchTransformKeyFn,
} from '@antdv-next1/pro-utils'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { FormInstance, FormProps } from 'antdv-next'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { Dayjs } from 'dayjs'
import type { SetupContext, ShallowRef } from 'vue'
import type { ProFormGroupProps } from '../components'
import type { ContentRender } from '../RenderTypings'
import type { FieldProps, ProFormGridConfig, WithFalse } from '../typing'
import type { SubmitterProps } from './Submitter'
import ProConfigProvider from '@antdv-next1/pro-provider'
import {
  conversionMomentValue,
  nanoid,
  transformKeySubmitValue,
  useEffect,
  useFetchData,
  useMountMergeState,
  useState,
} from '@antdv-next1/pro-utils'
import { classNames, get, set as namePathSet, set } from '@v-c/util'
import { Form, Spin } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, nextTick, reactive, shallowRef, toRef } from 'vue'
import { useFormListContextProvider } from '../components'
import { useFieldContextProvider } from '../FieldContext'
import { useProFormInstanceExpose, useUrlSearchParams } from '../utils'
import BaseFormComponents, { genParams } from './BaseFormComponents'
import { useEditOrReadOnlyContextProvider } from './EditOrReadOnlyContext'
import { useStyle } from './style'

export type ProFormInstance<T = any> = FormInstance & ProFormInstanceType<T>
export type ProFormRef<T> = ProFormInstance<T> & {
  /** 聚焦方法 */
  focus?: () => void
}
export interface CommonFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> extends ProFormGridConfig {
  /**
   * @name submitter 自定义提交的配置
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
  submitter?: WithFalse<
    SubmitterProps<{
      form?: FormInstance
    }>
  >
  /**
   * @name onFinish 表单结束后调用
   * @description 支持异步操作，更加方便
   *
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish?: (formData: T) => Promise<boolean | void> | void

  /**
   * @name loading 表单按钮的 loading 状态
   */
  loading?: boolean

  /**
   * @name onLoadingChange 这是一个可选的属性(onLoadingChange)，它接受一个名为loading的参数，类型为boolean，表示加载状态是否改变。
   * 当loading状态发生变化时，将会调用一个函数，这个函数接受这个loading状态作为参数，并且没有返回值(void)。
   */
  onLoadingChange?: (loading: boolean) => void
  /**
   * @name formRef 获取 ProFormInstance
   *
   * ProFormInstance 可以用来获取当前表单的一些信息
   *
   * @example 获取 name 的值 formRef.value.getFieldValue("name");
   * @example 获取所有的表单值 formRef.value.getFieldsValue(true);
   *
   * - formRef.value.nativeElement => `2.29.1+`
   */
  formRef?: ShallowRef<ProFormRef<T> | null>
  /**
   * @name syncToUrl 同步结果到 url 中
   */
  syncToUrl?: boolean | ((values: T & Record<string, any>, type: 'get' | 'set') => T)

  /**
   * @name syncToUrlAsImportant 当 syncToUrl 为 true，在页面回显示时，以url上的参数为主，默认为false
   */
  syncToUrlAsImportant?: boolean

  /**
   * @name extraUrlParams 额外的 url 参数 中
   */
  extraUrlParams?: Record<string, any>

  /**
   * 同步结果到 model,默认为true如果为false，reset的时将会忽略从url上获取的数据
   *
   * @name syncToModel 是否将 url 参数写入 model
   */
  syncToModel?: boolean
  /**
   * 如果为 false,会原样保存。
   *
   * @default true
   * @param 要不要值中的 Null 和 undefined
   */
  omitNil?: boolean

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
  dateFormatter?: WithFalse<
    (string & {}) | 'string' | 'number' | ((value: Dayjs, valueType: string) => string | number)
  >

  /**
   * @name onInit 表单初始化成功，比如布局，label等计算完成
   * @example  (values)=>{ console.log(values) }
   */
  onInit?: (values: T, form: ProFormInstance<T>) => void

  /**
   * @name params 发起网络请求的参数
   *
   * @example  params={{productId: 1}}
   */
  params?: U
  /**
   * @name request 发起网络请求的参数,返回值会覆盖给 model
   *
   * @example async (params)=>{ return model }
   */
  request?: ProRequestData<T, U>

  /** 是否回车提交 */
  isKeyPressSubmit?: boolean

  /** 用于控制form 是否相同的key，高阶用法 */
  formKey?: string

  /**
   * @name autoFocusFirstInput 自动选中第一项
   * @description 只对有input的类型有效
   */
  autoFocusFirstInput?: boolean

  /**
   *  @name readonly 是否只读模式，对所有表单项生效
   *  @description 优先低于表单项的 readonly
   */
  readonly?: boolean
}

export type BaseFormProps<T extends Record<string, any>, U extends Record<string, any>> = {
  contentRender?: ContentRender<T>
  fieldProps?: FieldProps
  proFieldProps?: CommomProFieldProps
  /** 表单初始化完成，form已经存在，可以进行赋值的操作了 */
  onInit?: (values: T, form: ProFormInstance<T>) => void
  formItemProps?: FormItemProps
  groupProps?: ProFormGroupProps
  /** 是否回车提交 */
  isKeyPressSubmit?: boolean
  form?: FormInstance
  /** Form 组件的类型，内部使用 */
  formComponentType?: 'DrawerForm' | 'ModalForm' | 'QueryFilter'
} & Omit<FormProps, 'onFinish'>
& CommonFormProps<T, U>

/** 自动的formKey 防止重复 */
let requestFormCacheId = 0

/**
 * It takes a name path and converts it to an array.
 * @param {NamePath} name - The name of the form.
 * @returns string[]
 *
 * a-> [a]
 * [a] -> [a]
 */
function covertFormName(name?: NamePath<string | number | boolean>) {
  if (!name)
    return name
  if (Array.isArray(name))
    return name
  return [name]
}

const BaseForm = defineComponent(
  <T extends Record<string, any>, U extends Record<string, any>>(
    props: BaseFormProps<T, U>,
    {
      expose,
      slots,
      attrs,
    }: SetupContext<
      {},
      CustomSlotsType<{
        default?: () => VueNode
      }>
    >,
  ) => {
    const config = useConfig()
    const prefixCls = computed(() => config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-form`)
    const curFormKey = shallowRef<string>(nanoid())
    const modelValue = reactive(props.model || {})
    const formRef = shallowRef<ProFormRef<T> | null>(null)
    /** 保存 transformKeyRef，用于对表单key transform */
    const transformKeyRef = shallowRef<Record<string, SearchTransformKeyFn | undefined>>({})
    const fieldsValueType = shallowRef<
      Record<
        string,
        {
          valueType: ProFieldValueType
          dateFormat: string
        }
      >
    >({})
    const [urlSearch, setUrlSearch] = useUrlSearchParams({}, { disabled: !props.syncToUrl })

    const getPopupContainer = computed(() => {
      if (typeof window === 'undefined')
        return undefined
      // 如果在 drawerForm 和  modalForm 里就渲染dom到父节点里
      // modalForm 可能高度太小不适合
      if (props.formComponentType && ['DrawerForm'].includes(props.formComponentType)) {
        return (e: HTMLElement) => e.parentNode || document.body
      }
      return undefined
    })
    const transformKey = (values: T, paramsOmitNil: boolean, parentKey?: NamePath) => {
      if (!values || typeof values !== 'object') {
        return values
      }
      return transformKeySubmitValue(
        conversionMomentValue(
          values,
          props.dateFormatter || 'string',
          fieldsValueType,
          paramsOmitNil,
          parentKey,
        ),
        transformKeyRef.value,
      )
    }
    const formatValues = {
      /**
       * 获取被 ProForm 格式化后的所有数据
       * @param allData boolean
       * @param omitNilParam boolean
       * @returns T
       *
       * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
       */
      getFieldsFormatValue: (allData?: true, omitNilParam?: boolean) => {
        const { omitNil = true } = props
        if (!formRef.value) {
          return {} as T
        }
        const values = formRef.value.getFieldsValue(allData!)
        return transformKey(values as T, omitNilParam !== undefined ? omitNilParam : omitNil)
      },
      /**
       * 获取被 ProForm 格式化后的单个数据
       * @param nameList (string|number)[]
       * @param omitNilParam boolean
       * @returns T
       *
       * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
       */
      /** 获取格式化之后的单个数据 */
      getFieldFormatValue: (
        paramsNameList: NamePath<string | number | boolean> = [],
        omitNilParam?: boolean,
      ) => {
        const { omitNil = true } = props
        if (!formRef.value) {
          return undefined
        }
        const nameList = covertFormName(paramsNameList)
        if (!nameList)
          throw new Error('nameList is require')
        const value = formRef.value.getFieldValue(nameList) as T
        const obj = nameList ? set({} as T, nameList as string[], value) : value
        // transformKey会将keys重新和nameList拼接，所以这里要将nameList的首个元素弹出
        if (Array.isArray(nameList)) {
          const newNameList = [...nameList]
          newNameList.shift()
          const transformed = transformKey(
            obj,
            omitNilParam !== undefined ? omitNilParam : omitNil,
            newNameList,
          )
          const result = get(transformed, nameList as Array<string | number>)
          // 如果结果是对象，返回对象的值
          if (result && typeof result === 'object' && !Array.isArray(result)) {
            const objValue = Object.values(result)[0] as T
            // 如果对象的值是数组，返回数组
            if (Array.isArray(objValue)) {
              return objValue
            }
            return objValue as T
          }
          return result as T
        }
      },
      /**
       * 获取被 ProForm 格式化后的单个数据, 包含他的 name
       * @param nameList (string|number)[]
       * @param omitNilParam boolean
       * @returns T
       *
       * @example  {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
       */
      /** 获取格式化之后的单个数据 */
      getFieldFormatValueObject: (
        paramsNameList?: NamePath<string | number | boolean>,
        omitNilParam?: boolean,
      ) => {
        const { omitNil = true } = props
        if (!formRef.value) {
          return {} as T
        }
        const nameList = covertFormName(paramsNameList)
        const value = formRef.value?.getFieldValue(nameList!)
        const obj = nameList ? set({}, nameList as (string | number)[], value) : value
        return transformKey(obj, omitNilParam !== undefined ? omitNilParam : omitNil, nameList)
      },
      /**
       * 验字段后返回格式化之后的所有数据
       * @param nameList (string|number)[]
       * @param omitNilParam boolean
       * @returns T
       *
       * @example validateFieldsReturnFormatValue -> {a:{b:value}}
       */
      validateFieldsReturnFormatValue: async (
        nameList?: NamePath<string | number | boolean>[],
        omitNilParam?: boolean,
      ) => {
        const { omitNil = true } = props
        if (!formRef.value) {
          return {} as T
        }
        if (!Array.isArray(nameList) && nameList)
          throw new Error('nameList must be array')

        const values = await formRef.value?.validateFields(nameList)
        const transformedKey = transformKey(
          values as T,
          omitNilParam !== undefined ? omitNilParam : omitNil,
        )
        return transformedKey || ({} as T)
      },
    }
    const { wrapSSR, hashId } = useStyle(baseClassName)
    // 如果为 false，不需要触发设置进去
    const [urlParamsMergeModel, setUrlParamsMergeModel] = useState(() => {
      if (!props.syncToUrl) {
        return {}
      }
      return genParams(props.syncToUrl, urlSearch.value, 'get')
    })
    const getGenParams = () => ({
      ...urlSearch.value,
      ...(props.extraUrlParams || {}),
    })

    useEffect(() => {
      if (props.syncToModel)
        return
      setUrlParamsMergeModel({})
    }, [() => props.syncToModel])

    useEffect(() => {
      if (!props.syncToUrl)
        return
      setUrlSearch(genParams(props.syncToUrl, getGenParams(), 'set'))
    }, [() => props.extraUrlParams, () => props.syncToUrl])

    useEffect(() => {
      requestFormCacheId += 0
    }, [])

    const [loading, setLoading] = useMountMergeState<boolean>(false, {
      onChange: props.onLoadingChange,
      value: toRef(() => props.loading!),
    })
    const [initialData, initialDataLoading] = useFetchData<T, U>({
      request: props.request,
      params: computed(() => props.params),
      proFieldKey: computed(() => props.formKey || requestFormCacheId),
    })
    useEffect(() => {
      if (initialData?.value) {
        Object.keys(initialData.value).forEach((key) => {
          modelValue[key] = initialData.value![key]
        })
      }
    }, [initialData])

    const handleFinish: FormProps['onFinish'] = async () => {
      // 没设置 onFinish 就不执行
      if (!props.onFinish)
        return
      // 防止重复提交
      if (loading.value)
        return
      try {
        setLoading(true)
        const finalValues = (formatValues.getFieldsFormatValue?.() || {}) as T
        const response = props.onFinish(finalValues)
        if (response instanceof Promise) {
          setLoading(true)
        }
        if (response && typeof response === 'object' && typeof response.then === 'function') {
          try {
            await response
          }
          catch (error) {
            // 确保在 Promise 被拒绝时也重置 loading 状态
            setLoading(false)
            throw error
          }
          // 只有在 Promise 成功完成时才重置 loading 状态
          setLoading(false)
        }
        else {
          setLoading(false)
        }
        if (props.syncToUrl) {
          // 把没有的值设置为未定义可以删掉 url 的参数
          const syncToUrlParams = Object.keys(
            formatValues.getFieldsFormatValue?.(true, false) || {},
          ).reduce((pre, next) => {
            return {
              ...pre,
              [next]: finalValues[next] ?? undefined,
            }
          }, props.extraUrlParams || {})
          // fix #3547: 当原先在url中存在的字段被删除时，应该将 params 中的该字段设置为 undefined,以便触发url同步删除
          Object.keys(urlSearch.value).forEach((key) => {
            if (
              syncToUrlParams[key] !== false
              && syncToUrlParams[key] !== 0
              && !syncToUrlParams[key]
            ) {
              syncToUrlParams[key] = undefined
            }
          })
          // /** 在同步到 url 上时对参数进行转化 */
          setUrlSearch(genParams(props.syncToUrl, syncToUrlParams, 'set'))
        }
      }
      catch (error) {
        setLoading(false)
      }
    }
    useFieldContextProvider({
      formRef,
      fieldProps: props.fieldProps,
      proFieldProps: props.proFieldProps,
      formItemProps: props.formItemProps,
      groupProps: props.groupProps,
      formComponentType: props.formComponentType,
      getPopupContainer,
      formKey: curFormKey,
      modelValue,
      setModelValue: (_modelValue) => {
        Object.keys(_modelValue).forEach((key) => {
          modelValue[key] = _modelValue![key]
        })
      },
      setFieldValueType: (name, { valueType = 'text', dateFormat, transform }) => {
        if (!Array.isArray(name))
          return
        // Store transform function in the correct nested structure
        if (transform) {
          transformKeyRef.value = namePathSet(transformKeyRef.value, name, transform)
        }
        fieldsValueType.value = namePathSet(fieldsValueType.value, name, {
          valueType,
          dateFormat,
        })
      },
    })
    useEditOrReadOnlyContextProvider({
      mode: computed(() => (props.readonly ? 'read' : 'edit')),
    })
    useFormListContextProvider({})

    const proFormInstance = useProFormInstanceExpose(
      computed(() => ({ ...formRef.value, ...formatValues }) as ProFormRef<T>),
    )
    // 在 BaseForm 中直接处理 onInit，确保能获取到完整的 fieldsValueType
    // 注意：useEffect 内部已经有一个 nextTick()，且子组件的 useEffect 会先执行
    useEffect(() => {
      // console.log(fieldsValueType.value, 'fieldsValueType')
      const { omitNil = true, onInit } = props
      if (!onInit)
        return
      const executeOnInit = async () => {
        await nextTick() // 等待第一次 tick
        const finalValues = transformKey(formRef.value?.getFieldsValue?.(true) as T, omitNil)
        onInit?.(finalValues, proFormInstance)
      }
      executeOnInit()
    }, [])
    expose(proFormInstance)
    return () => {
      const {
        formItemProps,
        syncToUrl,
        syncToModel,
        model: propsModel,
        extraUrlParams,
        fieldProps,
        groupProps,
        submitter,
        proFieldProps,
        dateFormatter = 'string',
        onInit,
        request,
        rootClass,
        contentRender,
        formComponentType,
        onReset,
        params,
        grid,
        rowProps,
        colProps,
        isKeyPressSubmit,
        syncToUrlAsImportant,
        autoFocusFirstInput,
        formKey = requestFormCacheId,
        formRef: propsFormRef,
        form,
        readonly,
        onLoadingChange,
        loading: propsLoading,
        onValuesChange,
        omitNil = true,
        onFinish,
        ...propsRest
      } = props
      if (initialDataLoading.value && request) {
        return (
          <div style={{ paddingTop: '50px', paddingBottom: '50px', textAlign: 'center' }}>
            <Spin />
          </div>
        )
      }

      if (syncToUrlAsImportant) {
        Object.keys(urlParamsMergeModel.value).forEach((key) => {
          modelValue[key] = urlParamsMergeModel.value[key]
        })
      }
      else {
        Object.keys(urlParamsMergeModel.value).forEach((key) => {
          if (!modelValue[key]) {
            modelValue[key] = urlParamsMergeModel.value[key]
          }
        })
      }
      // console.log(modelValue, 'modelValue')
      return wrapSSR(
        <ProConfigProvider needDeps>
          {/* // 增加国际化的能力，与 table 组件可以统一 */}
          <Form
            {...attrs}
            ref={(instance) => {
              if (formRef.value)
                return
              formRef.value = instance as unknown as FormInstance
              formRef.value.focus = () => {
                const firstInput = (
                  instance as unknown as FormInstance
                )?.nativeElement?.querySelector('input, textarea, select') as HTMLElement
                firstInput?.focus()
              }
            }}
            {...{
              ...propsRest,
              onKeydown: (event: KeyboardEvent) => {
                if (!isKeyPressSubmit)
                  return
                if (event.key === 'Enter') {
                  formRef.value?.submit()
                }
              },
            }}
            autoComplete={propsRest.autoComplete || 'off'}
            model={modelValue}
            onValuesChange={(changedValues, values) =>
              onValuesChange?.(
                transformKey(changedValues as T, !!omitNil),
                transformKey(values as T, !!omitNil),
              )}
            rootClass={classNames(baseClassName.value, hashId.value, rootClass)}
            onFinish={handleFinish}
          >
            <BaseFormComponents
              {...props}
              transformKey={transformKey}
              autoComplete="off"
              formatValues={formatValues}
              fieldsValueType={fieldsValueType.value}
              loading={
                loading.value || !!(request && !initialData.value && initialDataLoading.value)
              }
              onUrlSearchChange={setUrlSearch}
              formRef={formRef}
              v-slots={slots}
            />
          </Form>
        </ProConfigProvider>,
      )
    }
  },
  {
    name: 'BaseForm',
    inheritAttrs: false,
    props: [
      'autoComplete',
      'autoFocusFirstInput',
      'classes',
      'clearOnDestroy',
      'colProps',
      'colon',
      'contentRender',
      'dateFormatter',
      'disabled',
      'extraUrlParams',
      'feedbackIcons',
      'fieldProps',
      'formComponentType',
      'formItemProps',
      'formKey',
      'grid',
      'groupProps',
      'isKeyPressSubmit',
      'labelAlign',
      'labelCol',
      'labelWrap',
      'layout',
      'loading',
      'model',
      'name',
      'omitNil',
      'onFieldsChange',
      'onFinish',
      'onFinishFailed',
      'onInit',
      'onLoadingChange',
      'onReset',
      'onSubmit',
      'onValidate',
      'onValuesChange',
      'formRef',
      'form',
      'params',
      'prefixCls',
      'preserve',
      'proFieldProps',
      'readonly',
      'request',
      'requiredMark',
      'rootClass',
      'rowProps',
      'rules',
      'scrollToFirstError',
      'size',
      'styles',
      'submitter',
      'syncToModel',
      'syncToUrl',
      'syncToUrlAsImportant',
      'tooltip',
      'validateMessages',
      'validateOnRuleChange',
      'validateTrigger',
      'variant',
      'wrapperCol',
    ],
  },
)

export default BaseForm
