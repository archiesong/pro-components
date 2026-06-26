export const workspaceExternal = /^@antdv-next1\//

type GlobalsFunction = (id: string) => string

export const workspaceGlobals: Record<string, string> = {
  '@antdv-next1/pro-card': 'AntdvNextProCard',
  '@antdv-next1/pro-components': 'AntdvNextProComponents',
  '@antdv-next1/pro-field': 'AntdvNextProField',
  '@antdv-next1/pro-form': 'AntdvNextProForm',
  '@antdv-next1/pro-layout': 'AntdvNextProLayout',
  '@antdv-next1/pro-listy': 'AntdvNextProListy',
  '@antdv-next1/pro-provider': 'AntdvNextProProvider',
  '@antdv-next1/pro-table': 'AntdvNextProTable',
  '@antdv-next1/pro-utils': 'AntdvNextProUtils',
  '@antdv-next1/route-utils': 'AntdvNextRouteUtils',
}

export function createGlobals(extraGlobals: Record<string, string> = {}): GlobalsFunction {
  return (id: string) => {
    const normalizedId = id.replace(/\.js$/, '')
    const workspacePackage = normalizedId.startsWith('@antdv-next1/')
      ? normalizedId.split('/').slice(0, 2).join('/')
      : undefined

    return extraGlobals[id]
      || extraGlobals[normalizedId]
      || workspaceGlobals[id]
      || workspaceGlobals[normalizedId]
      || (workspacePackage ? workspaceGlobals[workspacePackage] : undefined)
      || (normalizedId === 'dayjs' ? 'dayjs' : undefined)
      || (normalizedId.startsWith('dayjs/') ? normalizedId.replace(/\W/g, '_') : undefined)
      || normalizedId.replace(/\W/g, '_')
  }
}
