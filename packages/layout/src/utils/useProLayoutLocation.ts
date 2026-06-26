import type { ComputedRef } from 'vue'
import type { RouterTypes } from '../typing'
import { computed, getCurrentInstance } from 'vue'

type ProLayoutLocation = NonNullable<RouterTypes['location']>
interface RouteLikeHost {
  $route?: RouterTypes['location']
}

export function useProLayoutLocation(getLocation: () => RouterTypes['location'] | undefined): ComputedRef<ProLayoutLocation> {
  const instance = getCurrentInstance()
  return computed(() => {
    const location = getLocation()
    if (location?.path) {
      return location
    }

    const proxyRoute = (instance?.proxy as RouteLikeHost | null | undefined)?.$route
    const globalRoute = (instance?.appContext.config.globalProperties as RouteLikeHost).$route
    const route = (
      proxyRoute
      || globalRoute
    ) as RouterTypes['location'] | undefined

    return {
      path: route?.path || '/',
    }
  })
}
