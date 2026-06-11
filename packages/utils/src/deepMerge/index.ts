export function deepMerge<T = any>(...objs: any[]) {
  const result: any = {}

  for (const obj of objs) {
    if (!obj || typeof obj !== 'object')
      continue

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key))
        continue

      const val = obj[key]
      const existing = result[key]

      // 如果都是对象且不是数组，递归合并
      if (
        val
        && typeof val === 'object'
        && !Array.isArray(val)
        && existing
        && typeof existing === 'object'
        && !Array.isArray(existing)
      ) {
        result[key] = deepMerge(existing, val)
      }
      else {
        // 否则直接覆盖（包括数组）
        result[key] = val
      }
    }
  }

  return result as T
}
