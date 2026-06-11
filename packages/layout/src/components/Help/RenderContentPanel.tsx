import type { ImageProps } from 'antdv-next'
import type { LinkProps } from 'antdv-next/dist/typography/Link'
import type { ExtractPropTypes, FunctionalComponent, PropType } from 'vue'
import type { ProHelpDataSourceChildren } from './HelpProvide'
import { useEffect } from '@antdv-next/pro-utils'
import { Image, TypographyLink, TypographyText, TypographyTitle } from 'antdv-next'
import { defineComponent, Fragment, shallowRef } from 'vue'
import { useProHelpContext } from './HelpProvide'
import { useSelectKeyContext } from './ProHelpPanel'

const NavigationSwitch: FunctionalComponent<{
  selectKey: string
}> = (props, { slots }) => {
  const context = useSelectKeyContext()
  return (
    <TypographyText>
      <a
        data-testid="navigation-switch"
        onClick={() => {
          context.value.setSelectedKey?.(props.selectKey)
        }}
      >
        {slots.default?.()}
      </a>
    </TypographyText>
  )
}

export function renderContentPanelProps() {
  return {
    dataSourceChildren: {
      type: Array as PropType<ProHelpDataSourceChildren<any>[]>,
      default: undefined,
    },
    onInit: {
      type: Function as PropType<(ref: HTMLDivElement) => void>,
      default: undefined,
    },
  }
}

export type RenderContentPanelProps = Partial<ExtractPropTypes<ReturnType<typeof renderContentPanelProps>>>

const RenderContentPanel = defineComponent({
  name: 'RenderContentPanel',
  inheritAttrs: false,
  props: renderContentPanelProps(),
  setup(props) {
    const proHelpContextProvide = useProHelpContext()
    const divRef = shallowRef<HTMLDivElement | null>(null)

    useEffect(() => {
      props.onInit?.(divRef.value!)
    }, [() => props.dataSourceChildren])

    /**
     * itemRender 的定义
     * @param {ProHelpDataSourceChildren} item
     * @param {number} index
     * @return {*}
     */
    const itemRender = (item: ProHelpDataSourceChildren, index: number) => {
    // 自定义的渲染，优先级最高
      if (proHelpContextProvide.value.valueTypeMap.has(item.valueType)) {
        return (
          <Fragment key={index}>
            {proHelpContextProvide.value.valueTypeMap.get(item.valueType)?.(item, index)}
          </Fragment>
        )
      }
      if (item.valueType === 'html') {
        const { class: className, children } = item.children as { class: string, children: string }
        return (
          <div key={index} class={className || 'inner-html'}>{children}</div>
        )
      }
      if (item.valueType === 'h1') {
        return (
          <TypographyTitle
            key={index}
            style={{
              marginTop: 0,
            }}
            level={3}
          >
            {item.children}
          </TypographyTitle>
        )
      }
      if (item.valueType === 'h2') {
        return (
          <TypographyTitle
            key={index}
            style={{
              marginTop: '20px',
            }}
            level={5}
          >
            {item.children}
          </TypographyTitle>
        )
      }

      if (item.valueType === 'image') {
        return (
          <div
            key={index}
            style={{
              marginBlock: '12px',
            }}
          >
            <Image {...(item.children as ImageProps)} />
          </div>
        )
      }
      if (item.valueType === 'inlineLink') {
        const { children, ...props } = item.children as LinkProps & { children: string }
        return (
          <TypographyLink key={index} {...props}>
            {children}
          </TypographyLink>
        )
      }
      if (item.valueType === 'link') {
        const { children, ...props } = item.children as LinkProps & { children: string }
        return (
          <div key={index}>
            <TypographyLink key={index} {...props}>
              {children}
            </TypographyLink>
          </div>
        )
      }
      if (item.valueType === 'navigationSwitch') {
        const { selectKey, children } = item.children as {
          children: string
          selectKey: string
        }
        return (
          <NavigationSwitch
            key={index}
            selectKey={selectKey}
          >
            {children}
          </NavigationSwitch>
        )
      }
      return (
        <TypographyText key={index}>{item.children as string}</TypographyText>
      )
    }
    return () => {
      const { dataSourceChildren } = props
      return <div ref={divRef}>{dataSourceChildren?.map(itemRender)}</div>
    }
  },
})

export default RenderContentPanel
