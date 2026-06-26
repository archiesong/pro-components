import type { WithFalse } from '@antdv-next1/pro-utils'
import type { BreadcrumbProps as AntdBreadcrumbProps } from 'antdv-next'
import type { ItemType } from 'antdv-next/dist/breadcrumb/Breadcrumb'
import type { ProSettings } from '../defaultSettings'
import type { ProLayoutProps } from '../ProLayout'
import type { MenuDataItem, MessageDescriptor } from '../typing'
import { match } from '@antdv-next1/route-utils'
import { version } from 'antdv-next'
import { h, isVNode, resolveComponent } from 'vue'

export function getVersion() {
  if (typeof process === 'undefined' || typeof import.meta === 'undefined')
    return version
  return process?.env?.ANTD_VERSION || import.meta.env?.ANTD_VERSION || version
}

export interface BreadcrumbProLayoutProps {
  home?: string
  location?:
    | {
      path?: string
    }
  menu?: ProSettings['menu']
  breadcrumbMap?: Map<string, MenuDataItem>
  formatMessage?: (message: MessageDescriptor) => string | undefined
  breadcrumbRender?: WithFalse<(routes: AntdBreadcrumbProps['items']) => AntdBreadcrumbProps['items']>
  itemRender?: AntdBreadcrumbProps['itemRender']
}

export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/']
  }
  const urlList = url.split('/').filter(i => i)
  return ['/'].concat(urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`))
}

// 渲染 Breadcrumb 子节点
// Render the Breadcrumb child node
const defaultItemRender: AntdBreadcrumbProps['itemRender'] = (route, _, routes) => {
  if (isVNode(route)) {
    return route
  }
  const { title, path, onClick } = route
  const last = routes.findIndex(i => i.path === route.path) === routes.length - 1
  return last ? <span>{title}</span> : onClick ? <span onClick={onClick} style={{ cursor: 'pointer' }}>{title}</span> : h(resolveComponent('RouterLink'), { to: path }, () => title)
}

function renderItemLocal({ meta }: MenuDataItem, props: BreadcrumbProLayoutProps): string | undefined {
  const { formatMessage, menu } = props
  if (meta?.locale && formatMessage && menu?.locale !== false) {
    return formatMessage({ id: meta.locale, defaultMessage: meta.title })
  }
  return meta?.title
}

export function getBreadcrumb(breadcrumbMap: Map<string, MenuDataItem>, url: string): MenuDataItem {
  let breadcrumbItem = breadcrumbMap.get(url)
  if (!breadcrumbItem) {
    // Find the first matching path in the order defined by route config
    // 按照 route config 定义的顺序找到第一个匹配的路径
    const keys: string[] = Array.from(breadcrumbMap.keys()) || []
    const targetPath = keys.find((path) => {
      try {
        if (path?.startsWith('http'))
          return false
        return match(path.replace('?', ''))(url)
      }
      catch (error) {
        return false
      }
    })
    if (targetPath)
      breadcrumbItem = breadcrumbMap.get(targetPath)
  }
  return breadcrumbItem || { path: '' }
}

export function getBreadcrumbFromProps(props: BreadcrumbProLayoutProps): {
  location: BreadcrumbProLayoutProps['location']
  breadcrumbMap: BreadcrumbProLayoutProps['breadcrumbMap']
} {
  const { location, breadcrumbMap } = props
  return {
    location,
    breadcrumbMap,
  }
}

function conversionFromRoute(location: BreadcrumbProLayoutProps['location'], breadcrumbMap: Map<string, MenuDataItem>, props: BreadcrumbProLayoutProps): AntdBreadcrumbProps['items'] {
  const pathSnippets = urlToList(location?.path)

  return pathSnippets
    .map((url) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbMap, url)
      const title = renderItemLocal(currentBreadcrumb, props)
      const { meta } = currentBreadcrumb
      return title && !meta?.hideInBreadcrumb
        ? {
            path: url,
            title,
          }
        : { path: '', title }
    })
    .filter(item => item && item.path)
}

export type BreadcrumbListReturn = Pick<AntdBreadcrumbProps, Extract<keyof AntdBreadcrumbProps, 'items' | 'itemRender'>>

/** 将参数转化为面包屑 Convert parameters into breadcrumbs */
export function genBreadcrumbProps(props: BreadcrumbProLayoutProps): AntdBreadcrumbProps['items'] {
  const { location, breadcrumbMap } = getBreadcrumbFromProps(props)
  // 根据 route 生成 面包屑
  // Generate breadcrumbs based on route
  if (location && location.path && breadcrumbMap) {
    return conversionFromRoute(location, breadcrumbMap, props)
  }
  return []
}

// 声明一个导出函数，接收两个参数：BreadcrumbProps和ProLayoutProps，返回一个BreadcrumbListReturn类型的对象
export function getBreadcrumbProps(props: Omit<BreadcrumbProLayoutProps, 'breadcrumbRender'> & {
  breadcrumbRender?: WithFalse<(routes: AntdBreadcrumbProps['items']) => AntdBreadcrumbProps['items']>
  breadcrumbProps?: AntdBreadcrumbProps
}, layoutProps: ProLayoutProps): BreadcrumbListReturn {
  // 解构赋值获取props中的breadcrumbRender和props中的itemRender，如果props中没有itemRender则使用默认的defaultItemRender函数
  const { breadcrumbRender, itemRender: propsItemRender } = props
  // 解构赋值获取layoutPros.breadcrumbProps.minLenght的值，如果没有设置，则默认为2
  const { minLength = 2 } = layoutProps.breadcrumbProps || {}
  // 生成面包屑的路由数组，该数组中包含菜单项和面包屑项
  const routesArray = genBreadcrumbProps(props)
  // 如果props中有itemRender，则使用props中的itemRender，否则使用默认函数defaultItemRender
  const itemRender: AntdBreadcrumbProps['itemRender'] = (route, ...rest) => {
    const renderFunction = propsItemRender || defaultItemRender
    return renderFunction?.(
      {
        ...route,
        onClick: props.breadcrumbProps?.onClickItem ? e => props.breadcrumbProps?.onClickItem?.(route, e) : undefined,
      },
      ...rest,
    )
  }
  let items = routesArray as ItemType[] | undefined

  // 如果面包屑渲染函数breadcrumbRender存在，则使用其渲染数组routes
  if (breadcrumbRender) {
    items = breadcrumbRender(items || []) || undefined
  }
  // 如果routes（渲染后的数组）的长度小于minLength或者breadcrumbRender为false，则routes为undefined
  if ((items && items.length < minLength) || breadcrumbRender === false) {
    items = undefined
  }

  return {
    items,
    itemRender,
  }
}
