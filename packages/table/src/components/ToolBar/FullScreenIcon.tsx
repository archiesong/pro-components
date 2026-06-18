import { useIntl } from '@antdv-next1/pro-provider'
import { isBrowser, useEffect, useState } from '@antdv-next1/pro-utils'
import { FullscreenExitOutlined, FullscreenOutlined } from '@antdv-next/icons'
import { Tooltip } from 'antdv-next'
import { defineComponent } from 'vue'

const FullScreenIcon = defineComponent(() => {
  const intl = useIntl()
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  useEffect(() => {
    if (!isBrowser()) {
      return
    }
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement)
    }
  }, [])
  return () => {
    return fullscreen.value ? (
      <Tooltip
        title={intl.value.getMessage({
          id: 'tableToolBar.exitFullScreen',
          defaultMessage: '全屏',
        })}
      >
        <FullscreenExitOutlined />
      </Tooltip>
    ) : (
      <Tooltip
        title={intl.value.getMessage({ id: 'tableToolBar.fullScreen', defaultMessage: '全屏' })}
      >
        <FullscreenOutlined />
      </Tooltip>
    )
  }
}, {
  name: 'FullScreenIcon',
  inheritAttrs: false,
})

export default FullScreenIcon
