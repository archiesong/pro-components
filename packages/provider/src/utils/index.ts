/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 */
export function isNeedOpenHash() {
  return !(
    (typeof process !== 'undefined'
      && (process.env.NODE_ENV?.toUpperCase() === 'TEST'
        || process.env.NODE_ENV?.toUpperCase() === 'DEV'))
      || (typeof import.meta.env !== 'undefined'
        && import.meta.env.MODE
        && (import.meta.env.MODE.toUpperCase() === 'TEST'
          || import.meta.env.MODE.toUpperCase() === 'DEV'))
  )
}
