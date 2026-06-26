import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { StatisticProps as AntdStatisticProps, BadgeProps, TooltipProps } from 'antdv-next'
import type { VueNode as AntVueNode } from 'antdv-next/dist/_util/type'
import type { VNode } from 'vue'
import { QuestionCircleOutlined } from '@antdv-next/icons'
import { classNames } from '@v-c/util'
import { Statistic as AntdStatistic, Badge, Tooltip } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import { useStyle } from './style'

export interface StatisticProps /* @vue-ignore */ extends AntdStatisticProps {
  /** 描述性标签 */
  description?: VueNode
  /** 标题提示 */
  tooltip?: TooltipProps & {
    icon?: VueNode
  } | VueNode
  /** 当前项显示的状态 */
  status?: BadgeProps['status']
  /** Icon 图标 */
  icon?: VueNode
  /** Layout 布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 趋势 */
  trend?: 'up' | 'down'
}

const Statistic = defineComponent<StatisticProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
}>>((props, { attrs }) => {
  const config = useConfig()
  const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
  const baseClassName = computed(() => `${prefixCls.value}-card-statistic`)
  const { wrapSSR, hashId } = useStyle(baseClassName)
  return () => {
    const {
      layout = 'inline',
      description,
      title,
      tooltip,
      status,
      trend,
      prefix,
      icon,
      ...rest
    } = props
    const tooltipDom = tooltip && (
      <Tooltip title={tooltip as AntVueNode}>
        <QuestionCircleOutlined class={classNames(`${baseClassName.value}-tip`, hashId.value)} />
      </Tooltip>
    )
    const trendDom = trend && (
      <div class={classNames(`${baseClassName.value}-trend-icon`, hashId.value, {
        [`${baseClassName.value}-trend-icon-${trend}`]: trend,
      })}
      />
    )

    return wrapSSR(
      <div class={classNames(baseClassName.value, attrs.class, hashId.value)} style={attrs.style}>
        {icon && <div class={classNames(`${baseClassName.value}-icon`, hashId.value)}>{icon}</div>}
        <div class={classNames(`${baseClassName.value}-wrapper`, hashId.value)}>
          { status && (
            <div class={classNames(`${baseClassName.value}-status`, hashId.value)}>
              <Badge status={status} text={null} />
            </div>
          )}
          <div class={classNames(`${baseClassName.value}-content`, hashId.value)}>
            <AntdStatistic
              title={
                ((title || tooltipDom) && (
                  <>
                    {title}
                    {tooltipDom}
                  </>
                )) as AntVueNode
              }
              prefix={
                (trendDom || prefix) && (
                  <>
                    {trendDom}
                    {prefix}
                  </>
                )
              }
              class={classNames(hashId.value, {
                [`${baseClassName.value}-layout-${layout}`]: layout,
                [`${baseClassName.value}-trend-${trend}`]: trend,
              })}
              {...rest}
            />
            {description && (
              <div class={classNames(`${baseClassName.value}-description`, hashId.value)}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>,
    )
  }
}, {
  name: 'Statistic',
  inheritAttrs: false,
})

export default Statistic
