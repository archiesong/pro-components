import type { ComputedRef } from 'vue'
import type { PageInfo, RequestData, UseFetchDataAction, UseFetchProps } from './typing'
import {
  runFunction,
  useDebounceFn,
  useEffect,
  useMountMergeState,
  usePrevious,
} from '@antdv-next/pro-utils'
import { computed, ref } from 'vue'
import { postDataPipeline } from './utils'
/**
 * 组合用户的配置和默认值
 */
function mergeOptionAndPageInfo({ pageInfo }: UseFetchProps) {
  if (pageInfo.value) {
    const { current, pageSize, defaultPageSize } = pageInfo.value
    return {
      current: current || 1,
      total: 0,
      pageSize: pageSize || defaultPageSize || 20,
    }
  }
  return { current: 1, total: 0, pageSize: 20 }
}

function useFetchData<DataSource extends Record<string, any>>(getData: ComputedRef<
    ((params?: { pageSize: number, current: number }) => Promise<Partial<RequestData<DataSource> | undefined>>) | undefined
>, defaultData: DataSource[] | undefined, options: UseFetchProps<DataSource>): UseFetchDataAction<DataSource> {
  /**
   * 用于保存组件是否被卸载的状态的引用
   */
  const umount = ref<boolean>(false)
  /**
   * 用于保存 AbortController 实例的引用，方便需要时进行请求的取消操作
   */
  const abortRef = ref<AbortController | null>(null)
  /**
   * useFetchData 钩子的配置项
   */
  const {
    onLoad,
    manual,
    polling,
    onRequestError,
    debounceTime = ref(20),
    effects = [],
    dataSource,
    loading,
    pageInfo,
    onLoadingChange,
    onPageInfoChange,
    onDataSourceChange,
  } = options || {}
  /** 是否首次加载的指示器 */
  const manualRequest = ref<boolean>(manual.value)
  /** 轮询的setTime ID 存储 */
  const pollingSetTime = ref<NodeJS.Timeout | null>(null)
  /**
   * 用于存储最新的数据，这样可以在切换的时候保持数据的一致性
   */
  const [tableDataList, setTableDataList] = useMountMergeState<DataSource[] | undefined>(
    () => defaultData,
    {
      value: dataSource,
      defaultValue: defaultData,
      onChange: onDataSourceChange,
    },
  )
  /**
   * 表格的加载状态
   */
  const [tableLoading, setTableLoading] = useMountMergeState(() => false, {
    value: computed(() =>
      typeof loading.value === 'object' ? loading.value?.spinning : loading.value,
    ),
    onChange: onLoadingChange,
  })
  /**
   * 表示页面信息的类型  useMountMergeState 钩子的初始值和参数
   * @property {number} current 当前页码
   * @property {number} pageSize 页面大小
   * @property {number} total 数据总量
   */
  const [pageInfoState, setPageInfoState] = useMountMergeState(
    () => mergeOptionAndPageInfo(options),
    {
      onChange: onPageInfoChange,
    },
  )
  /**
   * 用于比较并设置页面信息和回调函数的引用更新
   */
  const setPageInfo = (changePageInfo: PageInfo) => {
    if (
      changePageInfo.current !== pageInfoState.value.current
      || changePageInfo.pageSize !== pageInfoState.value.pageSize
      || changePageInfo.total !== pageInfoState.value.total
    ) {
      setPageInfoState(changePageInfo)
    }
  }
  const [pollingLoading, setPollingLoading] = useMountMergeState(false)

  const setDataAndLoading = (newData: DataSource[], dataTotal: number) => {
    setTableDataList(newData)
    if (pageInfoState?.value.total !== dataTotal) {
      setPageInfo({
        ...pageInfoState.value,
        total: dataTotal || newData.length,
      })
    }
  }
  /**
   * 上一页的页码
   */
  const prePage = usePrevious(computed(() => pageInfoState.value.current))
  /**
   * 上一页的页面大小
   */
  const prePageSize = usePrevious(computed(() => pageInfoState.value.pageSize))
  /**
   * 上一页的轮询时间
   */
  const prePolling = usePrevious(polling!)

  const requestFinally = () => {
    setTableLoading(false)
    setPollingLoading(false)
  }
  /** 请求数据 */
  const fetchList = async (isPolling: boolean, signal?: AbortSignal) => {
    // 需要手动触发的首次请求
    if (manualRequest.value) {
      manualRequest.value = false
      return
    }
    if (!isPolling) {
      setTableLoading(true)
    }
    else {
      setPollingLoading(true)
    }
    const { pageSize, current } = pageInfoState.value || {}
    try {
      const pageParams
        = pageInfo.value !== false
          ? {
              current,
              pageSize,
            }
          : undefined
      const { data = [], success, total = 0, ...rest } = (await getData.value?.(pageParams)) || {}
      // 如果被取消了，直接返回
      if (signal?.aborted) {
        return []
      }
      // 如果失败了，直接返回，不走剩下的逻辑了
      if (success === false)
        return []
      const responseData = postDataPipeline<DataSource[]>(
        data!,
        [options.postData!].filter(item => item),
      )
      // 设置表格数据
      if (signal?.aborted) {
        return []
      }
      setDataAndLoading(responseData, total)
      onLoad?.(responseData, rest)
      return responseData
    }
    catch (e) {
      // 如果被取消了，直接返回
      if (signal?.aborted) {
        return []
      }
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined)
        throw new Error(e as string)
      if (tableDataList.value === undefined)
        setTableDataList([])
      onRequestError(e as Error)
    }
    finally {
      if (!signal?.aborted) {
        requestFinally()
      }
    }
    return []
  }
  /**
   * 该函数用于进行数据请求，可以用于轮询或单次请求。
   * 通过使用 AbortController 取消之前的请求，避免出现请求堆积。
   * 若需要轮询，则在一定时间后再次调用该函数，最小时间为 200ms，避免一直处于 loading 状态。
   * 如果请求被取消，则返回空。
   */
  const fetchListDebounce = useDebounceFn(async (isPolling: boolean) => {
    if (pollingSetTime.value) {
      clearTimeout(pollingSetTime.value)
      pollingSetTime.value = null
    }
    if (!getData.value)
      return
    const abort = new AbortController()
    abortRef.value = abort
    try {
      /**
       * 这段代码使用了 Promise.race，同时发起了两个异步请求。
       * fetchList 函数发起一个数据请求，而第二个 Promise 是等待通过 AbortSignal 取得一个信号。
       * 如果第二个 Promise 得到了一个 AbortSignal 的信号，就会触发 reject，Promise.race 的结果也会结束。
       * 这样，就达到了取消请求的目的。如果 fetchList 函数先返回了结果，那么该结果就是 Promise.race 的结果，
       * 此时第二个 Promise 就会被取消。
       */
      const msg = (await Promise.race([
        fetchList(isPolling, abort.signal),
        new Promise((_, reject) => {
          abortRef.value?.signal.addEventListener('abort', () => {
            reject(new Error('aborted'))
            // 结束请求，并且清空loading控制
            fetchListDebounce.cancel()
            requestFinally()
          })
        }),
      ])) as DataSource[]
      if (abort.signal.aborted)
        return
      // 放到请求前面会导致数据是上一次的
      const needPolling = runFunction(polling?.value, msg)
      /*
       * 这段代码是用于控制轮询的。其中，needPolling 参数表明当前是否需要进行轮询，umount 是一个 ref，用来记录组件是否被卸载。
       * 如果需要轮询并且组件没有被卸载，就会调用 setTimeout，等待一定的时间，然后再次调用 fetchListDebounce 函数，并传入需要轮询的时间参数。
       * 其中 Math.max(needPolling, 2000) 用于确定最小的轮询时间为 2000ms，避免频繁请求导致一直处于 loading 状态。
       */
      if (needPolling && !umount.value) {
        pollingSetTime.value = setTimeout(
          () => fetchListDebounce.run(needPolling),
          Math.max(needPolling, 2000),
        )
      }
      return msg
    }
    catch (e) {
      if (e === 'aborted') {
        return
      }
      throw e
    }
  }, debounceTime.value || 30)
  /**
   * 取消请求
   */
  const abortFetch = () => {
    abortRef.value?.abort()
    fetchListDebounce.cancel()
    requestFinally()
  }
  // 如果轮询结束了，直接销毁定时器
  useEffect(() => {
    if (!polling.value && pollingSetTime.value) {
      clearTimeout(pollingSetTime.value)
      pollingSetTime.value = null
    }
    if (!prePolling.value && polling.value) {
      (async () => await fetchListDebounce.run(true))()
    }
    return () => {
      if (pollingSetTime.value) {
        clearTimeout(pollingSetTime.value)
        pollingSetTime.value = null
      }
    }
  }, [polling])

  useEffect(() => {
    umount.value = false
    return () => {
      umount.value = true
    }
  }, [])

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { current, pageSize } = pageInfoState.value || {}
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if (
      (!prePage.value || prePage.value === current)
      && (!prePageSize.value || prePageSize.value === pageSize)
    ) {
      return
    }
    if ((pageInfo.value && tableDataList.value && tableDataList.value.length > pageSize) || 0)
      return

    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (current !== undefined && tableDataList.value && tableDataList.value.length <= pageSize) {
      abortFetch();
      (async () => await fetchListDebounce.run(false))()
    }
  }, [() => pageInfoState?.value.current])

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize.value) {
      return
    }
    abortFetch();
    (async () => await fetchListDebounce.run(false))()
  }, [() => pageInfoState.value.pageSize])
  /**
   * 检查是否有正在进行的请求需要被中止。如果是，则使用 abort 中的方法来中止请求。
   * 接下来，使用名为 fetchListDebounce 的防抖函数并传入 false 参数。这个函数可以防止请求过于频繁地发出，通过延迟执行传递给它的函数来实现。
   * 最后，检查是否有正在进行的请求，如果有，则中止它。
   */
  useEffect(() => {
    abortFetch();
    (async () => await fetchListDebounce.run(false))()
    if (!manual.value) {
      // 如果 manual 标志未设置，则将 manualRequest 设置为 false。
      // 用于跟踪当前的请求是否是手动发起的。
      manualRequest.value = false
    }
    return () => abortFetch()
  }, [...effects, manual])
  return {
    dataSource: tableDataList,
    setDataSource: setTableDataList,
    loading: computed(() =>
      typeof loading.value === 'object'
        ? { ...loading.value, spinning: tableLoading.value }
        : tableLoading.value,
    ),
    reload: async () => {
      abortFetch()
      await fetchListDebounce.run(false)
    },
    pageInfo: pageInfoState,
    pollingLoading,
    reset: async () => {
      const { defaultPageSize = 20, current = 1 } = pageInfo.value || {}
      const initialPageInfo = {
        current,
        total: 0,
        pageSize: defaultPageSize,
      }
      setPageInfo(initialPageInfo)
    },
    setPageInfo: async info =>
      setPageInfo({
        ...pageInfoState.value,
        ...info,
      }),
  }
}
export default useFetchData
