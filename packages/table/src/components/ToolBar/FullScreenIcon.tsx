import { defineComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { useIntl } from '@ant-design-vue/pro-provider';
import { isBrowser, useEffect, useState } from '@ant-design-vue/pro-utils';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';

const FullScreenIcon = defineComponent({
  name: 'FullScreenIcon',
  inheritAttrs: false,
  setup() {
    const intl = useIntl();
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    useEffect(() => {
      if (!isBrowser()) {
        return;
      }
      document.onfullscreenchange = () => {
        setFullscreen(!!document.fullscreenElement);
      };
    }, []);
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
      );
    };
  },
});

export default FullScreenIcon;
