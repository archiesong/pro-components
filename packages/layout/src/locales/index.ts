import enUSLocal from './en_US';
import itITLocal from './it_IT';
import koKRLocal from './ko_KR';
import zhLocal from './zh_CN';
import zhTWLocal from './zh_TW';
import { isBrowser } from '@ant-design-vue/pro-utils';
const locales = {
  zh_CN: zhLocal,
  zh_TW: zhTWLocal,
  en_US: enUSLocal,
  it_IT: itITLocal,
  ko_KR: koKRLocal,
};
type GLocaleWindow = {
  g_locale: keyof typeof locales;
};
const localeKeyMap = {
  en: 'en_US',
  'zh-cn': 'zh_CN',
  'zh-tw': 'zh_TW',
  it: 'it_IT',
  ko: 'ko_KR',
};

export const getLanguage = (locale?: string): string => {
  if (!isBrowser()) return 'zh-CN';
  return (
    (locale && localeKeyMap[locale as keyof typeof localeKeyMap]) ||
    (window as unknown as GLocaleWindow).g_locale ||
    navigator.language
  );
};
export const gLocaleObject = (locale?: string): Record<string, string> => {
  const gLocale = getLanguage(locale);
  return locales[gLocale as keyof typeof locales] || locales['zh_CN'];
};
