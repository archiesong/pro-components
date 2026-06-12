import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next1/pro-utils'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { SetupContext } from 'vue'
import type { ProColumns } from '../../typing'
import { useIntl, useProConfig } from '@antdv-next1/pro-provider'
import { classNames } from '@v-c/util'
import { defineComponent } from 'vue'
import CheckboxList from './CheckboxList'

export interface GroupCheckboxListProps<T, ValueType> {
  draggable?: boolean
  checkable?: boolean
  showListItemOption?: boolean
  columns?: ProColumns<T, ValueType>[]
  listsHeight?: number
}

const GroupCheckboxList = defineComponent(<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(props: GroupCheckboxListProps<T, ValueType>, { attrs }: SetupContext<{}, CustomSlotsType<{
  default?: () => VueNode
}>>) => {
  const proProvide = useProConfig()
  const intl = useIntl()

  return () => {
    const { columns, draggable, checkable, showListItemOption, listsHeight } = props
    const endList: ProColumns<T, ValueType>[] = []
    const startList: ProColumns<T, ValueType>[] = []
    const list: ProColumns<T, ValueType>[] = []
    console.log(columns, 'columns1')
    columns?.forEach((item) => {
      const { fixed, hideInSetting } = item
      /** 不在 setting 中展示的 */
      if (hideInSetting) {
        return
      }
      if (fixed === 'start') {
        startList.push(item)
        return
      }
      if (fixed === 'end') {
        endList.push(item)
        return
      }
      list.push(item)
    })

    const showRight = endList && endList.length > 0

    const showLeft = startList && startList.length > 0
    return (
      <div
        class={classNames(`${attrs.class}-list`, proProvide.value.hashId, {
          [`${attrs.class}-list-group`]: showRight || showLeft,
        })}
      >
        <CheckboxList
          title={intl.value.getMessage({
            id: 'tableToolBar.startFixedTitle',
            defaultMessage: '固定在左侧',
          })}
          list={startList}
          class={attrs.class}
          draggable={draggable}
          checkable={checkable}
          showListItemOption={showListItemOption}
          listsHeight={listsHeight}
        />
        {/* 如果没有任何固定，不需要显示title */}
        <CheckboxList
          list={list}
          draggable={draggable}
          checkable={checkable}
          showListItemOption={showListItemOption}
          title={intl.value.getMessage({
            id: 'tableToolBar.noFixedTitle',
            defaultMessage: '不固定',
          })}
          showTitle={showLeft || showRight}
          class={attrs.class}
          listsHeight={listsHeight}
        />
        <CheckboxList
          title={intl.value.getMessage({
            id: 'tableToolBar.endFixedTitle',
            defaultMessage: '固定在右侧',
          })}
          list={endList}
          draggable={draggable}
          checkable={checkable}
          showListItemOption={showListItemOption}
          class={attrs.class}
          listsHeight={listsHeight}
        />
      </div>
    )
  }
}, {
  name: 'GroupCheckboxList',
  inheritAttrs: false,
  props: ['checkable', 'columns', 'draggable', 'listsHeight', 'showListItemOption'],

})

export default GroupCheckboxList
