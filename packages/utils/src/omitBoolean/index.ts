/**
 * 剔除 boolean 值
 * @param  obj
 * @returns T
 */
export function omitBoolean<T>(obj: boolean | T): T | undefined {
  if (obj && obj !== true) {
    return obj
  }
  return undefined
}
