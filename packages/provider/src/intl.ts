import type { ComputedRef } from 'vue'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed } from 'vue'
import { useProConfig } from './context'
import arEG from './locale/ar_EG'
import caES from './locale/ca_ES'
import deDE from './locale/de_DE'
import enGB from './locale/en_GB'
import enUS from './locale/en_US'
import esES from './locale/es_ES'
import faIR from './locale/fa_IR'
import frFR from './locale/fr_FR'
import hrHR from './locale/hr_HR'
import idID from './locale/id_ID'
import itIT from './locale/it_IT'
import jaJP from './locale/ja_JP'
import koKR from './locale/ko_KR'
import mnMN from './locale/mn_MN'
import msMY from './locale/ms_MY'
import plPL from './locale/pl_PL'
import ptBR from './locale/pt_BR'
import ruRU from './locale/ru_RU'
import srRS from './locale/sr_RS'
import thTH from './locale/th_TH'
import trTR from './locale/tr_TR'
import viVN from './locale/vi_VN'
import zhCN from './locale/zh_CN'
import zhTW from './locale/zh_TW'

export interface IntlType {
  locale: string
  getMessage: (message: { id: string, defaultMessage?: string }) => string | undefined
}

/**
 * 安全的从一个对象中读取相应的值
 * @param source
 * @param path
 * @param defaultValue
 */
function get(source: Record<string, any>, path: string, defaultValue?: string): string | undefined {
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result: Record<string, any> = source
  let message = defaultValue
  for (const p of paths) {
    message = result[p]
    result = result[p]
    if (message === void 0) {
      return defaultValue
    }
  }
  return message
}

/**
 * 创建一个国际化的操作函数
 *
 * @param locale
 * @param localeMap
 */
export function createIntl(locale: string, localeMap: Record<string, any>): IntlType {
  return {
    getMessage: ({ id, defaultMessage }) => get(localeMap, id, defaultMessage) || defaultMessage,
    locale,
  }
}
const mnMNIntl = createIntl('mn_MN', mnMN)
const arEGIntl = createIntl('ar_EG', arEG)
const zhCNIntl = createIntl('zh_CN', zhCN)
const enUSIntl = createIntl('en_US', enUS)
const enGBIntl = createIntl('en_GB', enGB)
const viVNIntl = createIntl('vi_VN', viVN)
const itITIntl = createIntl('it_IT', itIT)
const jaJPIntl = createIntl('ja_JP', jaJP)
const esESIntl = createIntl('es_ES', esES)
const caESIntl = createIntl('ca_ES', caES)
const ruRUIntl = createIntl('ru_RU', ruRU)
const srRSIntl = createIntl('sr_RS', srRS)
const msMYIntl = createIntl('ms_MY', msMY)
const zhTWIntl = createIntl('zh_TW', zhTW)
const frFRIntl = createIntl('fr_FR', frFR)
const ptBRIntl = createIntl('pt_BR', ptBR)
const koKRIntl = createIntl('ko_KR', koKR)
const idIDIntl = createIntl('id_ID', idID)
const deDEIntl = createIntl('de_DE', deDE)
const faIRIntl = createIntl('fa_IR', faIR)
const trTRIntl = createIntl('tr_TR', trTR)
const plPLIntl = createIntl('pl_PL', plPL)
const hrHRIntl = createIntl('hr_HR', hrHR)
const thTHIntl = createIntl('th_TH', thTH)

const intlMap = {
  'mn-MN': mnMNIntl,
  'ar-EG': arEGIntl,
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'en-GB': enGBIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'ja-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ca-ES': caESIntl,
  'ru-RU': ruRUIntl,
  'sr-RS': srRSIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
  'ko-KR': koKRIntl,
  'id-ID': idIDIntl,
  'de-DE': deDEIntl,
  'fa-IR': faIRIntl,
  'tr-TR': trTRIntl,
  'pl-PL': plPLIntl,
  'hr-HR': hrHRIntl,
  'th-TH': thTHIntl,
}

const intlMapKeys = Object.keys(intlMap) as (keyof typeof intlMap)[]

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
export function findIntlKeyByAntdLocaleKey<T extends string>(localeKey?: T) {
  const localeName = (localeKey || 'zh-CN').toLocaleLowerCase()
  return intlMapKeys.find((intlKey) => {
    const LowerCaseKey = intlKey.toLocaleLowerCase()
    return LowerCaseKey.includes(localeName)
  }) as T
}

/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * 获取国际化的方法
 * the current locale
 * @returns The return value of the function is the intl object.
 */
export function useIntl(): ComputedRef<IntlType> {
  const config = useConfig()
  const proProvide = useProConfig()
  return computed(() => {
    if (proProvide.value.intl?.locale !== 'default') {
      return proProvide.value.intl || zhCNIntl
    }
    if (config.value.locale?.locale) {
      return intlMap[findIntlKeyByAntdLocaleKey(config.value.locale?.locale) as 'zh-CN'] || zhCNIntl
    }
    return zhCNIntl
  })
}

export {
  arEGIntl,
  caESIntl,
  deDEIntl,
  enGBIntl,
  enUSIntl,
  esESIntl,
  faIRIntl,
  frFRIntl,
  hrHRIntl,
  idIDIntl,
  intlMap,
  intlMapKeys,
  itITIntl,
  jaJPIntl,
  koKRIntl,
  mnMNIntl,
  msMYIntl,
  plPLIntl,
  ptBRIntl,
  ruRUIntl,
  srRSIntl,
  thTHIntl,
  trTRIntl,
  viVNIntl,
  zhCNIntl,
  zhTWIntl,
}
