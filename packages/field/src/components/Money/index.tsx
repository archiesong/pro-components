import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { InputNumberProps } from 'antdv-next'
import type { ProFieldFC } from '../../typing'
import { intlMap as allIntlMap, useIntl } from '@antdv-next/pro-provider'
import { omit } from '@v-c/util'
import { computed, defineComponent } from 'vue'
import InputNumberPopover from './InputNumberPopover'

const defaultMoneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
  style: 'currency',
  currency: 'CNY',
})

const enMoneyIntl = {
  style: 'currency',
  currency: 'USD',
}

const ruMoneyIntl = {
  style: 'currency',
  currency: 'RUB',
}

const rsMoneyIntl = {
  style: 'currency',
  currency: 'RSD',
}

const msMoneyIntl = {
  style: 'currency',
  currency: 'MYR',
}

const ptMoneyIntl = {
  style: 'currency',
  currency: 'BRL',
}

const intlMap = {
  default: defaultMoneyIntl,
  'zh-Hans-CN': {
    currency: 'CNY',
    style: 'currency',
  },
  'en-US': enMoneyIntl,
  'ru-RU': ruMoneyIntl,
  'ms-MY': msMoneyIntl,
  'sr-RS': rsMoneyIntl,
  'pt-BR': ptMoneyIntl,
}

/**
 * A function that formats the number.
 * @param {string | false} locale - The currency symbol, which is the first parameter of the
 * formatMoney function.
 * @param {number | string | undefined} paramsText - The text to be formatted
 * @param {number} precision - number, // decimal places
 * @param {any} [config] - the configuration of the number format, which is the same as the
 * configuration of the number format in the Intl.NumberFormat method.
 * @param moneySymbol
 * @returns A function that takes in 4 parameters and returns a string.
 */
function getTextByLocale(locale: string | false, paramsText: number | string | undefined, precision: number, config?: any, moneySymbol: string = '') {
  let moneyText: number | string | undefined = paramsText?.toString().replace(/,/g, '')
  if (typeof moneyText === 'string') {
    const parsedNum = Number(moneyText)
    // 转换数字为NaN时，返回原始值展示
    if (Number.isNaN(parsedNum))
      return moneyText
    moneyText = parsedNum
  }
  if (!moneyText && moneyText !== 0)
    return ''
  const supportFormat = locale !== false
    && Intl.NumberFormat.supportedLocalesOf([locale.replace('_', '-')], {
      localeMatcher: 'lookup',
    }).length > 0

  try {
    // Formatting the number, when readonly moneySymbol = false, unused currency.
    const initNumberFormatter = new Intl.NumberFormat(
      supportFormat ? locale?.replace('_', '-') || 'zh-Hans-CN' : 'zh-Hans-CN',
      {
        ...(intlMap[(locale as 'zh-Hans-CN') || 'zh-Hans-CN'] || defaultMoneyIntl),
        maximumFractionDigits: precision,
        ...config,
      },
    )

    const finalMoneyText = initNumberFormatter.format(moneyText)
    // 同时出现两个符号的情况需要处理
    const doubleSymbolFormat = (Text: string) => {
      const match = Text.match(/\d+/)
      if (match) {
        const number = match[0]
        return Text.slice(Text.indexOf(number))
      }
      else {
        return Text
      }
    }
    // 过滤一下，只留下数字
    const pureMoneyText = doubleSymbolFormat(finalMoneyText)

    /**
     * 首字母判断是否是正负符号
     */
    const [operatorSymbol] = finalMoneyText || ''

    // 兼容正负号
    if (['+', '-'].includes(operatorSymbol as string)) {
      return `${moneySymbol || ''}${operatorSymbol}${pureMoneyText}`
    }
    return `${moneySymbol || ''}${pureMoneyText}`
  }
  catch (error) {
    return moneyText
  }
  return moneyText
}
// 默认的代码类型
const DefaultPrecisionCont = 2

export type FieldMoneyProps = ProFieldFC<{
  text: number
  moneySymbol?: boolean
  locale?: string
  /**
   * 输入框内容为空的提示内容
   */
  placeholder?: string
  /**
   * 自定义 money 的 Symbol
   */
  customSymbol?: string
  /**
   * 自定义 Popover 的值，false 可以关闭他
   */
  numberPopoverRender?:
    | ((props: InputNumberProps, defaultText: string) => VueNode)
    | boolean
  /**
   * NumberFormat 的配置，文档可以查看 mdn
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   */
  numberFormatOptions?: {
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    localeMatcher?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    style?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currency?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currencyDisplay?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currencySign?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    useGrouping?: boolean
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumIntegerDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumFractionDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    maximumFractionDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumSignificantDigits?: number

    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    maximumSignificantDigits?: number
  }
}, InputNumberProps & {
  numberFormatOptions?: {
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    localeMatcher?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    style?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currency?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currencyDisplay?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    currencySign?: string
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    useGrouping?: boolean
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumIntegerDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumFractionDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    maximumFractionDigits?: number
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    minimumSignificantDigits?: number

    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    maximumSignificantDigits?: number
  }
  numberPopoverRender?: | ((props: InputNumberProps, defaultText: string) => VueNode)
    | boolean
  customSymbol?: string
  moneySymbol?: boolean
  open?: boolean
}>

const FieldMoney = defineComponent<FieldMoneyProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const precision = computed(() => props.fieldProps?.precision ?? DefaultPrecisionCont)
    const intl = computed(() => {
      // 当手动传入locale时，应该以传入的locale为准，未传入时则根据全局的locale进行国际化
      if (props.locale && allIntlMap[props.locale as 'zh-CN']) {
        return allIntlMap[props.locale as 'zh-CN']
      }
      return useIntl().value
    })
    /**
     * 获取货币的符号
     * 如果 customSymbol 存在直接使用 customSymbol
     * 如果 moneySymbol 为 false，返回空
     * 如果没有配置使用默认的
     */
    const moneySymbol = computed(() => {
      const customSymbol = props.customSymbol || props.fieldProps?.customSymbol
      if (customSymbol) {
        return customSymbol
      }

      if (props.moneySymbol === false || props.fieldProps?.moneySymbol === false) {
        return undefined
      }
      return intl.value.getMessage({ id: 'moneySymbol', defaultMessage: '¥' })
    })

    /*
     * A function that formats the number.
     * 1000 -> 1,000
     */
    const getFormateValue = (value?: string | number) => {
      // 新建数字正则，需要配置小数点
      const reg = new RegExp(
        `\\B(?=(\\d{${3 + Math.max(precision.value - DefaultPrecisionCont, 0)}})+(?!\\d))`,
        'g',
      )
      // 切分为 整数 和 小数 不同
      const [intStr, floatStr] = String(value).split('.')

      // 最终的数据string，需要去掉 , 号。
      const resultInt = intStr?.replace(reg, ',')

      // 计算最终的小数点
      let resultFloat = ''

      /* Taking the floatStr and slicing it to the precision. */
      if (floatStr && precision.value > 0) {
        resultFloat = `.${floatStr.slice(
          0,
          precision.value === undefined ? DefaultPrecisionCont : precision.value,
        )}`
      }

      return `${resultInt}${resultFloat}`
    }
    return () => {
      const {
        text,
        mode: type,
        render,
        formItemRender,
        fieldProps,
        placeholder: propsPlaceholder,
        locale,
        numberFormatOptions = fieldProps?.numberFormatOptions,
        numberPopoverRender = fieldProps?.numberPopoverRender || false,
        moneySymbol: propsMoneySymbol,
        customSymbol,
        ...rest
      } = props
      // 如果是阅读模式，直接返回字符串
      if (type === 'read') {
        const dom = (
          <span>
            {getTextByLocale(
              locale || false,
              text,
              precision.value,
              numberFormatOptions ?? fieldProps?.numberFormatOptions,
              moneySymbol.value,
            )}
          </span>
        )
        if (render) {
          return <>{render(text, { mode: type, ...rest, fieldProps }, dom)}</>
        }
        return dom
      }
      if (type === 'edit' || type === 'update') {
        const placeholder = fieldProps?.placeholder || propsPlaceholder
          || intl.value.getMessage({
            id: 'tableForm.inputPlaceholder',
            defaultMessage: '请输入',
          })
        const dom = (
          <InputNumberPopover
            contentRender={(props) => {
              if (numberPopoverRender === false)
                return null
              if (!props.value)
                return null
              const localeText = getTextByLocale(
                locale || false,
                `${getFormateValue(props.value)}`,
                precision.value,
                {
                  ...numberFormatOptions,
                  notation: 'compact',
                },
                moneySymbol.value,
              )
              if (typeof numberPopoverRender === 'function') {
                return numberPopoverRender?.(props, (localeText || '').toString())
              }
              return localeText
            }}
            precision={precision.value}
            // 删除默认min={0}，允许输入一个负数的金额，用户可自行配置min来限制是否允许小于0的金额
            formatter={(value) => {
              if (value && moneySymbol.value) {
                return `${moneySymbol.value} ${getFormateValue(value)}`
              }
              return value?.toString() || (value as string)
            }}
            parser={(value) => {
              if (moneySymbol.value && value) {
                const regStr = `\\${moneySymbol.value}\\s?|(,*)`
                return value.replace(new RegExp(regStr, 'g'), '')
              }
              return value!
            }}
            placeholder={placeholder}
            {...omit(fieldProps!, [
              'numberFormatOptions',
              'precision',
              'numberPopoverRender',
              'customSymbol',
              'moneySymbol',
              'open',
              'onBlur',
            ])}
            onBlur={
              fieldProps?.onBlur
                ? (e: FocusEvent) => {
                    let value = (e.target as unknown as { value: string })?.value
                    if (moneySymbol.value && value) {
                      const regStr = `\\${moneySymbol.value}\\s?|(,*)`
                      value = value.replace(new RegExp(regStr, 'g'), '')
                    }
                    fieldProps.onBlur?.(e)
                  }
                : undefined
            }
          />
        )

        if (formItemRender) {
          return <>{formItemRender(text, { mode: type, ...rest, fieldProps, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldMoney',
    inheritAttrs: false,
  },
)

export default FieldMoney
