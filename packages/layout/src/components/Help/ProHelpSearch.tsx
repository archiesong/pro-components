import type { DefaultOptionType } from '@v-c/select'
import type { VueNode } from '@v-c/util'
import type { SelectProps } from 'antdv-next'
import type { FunctionalComponent } from 'vue'
import { SearchOutlined } from '@antdv-next/icons'
import { useProConfig } from '@antdv-next/pro-provider'
import { useDebounceFn, useState } from '@antdv-next/pro-utils'
import { classNames } from '@v-c/util'
import { Select } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import { useProHelpContext } from './HelpProvide'

const Highlight: FunctionalComponent<{
  /**
   * 要高亮的文本
   */
  label: string
  /**
   * 高亮的关键词数组
   */
  words: string[]
  class?: string

}> = ({ label, words, class: className }) => {
  if (!words?.length || !words[0]) {
    return <div title={label} class={className}>{label}</div>
  }
  // 创建正则表达式匹配关键词
  const matchKeywordsRE = new RegExp(
    words.map(word => word.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')).join('|'),
    'gi',
  )
  let matchText = label
  const elements: VueNode[] = []
  // 遍历匹配的文本，将匹配项和非匹配项分别处理并放入elements数组中
  while (matchText.length) {
    const match = matchKeywordsRE.exec(matchText)
    if (!match) {
      elements.push(matchText)
      break
    }

    const start = match.index
    const matchLength = match[0].length + start

    elements.push(
      matchText.slice(0, start),
      <span class={`${className}-light`}>{matchText.slice(start, matchLength)}</span>,
    )
    matchText = matchText.slice(matchLength)
  }
  return (
    <div title={label} class={className}>
      {elements}
    </div>
  )
}

export type ProHelpSearchProps = Omit<SelectProps, 'onSearch' | 'optionFilterProp' | 'options' | 'filterOption'> & {
  iconClassName?: string
  basePrefixCls?: string
  class?: string
}

const ProHelpSearch = defineComponent(
  (props: ProHelpSearchProps) => {
    const baseClassName = computed(() => `${props.basePrefixCls}-search-list-item-content`)
    const proHeleContextProvide = useProHelpContext()
    const [keyWord, setKeyWork] = useState<string>(props.defaultValue ?? '')
    const debounceSetKeyWork = useDebounceFn(async key => setKeyWork(key), 20)
    const proConfig = useProConfig()
    const [open, setOpen] = useState<boolean>(false)
    return () => {
      const { iconClassName, basePrefixCls, ...restProps } = props
      return (
        <>
          {
            !open.value ? (
              <div class={classNames(iconClassName, proConfig.value.hashId)}>
                <SearchOutlined
                  {...{ title: 'search panel' }}
                  onClick={() => {
                    setOpen(true)
                  }}
                />
              </div>
            ) : null
          }
          {
            open.value ? (
              <Select
                {...restProps}
                placeholder="please input search text"
                showSearch={
                  {
                    onSearch: (value) => {
                      debounceSetKeyWork.cancel()
                      debounceSetKeyWork.run(value)
                    },
                    filterOption: (input, option: DefaultOptionType) =>
                      (option?.title ?? '').toLowerCase().includes(input.toLowerCase()),
                  }
                }
                onBlur={() => setOpen(false)}
                size="small"
                popupMatchSelectWidth={false}
                options={proHeleContextProvide.value.dataSource.map(item => ({
                  label: (
                    <Highlight
                      label={item.title}
                      class={baseClassName.value}
                      words={keyWord.value ? [keyWord.value] : []}
                    />
                  ),
                  title: item.title,
                  value: item.key,
                  options: item.children?.map((sunItem) => {
                    return {
                      label: (
                        <Highlight
                          label={sunItem.title}
                          class={baseClassName.value}
                          words={keyWord.value ? [keyWord.value] : []}
                        />
                      ),
                      title: sunItem.title,
                      value: sunItem.key,
                      dataItemKey: item.key,
                    }
                  }),
                }))}
              />

            ) : null
          }
        </>
      )
    }
  },
  {
    name: 'ProHelpSearch',
    inheritAttrs: false,
    props: [
      'iconClassName',
      'basePrefixCls',
      'fieldNames',
      'placeholder',
      'virtual',
      'onUpdate:value',
      'variant',
      'value',
      'labelRender',
      'size',
      'styles',
      'suffixIcon',
      'showSearch',
      'searchValue',
      'removeIcon',
      'prefix',
      'defaultValue',
      'popupRender',
      'placement',
      'optionRender',
      'filterSort',
      'listHeight',
      'open',
      'loading',
      'maxCount',
      'labelInValue',
      'getPopupContainer',
      'class',
      'allowClear',
      'prefixCls',
      'animation',
      'autoClearSearchValue',
      'autoFocus',
      'bordered',
      'builtinPlacements',
      'choiceTransitionName',
      'classes',
      'clearIcon',
      'components',
      'defaultActiveFirstOption',
      'defaultOpen',
      'defaultValue',
      'direction',
      'disabled',
      'dropdownClassName',
      'onChange',
      'onActive',
      'onBlur',
      'onClear',
      'onOpenChange',
      'onFocus',
      'onInputKeydown',
      'onDeselect',
      'dropdownMatchSelectWidth',
      'onSelect',
      'onPopupScroll',
      'dropdownRender',
    ],
  },
)
export default ProHelpSearch
