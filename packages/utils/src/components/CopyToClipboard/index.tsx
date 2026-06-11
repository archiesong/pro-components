import type { FunctionalComponent } from 'vue'
import copy from './copy'

const CopyToClipboard: FunctionalComponent<{
  text?: string
  onCopy?: (text?: string, copied?: boolean) => void
  options?: {
    debug?: boolean
    format?: 'text/plain' | 'text/html' | 'default'
    message?: string
  }
}> = ({ text, onCopy, options }, { slots }) => (
  <span
    onClick={(e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const copied = copy(text as string, options)
      if (onCopy) {
        onCopy(text as string, copied)
      }
    }}
  >
    {slots.default?.()}
  </span>
)
CopyToClipboard.inheritAttrs = false
CopyToClipboard.displayName = 'CopyToClipboard'
export default CopyToClipboard
