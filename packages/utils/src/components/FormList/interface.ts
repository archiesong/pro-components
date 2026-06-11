import type { DeepNamePath } from './namePathType'

export type StoreValue = any
export type Store = Record<string, StoreValue>
export type InternalNamePath = (string | number)[]
export type NamePath<T = any> = DeepNamePath<T>
