/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 */
export function isNeedOpenHash() {
  if (typeof process === 'undefined')
    return true
  const env = process.env.NODE_ENV?.toLowerCase()
  if (env === 'test' || env === 'development') {
    return false
  }
  return true
}
