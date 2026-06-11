import type { DrawerProps } from 'antdv-next'
import type { ProHelpPanelProps } from './ProHelpPanel'
import { useMountMergeState } from '@antdv-next/pro-utils'
import { Drawer } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import ProHelpPanel from './ProHelpPanel'

export type ProHelpDrawerProps = {
  drawerProps?: DrawerProps
} & Omit<ProHelpPanelProps, 'onClose'>

const ProHelpDrawer = defineComponent<ProHelpDrawerProps>((props) => {
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
}, {
  name: 'ProHelpDrawer',
  inheritAttrs: false,
})

export default ProHelpDrawer
