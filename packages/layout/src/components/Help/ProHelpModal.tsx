import type { ModalProps } from 'antdv-next'
import type { ProHelpPanelProps } from './ProHelpPanel'
import { useMountMergeState } from '@antdv-next/pro-utils'
import { Modal } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import ProHelpPanel from './ProHelpPanel'

export type ProHelpModalrops = {
  /**
   * Ant Design Modal 组件的 props，可以传递一些选项，如位置、大小、关闭方式等等。
   */
  modalProps?: ModalProps
} & Omit<ProHelpPanelProps, 'onClose'>

const ProHelpModal = defineComponent<ProHelpModalrops>((props) => {
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
}, {
  name: 'ProHelpModal',
  inheritAttrs: false,
})

export default ProHelpModal
