export const workspaceExternal = /^@antdv-next1\//

type GlobalsFunction = (id: string) => string

export const workspaceGlobals: Record<string, string> = {
  '@antdv-next1/pro-card': 'ProCard',
  '@antdv-next1/pro-components': 'ProComponents',
  '@antdv-next1/pro-field': 'ProField',
  '@antdv-next1/pro-form': 'ProForm',
  '@antdv-next1/pro-layout': 'ProLayout',
  '@antdv-next1/pro-listy': 'ProListy',
  '@antdv-next1/pro-provider': 'ProProvider',
  '@antdv-next1/pro-table': 'ProTable',
  '@antdv-next1/pro-utils': 'ProUtils',
  '@antdv-next1/route-utils': 'RouteUtils',
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
