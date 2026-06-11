import type { FormListFieldData, FormListOperation, FormListProps, VueNode } from '@antdv-next/pro-utils'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { FormInstance } from 'antdv-next'
import type { VNode } from 'vue'
import type { FormListActionGuard, FormListMeta, ProFromListCommonProps } from './ListItem'
import { PlusOutlined } from '@antdv-next/icons'
import { useIntl, useProConfig } from '@antdv-next/pro-provider'
import { nanoid, runFunction, useState } from '@antdv-next/pro-utils'
import { classNames, omit } from '@v-c/util'
import { Button } from 'antdv-next'
import { computed, defineComponent, shallowRef } from 'vue'
import { useEditOrReadOnlyContextInject } from '../../BaseForm'
import ProFormListItem from './ListItem'

export interface ProFormListContainerProps extends ProFromListCommonProps {
  /** 是否只读模式 */
  readonly?: boolean
  name?: FormListProps['name']
  originName?: FormListProps['name']
  prefixCls?: string
  meta: {
    errors?: VueNode[]
    warnings?: VueNode[]
  }
  fields?: FormListFieldData[]
  action?: FormListOperation
  actionGuard?: FormListActionGuard
  formInstance?: FormInstance | null
  count?: number
  fieldExtraRender?: (
    fieldAction: FormListOperation,
    meta: {
      errors?: VueNode[]
      warnings?: VueNode[]
    },
  ) => VueNode
  /**
   * 数据新增成功回调
   */
  onAfterAdd?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => void
  /**
   * 数据移除成功回调
   */
  onAfterRemove?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => void
}

export interface ProFormListContainerSlots {
  default?: () => VueNode
  itemRender?: (
    dom: { listDom: VNode | null, action: VNode | null },
    listMeta: Partial<FormListMeta>,
  ) => VueNode
  fieldExtraRender?: (
    fieldAction: FormListOperation,
    meta: {
      errors?: VueNode[]
      warnings?: VueNode[]
    },
  ) => VueNode
  itemContainerRender?: (doms: VueNode, listMeta: FormListMeta) => VueNode
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: VueNode,
    count: number,
  ) => VueNode[]
}
const ProFormListContainer = defineComponent<ProFormListContainerProps, {}, string, CustomSlotsType<ProFormListContainerSlots>>((props, { slots }) => {
  const intl = useIntl()
  const proProvide = useProConfig()
  const [loading, setLoading] = useState(false)
  const fieldKeyMap = shallowRef(new Map<string, string>())
  const readOnlyProvide = useEditOrReadOnlyContextInject()
  const uuidFields = computed(() =>
    props.fields?.map((field) => {
      if (!fieldKeyMap.value?.has(field.key.toString())) {
        fieldKeyMap.value?.set(field.key.toString(), nanoid())
      }
      const uuid = fieldKeyMap.value?.get(field.key.toString())
      return {
        ...field,
        uuid,
      }
    }),
  )
  /**
   * 根据行为守卫包装action函数
   */
  const wrapperAction = computed(() => {
    const { action, actionGuard, onAfterRemove, onAfterAdd } = props
    const wrapAction = { ...action! }
    const count = uuidFields.value?.length || 0
    if (actionGuard?.beforeAddRow) {
      wrapAction.add = async (...rest) => {
        const success = await actionGuard.beforeAddRow!(...rest, count)
        if (success) {
          const res = action?.add(...rest)
          onAfterAdd?.(...rest, count + 1)
          return res
        }
        return false
      }
    }
    else {
      wrapAction.add = (...rest) => {
        const res = action?.add(...rest)
        onAfterAdd?.(...rest, count + 1)
        return res
      }
    }
    if (actionGuard?.beforeRemoveRow) {
      wrapAction.remove = async (...rest) => {
        const success = await actionGuard.beforeRemoveRow!(...rest, count)
        if (success) {
          const res = action?.remove(...rest)
          onAfterRemove?.(...rest, count - 1)
          return res
        }
        return false
      }
    }
    else {
      wrapAction.remove = async (...rest) => {
        const res = action?.remove(...rest)
        onAfterRemove?.(...rest, count - 1)
        return res
      }
    }
    return wrapAction
  })
  const creatorButton = computed(() => {
    const { creatorButtonProps, prefixCls, max, creatorRecord } = props
    if (creatorButtonProps === false || uuidFields.value?.length === max)
      return null
    const {
      position = 'bottom',
      creatorButtonText = intl.value.getMessage({
        id: 'editableTable.action.add',
        defaultMessage: '添加一行数据',
      }),
    } = creatorButtonProps || {}
    return (
      <Button
        class={classNames(`${prefixCls}-creator-button-${position}`, proProvide.value.hashId)}
        type="dashed"
        loading={loading.value}
        block
        icon={<PlusOutlined />}
        {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
        onClick={() => {
          setLoading(true)
          // 如果不是从顶部开始添加，则插入的索引为当前行数
          let index = uuidFields.value?.length
          // 如果是顶部，加到第一个，如果不是，为空就是最后一个
          if (position === 'top')
            index = 0
          wrapperAction.value.add(runFunction(creatorRecord) ?? {}, index!)
          setLoading(false)
        }}
      >
        {creatorButtonText}
      </Button>
    )
  })
  return () => {
    const {
      containerStyle,
      readonly,
      fieldExtraRender = slots.fieldExtraRender,
      meta,
      containerClassName,
      creatorButtonProps,
    } = props
    const itemList = uuidFields.value?.map((field, index) => {
      return (
        <ProFormListItem
          {...props}
          field={field}
          index={index}
          action={wrapperAction.value}
          count={uuidFields.value?.length}
          v-slots={slots}
        />
      )
    })

    if (readOnlyProvide.mode.value === 'read' || readonly === true) {
      return <>{itemList}</>
    }
    return (
      <div
        style={{
          width: 'max-content',
          maxWidth: '100%',
          minWidth: '100%',
          ...containerStyle,
        }}
        class={containerClassName}
      >
        {creatorButtonProps !== false
          && creatorButtonProps?.position === 'top'
          && creatorButton.value}
        {itemList}
        {fieldExtraRender && fieldExtraRender(wrapperAction.value, meta!)}
        {creatorButtonProps !== false
          && creatorButtonProps?.position !== 'top'
          && creatorButton.value}
      </div>
    )
  }
}, {
  name: 'ProFormListContainer',
  inheritAttrs: false,
})
export default ProFormListContainer
