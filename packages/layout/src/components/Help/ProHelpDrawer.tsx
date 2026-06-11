import type { DrawerProps } from 'antdv-next'
import type { ExtractPropTypes, PropType } from 'vue'
import { useMountMergeState } from '@antdv-next/pro-utils'
import { omit } from '@v-c/util'
import { Drawer } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import ProHelpPanel, { proHelpPanelProps } from './ProHelpPanel'

export function proHelpDrawerProps() {
  return {
    ...omit(proHelpPanelProps(), ['onClose']),
    /**
     * Ant Design Drawer 组件的 Props，可以传递一些选项，如位置、大小、关闭方式等等。
     */
    drawerProps: {
      type: Object as PropType<DrawerProps>,
      default: undefined,
    },
  }
}

export type ProHelpDrawerProps = Partial<ExtractPropTypes<ReturnType<typeof proHelpDrawerProps>>>

const ProHelpDrawer = defineComponent({
  name: 'ProHelpDrawer',
  inheritAttrs: false,
  props: proHelpDrawerProps(),
  setup(props) {
    const [drawerOpen, setDrawerOpen] = useMountMergeState(
      false,
      {
        value: computed(() => props.drawerProps?.open),
        onChange: (open) => {
          props.drawerProps?.afterOpenChange?.(open!)
        },
      },
    )
    return () => {
      const { drawerProps, ...restProps } = props
      return (
        <Drawer
          closeIcon={null}
          styles={{
            header: {
              display: 'none',
            },
            body: {
              padding: 0,
            },
          }}
          mask={{
            closable: true,
          }}
          {...drawerProps}
          size={drawerProps?.size ?? 720}
          open={drawerOpen.value}
          onClose={() => setDrawerOpen(false)}
          afterOpenChange={(open) => {
            setDrawerOpen(open)
          }}
        >
          <ProHelpPanel
            {...restProps}
            onClose={() => setDrawerOpen(false)}
            variant="borderless"
          />
        </Drawer>
      )
    }
  },
})

export default ProHelpDrawer
