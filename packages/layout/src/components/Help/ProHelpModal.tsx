import type { ModalProps } from 'antdv-next'
import type { ExtractPropTypes, PropType } from 'vue'
import { useMountMergeState } from '@antdv-next/pro-utils'
import { omit } from '@v-c/util'
import { Modal } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import ProHelpPanel, { proHelpPanelProps } from './ProHelpPanel'

export function proHelpModalProps() {
  return {
    ...omit(proHelpPanelProps(), ['onClose']),
    /**
     * Ant Design Modal 组件的 props，可以传递一些选项，如位置、大小、关闭方式等等。
     */
    modalProps: {
      type: Object as PropType<ModalProps>,
      default: undefined,
    },
  }
}

export type ProHelpModalrops = Partial<ExtractPropTypes<ReturnType<typeof proHelpModalProps>>>

const ProHelpModal = defineComponent({
  name: 'ProHelpModal',
  inheritAttrs: false,
  props: proHelpModalProps(),
  setup(props) {
    const [modalOpen, setModalOpen] = useMountMergeState(
      false,
      {
        value: computed(() => props.modalProps?.open),
        onChange: () => {
          props.modalProps?.afterClose?.()
        },
      },
    )
    return () => {
      const { modalProps, ...restprops } = props
      return (
        <Modal
          onCancel={() => {
            setModalOpen(false)
          }}
          styles={{
            body: {
              margin: '-24px',
            },
          }}
          centered
          closable={false}
          footer={null}
          width={720}
          open={modalOpen.value}
          mask={{
            closable: true,
          }}
          {...modalProps}
        >
          <ProHelpPanel
            {...restprops}
            height={restprops.height || 648}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )
    }
  },
})

export default ProHelpModal
