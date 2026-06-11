import { isBrowser } from '@antdv-next/pro-utils'
import enUSLocal from './en-US'
import itITLocal from './it-IT'
import koKRLocal from './ko-KR'
import zhLocal from './zh-CN'
import zhTWLocal from './zh-TW'

const locales = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal,
  'ko-KR': koKRLocal,
}
interface GLocaleWindow {
  g_locale: keyof typeof locales
}

export function getLanguage(): string {
  // support ssr
  if (!isBrowser())
    return 'zh-CN'
  return (window as unknown as GLocaleWindow).g_locale || navigator.language
}
export function gLocaleObject(): Record<string, string> {
  const gLocale = getLanguage()
  return locales[gLocale as 'zh-CN'] || locales['zh-CN']
}
