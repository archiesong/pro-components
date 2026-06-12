import type { ParamsType } from '@antdv-next1/pro-provider'
import type { TableColumnType } from 'antdv-next'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue'
import type { DensitySize } from '../components/ToolBar/DensityIcon'
import type { ActionType, ProColumns, ProTableProps } from '../typing'
import { merge, useEffect, useState } from '@antdv-next1/pro-utils'
import { useMergedState } from '@v-c/util'
import { computed, inject, provide, shallowRef } from 'vue'
import { genColumnKey } from '../utils/genProColumnsToColumns'

export interface ColumnsState {
  show?: boolean
  fixed?: boolean | 'start' | 'end'
  order?: number
  disable?:
    | boolean
    | {
      checkbox: boolean
    }
}

export type ProTableColumn<T> = ColumnsState & TableColumnType<T>

export interface UseContainerProps<T, U, ValueType> {
  onColumnsStateChange?: (map: Record<string, ColumnsState> | undefined) => void
  size?: DensitySize
  defaultSize?: DensitySize
  onSizeChange?: (size: DensitySize) => void
  columns?: ProTableColumn<T>[] | ProColumns<T, ValueType>[]
  columnsState?: ProTableProps<T, U, ValueType>['columnsState']
}

export function useContainer<T = Record<string, any>, U = ParamsType, ValueType = 'text'>(props: UseContainerProps<T, U, ValueType> = {} as Record<string, any>) {
  const action = shallowRef<ActionType<any, T>>()
  const rootDomRef = shallowRef<HTMLDivElement | null>(null)
  // /** 自己 props 的引用 */
  const propsRef = shallowRef<ProTableProps<T, U, ValueType>>()
  // /** 父 form item 的 name */
  const prefixNameRef = shallowRef<NamePath<string | number | boolean>>()

  // // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('')

  // // 用于排序的数组
  const sortKeyColumns = shallowRef<string[]>([])

  const [tableSize, setTableSize] = useMergedState<DensitySize>(
    () => props.size || props.defaultSize || 'medium',
    {
      value: computed(() => props.size),
      onChange: props.onSizeChange,
    },
  )
  /** 默认全选中 */
  const defaultColumnKeyMap = computed(() => {
    if (props?.columnsState?.defaultValue)
      return props.columnsState.defaultValue
    const columnKeyMap = {} as Record<string, ColumnsState>
    props.columns?.forEach(({ key, dataIndex, fixed, disable }, index) => {
      const columnKey = genColumnKey(key ?? dataIndex, index)
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed,
          disable,
        }
      }
    })
    return columnKeyMap
  })

  const [columnsMap, setColumnsMap] = useMergedState(
    () => {
      const { persistenceType, persistenceKey } = props.columnsState || {}

      if (persistenceKey && persistenceType && typeof window !== 'undefined') {
        /** 从持久化中读取数据 */
        const storage = window[persistenceType]
        try {
          const storageValue = storage?.getItem(persistenceKey)
          if (storageValue) {
            if (props?.columnsState?.defaultValue) {
              // 实际生产中，defaultValue往往作为系统方默认配置，则优先级不应高于用户配置的storageValue
              return merge(
                {},
                props?.columnsState?.defaultValue,
                JSON.parse(storageValue),
              ) as Record<string, ColumnsState>
            }
            return JSON.parse(storageValue) as Record<string, ColumnsState>
          }
        }
        catch (error) {
          console.warn(error)
        }
      }
      return (
        props.columnsState?.value || props.columnsState?.defaultValue || defaultColumnKeyMap.value
      )
    },
    {
      value: computed(() => props.columnsState?.value!),
      onChange: props.columnsState?.onChange || props.onColumnsStateChange,
    },
  )

  /**  配置或列更改时对columnsMap重新赋值 */
  useEffect(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {}

    if (persistenceKey && persistenceType && typeof window !== 'undefined') {
      /** 从持久化中读取数据 */
      const storage = window[persistenceType]
      try {
        const storageValue = storage?.getItem(persistenceKey)
        if (storageValue) {
          if (props?.columnsState?.defaultValue) {
            setColumnsMap(merge({}, props?.columnsState?.defaultValue, JSON.parse(storageValue)))
          }
          else {
            setColumnsMap(JSON.parse(storageValue))
          }
        }
        else {
          setColumnsMap(defaultColumnKeyMap.value)
        }
      }
      catch (error) {
        console.warn(error)
      }
    }
  }, [
    () => props.columnsState?.persistenceKey,
    () => props.columnsState?.persistenceType,
    () => defaultColumnKeyMap.value,
  ])

  /** 清空一下当前的 key */
  const clearPersistenceStorage = () => {
    const { persistenceType, persistenceKey } = props.columnsState || {}

    if (!persistenceKey || !persistenceType || typeof window === 'undefined')
      return

    /** 给持久化中设置数据 */
    const storage = window[persistenceType]
    try {
      storage?.removeItem(persistenceKey)
    }
    catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    if (!props.columnsState?.persistenceKey || !props.columnsState?.persistenceType) {
      return
    }
    if (typeof window === 'undefined')
      return
    /** 给持久化中设置数据 */
    const { persistenceType, persistenceKey } = props.columnsState
    const storage = window[persistenceType]
    try {
      storage?.setItem(persistenceKey, JSON.stringify(columnsMap.value))
    }
    catch (error) {
      console.warn(error)
      clearPersistenceStorage()
    }
  }, [
    () => props.columnsState?.persistenceKey,
    () => columnsMap.value,
    () => props.columnsState?.persistenceType,
  ])
  return {
    action,
    setAction: (newAction?: ActionType<any, T>) => {
      action.value = newAction
    },
    sortKeyColumns,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.value = keys
    },
    propsRef,
    tableSize,
    setTableSize,
    prefixName: prefixNameRef,
    setPrefixName: (name?: NamePath<string | number | boolean>) => {
      prefixNameRef.value = name
    },
    columnsMap,
    setColumnsMap,
    keyWords,
    setKeyWords,
    columns: props.columns,
    clearPersistenceStorage,
    defaultColumnKeyMap,
    rootDomRef,
  }
}

export interface ContainerReturnType<T, U, ValueType> {
  action?: ShallowRef<ActionType<any, T> | undefined>
  setAction?: (newAction?: ActionType<any, T>) => void
  sortKeyColumns?: ShallowRef<string[]>
  setSortKeyColumns?: (keys: string[]) => void
  propsRef?: ShallowRef<ProTableProps<T, U, ValueType> | undefined>
  tableSize?: Ref<DensitySize>
  setTableSize?: (val: DensitySize) => void
  prefixName: ShallowRef<NamePath<string | number | boolean> | undefined>
  setPrefixName?: (name?: NamePath<string | number | boolean>) => void
  columnsMap?: Ref<Record<string, ColumnsState>>
  setColumnsMap?: (val: Record<string, ColumnsState>) => void
  keyWords?: Ref<string | undefined>
  setKeyWords?: (val: string | undefined) => void
  columns?: ProTableColumn<T>[] | ProColumns<T, ValueType>[]
  clearPersistenceStorage?: () => void
  defaultColumnKeyMap?: ComputedRef<Record<string, ColumnsState>>
  rootDomRef?: ShallowRef<HTMLDivElement | null>
}

export const tableContextKey = Symbol('tableContext')

export function useTableContextProvider<T, U, S>(props: ContainerReturnType<T, U, S>) {
  return provide(tableContextKey as InjectionKey<ContainerReturnType<T, U, S>>, props)
}

export const useTableContextInject = <T, U, S>() => inject(tableContextKey as InjectionKey<ContainerReturnType<T, U, S>>, {} as ContainerReturnType<T, U, S>)
