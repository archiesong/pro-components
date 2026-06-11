export function transformBooleanProps<T extends Record<string, any>>(booleanPropsKey: (keyof T)[], props: T) {
  return booleanPropsKey.reduce((acc, key) => {
    acc[key as keyof typeof acc] = typeof props[key] === 'string' ? true : props[key]
    return acc
  }, {} as Record<string, any>)
}
