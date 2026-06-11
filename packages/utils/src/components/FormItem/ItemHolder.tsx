import type { VueNode } from '@v-c/util'
import type { ItemHolderProps } from 'antdv-next/dist/form/FormItem/ItemHolder'
import type { FormItemInputProps } from 'antdv-next/dist/form/FormItemInput'
import type { NamePath, StoreValue } from 'antdv-next/dist/form/types'
import type { VNode } from 'vue'
import type { FormItemInputMiscProps } from './FormItemInput'
import { clsx, omit } from '@v-c/util'
import isVisible from '@v-c/util/dist/Dom/isVisible'
import { Row } from 'antdv-next'
import { getAttrStyleAndClass } from 'antdv-next/dist/_util/hooks/index'
import isNonNullable from 'antdv-next/dist/_util/isNonNullable'
import { NoStyleItemContextProvider, useFormContext } from 'antdv-next/dist/form/context'
import StatusProvider from 'antdv-next/dist/form/FormItem/StatusProvider'
import FormItemLabel from 'antdv-next/dist/form/FormItemLabel'
import { getStatus } from 'antdv-next/dist/form/util'
import { computed, defineComponent, nextTick, shallowRef, watch } from 'vue'
import FormItemInput from './FormItemInput'

const ItemHolder = defineComponent<ItemHolderProps & {
  initialValue?: any
  valuePropName?: 'checked' | 'value' | 'fileList'
  isListField?: boolean
  dependencies?: NamePath<string | number | boolean>[]
  getValueFromEvent?: (...args: any[]) => StoreValue
  getValueProps?: (value: StoreValue) => Record<string, unknown>
  _internalItemRender?: {
    mark: string
    render: (
      props: FormItemInputProps & FormItemInputMiscProps,
      domList: {
        input: VNode
        errorList: VNode | null
        extra: VNode | null
      },
    ) => VueNode
  }
}>(
  (props, { attrs, slots }) => {
    const itemPrefixCls = computed(() => `${props.prefixCls}-item`)
    const formContext = useFormContext()
    const layout = computed(() => props?.layout ?? formContext.value?.layout)
    const vertical = computed(() => layout.value === 'vertical')
    // ======================== Margin ========================
    const itemRef = shallowRef<HTMLDivElement>()
    const hasHelp = computed(() => isNonNullable(props.help))
    const hasError = computed(() => !!(hasHelp.value || props?.errors?.length || props?.warnings?.length))
    const isOnScreen = computed(() => !!itemRef.value && isVisible(itemRef.value))
    const marginBottom = shallowRef()
    watch([hasError, isOnScreen], async () => {
      await nextTick()
      if (hasError.value && itemRef.value) {
        // The element must be part of the DOMTree to use getComputedStyle
        // https://stackoverflow.com/questions/35360711/getcomputedstyle-returns-a-cssstyledeclaration-but-all-properties-are-empty-on-a
        const itemStyle = getComputedStyle(itemRef.value)
        marginBottom.value = Number.parseInt(itemStyle.marginBottom, 10)
      }
    }, {
      immediate: true,
    })
    const onErrorVisibleChanged = (visible: boolean) => {
      if (!visible) {
        marginBottom.value = null
      }
    }

    // ======================== Status ========================
    function getValidateState(isDebounce = false) {
      const _errors = isDebounce ? props?.errors : props?.meta?.errors
      const _warnings = isDebounce ? props?.warnings : props?.meta?.warnings
      return getStatus(_errors, _warnings, props?.meta, '', !!props?.hasFeedback, props?.validateStatus)
    }

    return () => {
      const mergedValidateStatus = getValidateState()
      const {
        prefixCls,
        rootClass,
        hasFeedback,
        hidden,
        fieldId,
        required,
        isRequired,
        meta,
        help,
        onSubItemMetaChange,
        name,
      } = props
      const { className, style, restAttrs } = getAttrStyleAndClass(attrs)
      const debounceErrors = props?.errors
      const debounceWarnings = props?.warnings

      // ======================== Render ========================
      const itemClassName = clsx(
        itemPrefixCls.value,
        className,
        rootClass,
        {
          [`${itemPrefixCls.value}-with-help`]: hasHelp.value || debounceErrors.length || debounceWarnings.length,

          // Status
          [`${itemPrefixCls.value}-has-feedback`]: mergedValidateStatus && hasFeedback,
          [`${itemPrefixCls.value}-has-success`]: mergedValidateStatus === 'success',
          [`${itemPrefixCls.value}-has-warning`]: mergedValidateStatus === 'warning',
          [`${itemPrefixCls.value}-has-error`]: mergedValidateStatus === 'error',
          [`${itemPrefixCls.value}-is-validating`]: mergedValidateStatus === 'validating',
          [`${itemPrefixCls.value}-hidden`]: hidden,
          // Layout
          [`${itemPrefixCls.value}-${layout.value}`]: layout.value,
        },
      )
      return (
        <div class={itemClassName} style={style} ref={itemRef}>
          <Row class={`${itemPrefixCls.value}-row`} {...restAttrs}>
            {/* Label */}
            <FormItemLabel
              {...omit(props, ['_internalItemRender'])}
              htmlFor={props.htmlFor || fieldId}
              requiredMark={formContext.value?.requiredMark}
              required={required ?? isRequired}
              prefixCls={prefixCls!}
              vertical={vertical.value!}
            />
            {/* Input Group */}

            <FormItemInput
              {...props}
              {...meta}
              errors={debounceErrors}
              warnings={debounceWarnings}
              prefixCls={prefixCls!}
              status={mergedValidateStatus}
              help={help}
              marginBottom={marginBottom.value}
              onErrorVisibleChanged={onErrorVisibleChanged}
            >
              <NoStyleItemContextProvider value={onSubItemMetaChange}>
                <StatusProvider
                  prefixCls={prefixCls!}
                  meta={meta}
                  errors={meta.errors}
                  warnings={meta.warnings}
                  hasFeedback={hasFeedback}
                  // Already calculated
                  validateStatus={mergedValidateStatus}
                  name={name}
                >
                  {slots?.default?.()}
                </StatusProvider>
              </NoStyleItemContextProvider>
            </FormItemInput>
          </Row>
          {!!marginBottom.value && (
            <div
              class={`${itemPrefixCls.value}-margin-offset`}
              style={{
                marginBottom: `${-marginBottom.value}px`,
              }}
            />
          )}
        </div>
      )
    }
  },
  {
    name: 'FormItemHolder',
    inheritAttrs: false,
  },
)

export default ItemHolder
