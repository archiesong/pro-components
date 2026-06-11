import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { BorderBeamProps, CardProps } from 'antdv-next'
import type { VNode } from 'vue'
import type { StatisticProps } from '../Statistic'
import { classNames } from '@v-c/util'
import { BorderBeam, Card } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import Statistic from '../Statistic'
import { useStyle } from './style'

export interface StatisticCardProps extends CardProps {
  /** 图表配置 */
  chart?: VueNode
  headerBordered?: boolean
  /** 边框流光 */
  borderBeam?: BorderBeamProps | boolean
  /** 数值统计配置 */
  statistic?: StatisticProps
  /** Chart 相对于 statistic 的位置 */
  chartPlacement?: 'right' | 'bottom' | 'left'
  /** 底部额外展示区域 */
  footer?: VueNode
}

const _StatisticCard = defineComponent<StatisticCardProps, {}, string, CustomSlotsType<{
  default?: () => VNode[]
}>>((props, { attrs, slots }) => {
  const config = useConfig()
  const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
  const baseClassName = computed(() => `${prefixCls.value}-statistic-card`)
  const { wrapSSR, hashId } = useStyle(baseClassName)
  return () => {
    const { statistic, chart, headerBordered = false, borderBeam, chartPlacement, footer, ...restProps } = props
    // 在 StatisticCard 中时默认为 vertical。
    const statisticDom = statistic && (
      <Statistic layout="vertical" {...statistic} />
    )
    const chartDom = chart && (
      <div class={classNames(`${baseClassName.value}-chart`, hashId.value, {
        [`${baseClassName.value}-chart-left`]:
      chartPlacement === 'left' && chart && statistic,
        [`${baseClassName.value}-chart-right`]:
      chartPlacement === 'right' && chart && statistic,
      })}
      >
        {chart}
      </div>
    )
    const contentCls = classNames(`${baseClassName.value}-content `, hashId.value, {
      [`${baseClassName.value}-content-horizontal`]:
      chartPlacement === 'left' || chartPlacement === 'right',
    })
    // 默认上下结构
    const contentDom
      = (chartDom || statisticDom)
        && (chartPlacement === 'left' ? (
          <div class={contentCls}>
            {chartDom}
            {statisticDom}
          </div>
        ) : (
          <div class={contentCls}>
            {statisticDom}
            {chartDom}
          </div>
        ))

    return wrapSSR(
      <>
        {restProps.variant !== 'borderless' && borderBeam ? (
          <BorderBeam {...(typeof borderBeam === 'boolean' ? {} : borderBeam)}>
            <Card
              style={attrs.style}
              class={classNames(baseClassName.value, attrs.class, hashId.value)}
              {...restProps}
              styles={{
                header: headerBordered ? { } : { borderBlockEnd: 'none' },
                ...restProps.styles,
              }}
            >
              {contentDom}
              {slots.default?.()}
              {footer && (
                <div class={classNames(`${baseClassName.value}-footer`, hashId.value)}>{footer}</div>
              )}
            </Card>
          </BorderBeam>
        ) : (
          <Card
            style={attrs.style}
            class={classNames(baseClassName.value, attrs.class, hashId.value)}
            {...restProps}
            styles={{
              header: headerBordered ? { } : { borderBlockEnd: 'none' },
              ...restProps.styles,
            }}
          >
            {contentDom}
            {slots.default?.()}
            {footer && (
              <div class={classNames(`${baseClassName.value}-footer`, hashId.value)}>{footer}</div>
            )}
          </Card>
        )}
      </>,
    )
  }
}, {
  name: 'StatisticCard',
  inheritAttrs: false,
})

const StatisticCard = _StatisticCard as typeof _StatisticCard & {
  isProCard?: boolean
  Statistic?: typeof Statistic
}

StatisticCard.isProCard = true
StatisticCard.Statistic = Statistic
export default StatisticCard
