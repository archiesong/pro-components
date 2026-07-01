import type { ListyRef, ScrollAlign } from '../interface'
import { shallowRef } from 'vue'

export function useRawListScroll(prefixCls: string, stickyGroup: boolean) {
  // =============================== Refs ===============================
  const holderRef = shallowRef<HTMLDivElement | null>(null)

  // ============================== Utils ===============================
  const getStickyHeaderHeight = (targetElement: HTMLElement) => {
    if (!stickyGroup) {
      return 0
    }

    const groupSection = targetElement.closest<HTMLElement>(
      `.${CSS.escape(`${prefixCls}-group-section`)}`,
    )
    const groupHeader = groupSection?.querySelector<HTMLElement>(
      `.${CSS.escape(`${prefixCls}-group-header`)}`,
    )

    if (!groupHeader) {
      return 0
    }

    const rect = groupHeader.getBoundingClientRect()
    const height
      = rect.height || rect.bottom - rect.top || groupHeader.offsetHeight

    return Number.isFinite(height) ? height : 0
  }

  const setTargetScrollMargin = (targetElement: HTMLElement, align?: ScrollAlign) => {
    const marginTop
      = align === 'top' ? getStickyHeaderHeight(targetElement) : 0

    targetElement.style.setProperty(
      `--${prefixCls}-item-scroll-margin-top`,
      `${marginTop}px`,
    )
  }

  // ============================== Scroll ==============================
  const scrollTo: ListyRef['scrollTo'] = (config) => {
    const holder = holderRef.value
    if (!holder || config == null) {
      return
    }

    if (typeof config === 'number') {
      holder.scrollTop = config
      return
    }

    if (config) {
      if ('left' in config || 'top' in config) {
        const { left, top } = config
        if (left !== undefined) {
          holder.scrollLeft = left
        }
        if (top !== undefined) {
          holder.scrollTop = top
        }
      }
      let targetKey
      if ('groupKey' in config) {
        targetKey = config.groupKey
      }
      if ('key' in config) {
        targetKey = config.key
      }

      let align: ScrollAlign | undefined = 'top'

      const targetElement = holder.querySelector<HTMLElement>(
        `[data-key="${CSS.escape(String(targetKey))}"]`,
      )
      if (targetElement) {
        if ('align' in config) {
          align = config.align
        }
        if ('key' in config) {
          setTargetScrollMargin(targetElement, align)
        }
        targetElement.scrollIntoView({
          block:
                align === 'bottom'
                  ? 'end'
                  : align === 'auto'
                    ? 'nearest'
                    : 'start',
          inline: 'nearest',
        })
      }
    }
  }

  return {
    scrollTo,
    holderRef,
  }
}
