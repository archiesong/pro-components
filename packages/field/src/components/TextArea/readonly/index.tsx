import type { VueNode } from '@v-c/util'
import type { TextAreaProps } from 'antdv-next'
import type { ProFieldFC } from '../../../typing'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import { useStyle } from './style'

export type FieldTextAreaReadonlyProps = ProFieldFC<{
  text?: VueNode
}, TextAreaProps>

const FieldTextAreaReadonly = defineComponent(
  (props: FieldTextAreaReadonlyProps) => {
    const config = useConfig()
    const readonlyClassName = computed(() => config.value.getPrefixCls('pro-field-readonly-textarea'))
    const { wrapSSR, hashId } = useStyle(readonlyClassName)
    return () => {
      const { text } = props
      // {...omit(props.fieldProps!, ['autoSize', 'classes', 'styles'])}

      return wrapSSR(
        <span
          class={classNames(hashId.value, readonlyClassName.value)}
        >
          {text ?? '-'}
        </span>,
      )
    }
  },
  {
    name: 'FieldTextAreaReadonly',
    inheritAttrs: false,
    props: ['fieldProps', 'text'],
  },
)

export default FieldTextAreaReadonly
