import type { MenuDataItem, MessageDescriptor } from '../typing'
import { transformRoute } from '@antdv-next1/route-utils'

function fromEntries<K extends string, V>(iterable: Map<K, V>): Record<K, V> {
  return [...iterable].reduce(
    (obj, [key, val]) => {
      obj[key] = val
      return obj
    },
    {} as Record<K, V>,
  )
}

export function getMenuData(routes: MenuDataItem[], menu?: { locale?: boolean }, formatMessage?: (message: MessageDescriptor) => string | undefined, menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[]) {
  const { menuData, breadcrumb } = transformRoute(
    routes || [],
    menu?.locale || false,
    formatMessage,
  )
  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    }
  }
  return getMenuData(menuDataRender(menuData), menu, formatMessage, undefined)
}
