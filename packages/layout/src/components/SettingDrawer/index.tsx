import type { ExtractPropTypes, FunctionalComponent, PropType } from 'vue';
import type { MessageType } from 'ant-design-vue/es/message';
import type { ProSettings } from '../../defaultSettings';
import { defineComponent, ref, computed } from 'vue';
import { Drawer, Divider, List, Switch, Alert, Button, message as Message } from 'ant-design-vue';
import {
  SettingOutlined,
  CloseOutlined,
  NotificationOutlined,
  CopyOutlined,
} from '@ant-design/icons-vue';
import { useStyle } from './style';
import { getFormatMessage, LayoutSetting, renderLayoutSettingItem } from './LayoutChange';
import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';
import { GroupIcon } from './icon/group';
import { SubIcon } from './icon/sub';
import RegionalSetting from './RegionalChange';
import { genStringToTheme, themeConfig } from '../../utils';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import defaultSettings from '../../defaultSettings';
import { classNames, CopyToClipboard, omit, useMountMergeState } from '@ant-design-vue/pro-utils';

type MergerSettingsType<T> = Partial<T> & {
  colorPrimary?: string;
  colorWeak?: boolean;
  [key: string]: any;
};
export const settingDrawerProps = () => ({
  settings: Object as PropType<MergerSettingsType<ProSettings>>,
  prefixCls: {
    type: String,
    default: undefined,
  },
  collapsed: {
    type: Boolean,
    default: undefined,
  },
  colorList: {
    type: [Array, Boolean] as PropType<false | { key: string; color: string; title?: string }[]>,
    default: undefined,
  },
  hideHintAlert: {
    type: Boolean,
    default: undefined,
  },
  hideCopyButton: {
    type: Boolean,
    default: undefined,
  },
  onSettingChange: {
    type: Function as PropType<(config: MergerSettingsType<ProSettings>) => void>,
    default: undefined,
  },
  onCollapse: {
    type: Function as PropType<(collapsed: boolean) => void>,
    default: undefined,
  },
  'onUpdate:collapsed': {
    type: Function as PropType<(collapsed: boolean) => void>,
    default: undefined,
  },
});

export type SettingDrawerProps = Partial<ExtractPropTypes<ReturnType<typeof settingDrawerProps>>>;

type BodyProps = {
  title: string;
  prefixCls: string;
  hashId: string;
};

const SeetingBody: FunctionalComponent<BodyProps> = ({ hashId, prefixCls, title }, { slots }) => (
  <div style={{ marginBlockEnd: '12px' }}>
    <h3 class={`${prefixCls}-body-title ${hashId}`}>{title}</h3>
    {slots.default?.()}
  </div>
);

const genCopySettingJson = (settingState: MergerSettingsType<ProSettings>) =>
  JSON.stringify(
    omit(
      {
        ...settingState,
        colorPrimary: settingState.colorPrimary,
      },
      ['colorWeak']
    ),
    null,
    2
  );

/**
 * 可视化配置组件
 *
 * @param props
 */
const SettingDrawer = defineComponent({
  name: 'SettingDrawer',
  inheritAttrs: false,
  props: settingDrawerProps(),
  setup(props) {
    const { getPrefixCls, locale } = useConfigContextInject();

    const hideMessage = ref<MessageType>();

    const baseClassName = computed(
      () => `${props.prefixCls || getPrefixCls('pro')}-setting-drawer`
    );

    const formatMessage = getFormatMessage(locale);

    const { wrapSSR, hashId } = useStyle(baseClassName);

    const [open, setOpen] = useMountMergeState(false, {
      value: props.collapsed === undefined ? undefined : ref(props.collapsed),
      onChange: (value) => props['onUpdate:collapsed']?.(value) && props.onCollapse?.(value),
    });

    const className = computed(() =>
      classNames(baseClassName.value, hashId.value, {
        [`${baseClassName.value}-collapsed`]: !open.value,
        [`${baseClassName.value}-realDark`]: props.settings?.navTheme === 'realDark',
      })
    );
    const [settingState, setSettingState] = useMountMergeState<Partial<ProSettings>>(
      defaultSettings,
      {
        value: props.settings === undefined ? undefined : computed(() => props.settings || {}),
        onChange: props.onSettingChange,
      }
    );

    /**
     * 修改设置
     *
     * @param key
     * @param value
     */
    const changeSetting = (key: string, value: string | boolean) => {
      const nextState = {} as MergerSettingsType<ProSettings>;
      nextState[key] = value;
      if (key === 'layout') {
        nextState.contentWidth = value === 'top' ? 'Fixed' : 'Fluid';
        if (!['mix', 'side'].includes(value as string)) {
          nextState.siderMenuType = 'sub';
        }
      }
      if (key === 'layout' && value !== 'mix') {
        nextState.splitMenus = false;
      }
      if (key === 'layout' && value === 'mix') {
        nextState.fixedHeader = true;
      }
      if (key === 'layout' && value === 'left') {
        nextState.fixSiderbar = true;
        nextState.fixedHeader = true;
      }
      if (key === 'colorWeak') {
        const dom = document.querySelector('body');
        if (!dom) return;
        if (value) {
          dom.dataset.prosettingdrawer = dom.style.filter;
          dom.style.filter = 'invert(80%)';
        } else {
          dom.style.filter = dom.dataset.prosettingdrawer || 'none';
          delete dom.dataset.prosettingdrawer;
        }
      }

      delete nextState.menu;
      delete nextState.title;
      delete nextState.iconfontUrl;
      delete nextState.logo;
      delete nextState.pwa;
      setSettingState({ ...settingState.value, ...nextState });
    };

    return () => {
      const {
        // navTheme,
        colorList = [
          { key: 'techBlue', color: '#1677FF' },
          { key: 'daybreak', color: '#1890FF' },
          { key: 'dust', color: '#F5222D' },
          { key: 'volcano', color: '#FA541C' },
          { key: 'sunset', color: '#FAAD14' },
          { key: 'cyan', color: '#13C2C2' },
          { key: 'green', color: '#52C41A' },
          { key: 'geekblue', color: '#2F54EB' },
          { key: 'purple', color: '#722ED1' },
        ],
        // transitionList = [
        //   {
        //     value: 'null',
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.empty',
        //       defaultMessage: 'Null',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-slide-fadein-up`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.slide.up',
        //       defaultMessage: 'Slide Up',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-slide-fadein-right`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.slide.right',
        //       defaultMessage: 'Slide Right',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-zoom-fadein`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.fade.in',
        //       defaultMessage: 'Fade In',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-fadein`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.zoom',
        //       defaultMessage: 'Zoom',
        //     }),
        //   },
        // ],
        hideCopyButton,
        hideHintAlert,
      } = props;
      return wrapSSR(
        <Drawer
          open={open.value}
          closable={false}
          width={300}
          rootClassName={className.value}
          onClose={() => setOpen(false)}
          placement="right"
          handle={
            <div
              class={classNames(`${baseClassName.value}-handle`, hashId.value)}
              onClick={() => setOpen(!open.value)}
            >
              {!open.value ? (
                <SettingOutlined spin style={{ color: 'rgb(255,255,255)', fontSize: '20px' }} />
              ) : (
                <CloseOutlined style={{ color: 'rgb(255,255,255)', fontSize: '20px' }} />
              )}
            </div>
          }
        >
          <div class={classNames(`${baseClassName.value}-content`, hashId.value)}>
            <SeetingBody
              prefixCls={baseClassName.value}
              hashId={hashId.value as string}
              title={formatMessage({
                id: 'app.setting.pagestyle',
                defaultMessage: '整体风格设置',
              })}
            >
              <BlockCheckbox
                hashId={hashId.value}
                prefixCls={baseClassName.value}
                list={[
                  {
                    key: 'light',
                    title: formatMessage({
                      id: 'app.setting.pagestyle.light',
                      defaultMessage: '亮色菜单风格',
                    }),
                  },
                  {
                    key: 'dark',
                    title: formatMessage({
                      id: 'app.setting.pagestyle.dark',
                      defaultMessage: '暗色菜单风格',
                    }),
                  },
                  {
                    key: 'realDark',
                    title: formatMessage({
                      id: 'app.setting.pagestyle.realdark',
                      defaultMessage: '暗色风格',
                    }),
                  },
                ]}
                configType="theme"
                key="navTheme"
                value={settingState.value.navTheme}
                onChange={(value) => changeSetting('navTheme', value)}
              />
            </SeetingBody>
            {colorList !== false && (
              <SeetingBody
                hashId={hashId.value}
                title={formatMessage({
                  id: 'app.setting.themecolor',
                  defaultMessage: '主题色',
                })}
                prefixCls={baseClassName.value}
              >
                <ThemeColor
                  hashId={hashId.value}
                  prefixCls={baseClassName.value}
                  colorList={colorList}
                  formatMessage={formatMessage}
                  value={
                    genStringToTheme(settingState.value.colorPrimary as keyof typeof themeConfig)!
                  }
                  onChange={async (color) => {
                    if (color !== settingState.value.colorPrimary) {
                      hideMessage.value = Message.loading(
                        formatMessage({
                          id: 'app.setting.loading',
                          defaultMessage: '正在加载主题',
                        }),
                        0
                      );
                    }
                    changeSetting('colorPrimary', color);
                    if (hideMessage.value) {
                      hideMessage.value?.();
                    }
                  }}
                />
              </SeetingBody>
            )}
            <Divider />
            <SeetingBody
              hashId={hashId.value}
              title={formatMessage({
                id: 'app.setting.navigationmode',
                defaultMessage: '导航模式',
              })}
              prefixCls={baseClassName.value}
            >
              <BlockCheckbox
                prefixCls={baseClassName.value}
                value={settingState.value.layout}
                key="layout"
                hashId={hashId.value}
                configType="layout"
                list={[
                  {
                    key: 'side',
                    title: formatMessage({
                      id: 'app.setting.sidemenu',
                      defaultMessage: '侧边菜单布局',
                    }),
                  },
                  {
                    key: 'top',
                    title: formatMessage({
                      id: 'app.setting.topmenu',
                      defaultMessage: '顶部菜单布局',
                    }),
                  },
                  {
                    key: 'mix',
                    title: formatMessage({
                      id: 'app.setting.mixmenu',
                      defaultMessage: '混合菜单布局',
                    }),
                  },
                  {
                    key: 'left',
                    title: formatMessage({
                      id: 'app.setting.leftmenu',
                      defaultMessage: '左侧混合布局',
                    }),
                  },
                ]}
                onChange={(value) => changeSetting('layout', value)}
              />
            </SeetingBody>
            {settingState.value.layout === 'side' || settingState.value.layout === 'mix' ? (
              <SeetingBody
                hashId={hashId.value}
                prefixCls={baseClassName.value}
                title={formatMessage({
                  id: 'app.setting.sidermenutype',
                  defaultMessage: '侧边菜单类型',
                })}
              >
                <BlockCheckbox
                  prefixCls={baseClassName.value}
                  value={settingState.value.siderMenuType}
                  key="siderMenuType"
                  hashId={hashId.value}
                  configType="siderMenuType"
                  list={[
                    {
                      key: 'sub',
                      icon: <SubIcon />,
                      title: formatMessage({
                        id: 'app.setting.sidermenutype-sub',
                        defaultMessage: '经典模式',
                      }),
                    },
                    {
                      key: 'group',
                      icon: <GroupIcon />,
                      title: formatMessage({
                        id: 'app.setting.sidermenutype-group',
                        defaultMessage: '分组模式',
                      }),
                    },
                  ]}
                  onChange={(value) => changeSetting('siderMenuType', value)}
                />
              </SeetingBody>
            ) : null}
            <LayoutSetting
              prefixCls={baseClassName.value}
              hashId={hashId.value}
              formatMessage={formatMessage}
              settings={{
                ...settingState.value,
              }}
              changeSetting={changeSetting}
            />
            <Divider />
            <SeetingBody
              hashId={hashId.value}
              prefixCls={baseClassName.value}
              title={formatMessage({
                id: 'app.setting.regionalsettings',
                defaultMessage: '内容区域',
              })}
            >
              <RegionalSetting
                hashId={hashId.value}
                prefixCls={baseClassName.value}
                formatMessage={formatMessage}
                settings={{
                  ...settingState.value,
                }}
                changeSetting={changeSetting}
              />
            </SeetingBody>
            <Divider />
            <SeetingBody
              hashId={hashId.value}
              prefixCls={baseClassName.value}
              title={formatMessage({
                id: 'app.setting.othersettings',
                defaultMessage: '其他设置',
              })}
            >
              <List
                class={classNames(`${baseClassName.value}-list`, hashId.value)}
                split={false}
                size="small"
                renderItem={({ item }) => renderLayoutSettingItem(item)}
                dataSource={[
                  // transitionList !== false && {
                  //   title: formatMessage({
                  //     id: 'app.setting.transitionName',
                  //     defaultMessage: '路由动画',
                  //   }),
                  //   action: (
                  //     <Select
                  //       size="small"
                  //       value={transitionName}
                  //       onSelect={(value: any) => changeSetting('transitionName', value)}
                  //       style={{ width: '110px' }}
                  //       options={transitionList}
                  //     />
                  //   ),
                  // },
                  // {
                  //   title: formatMessage({
                  //     id: 'app.setting.multitab',
                  //     defaultMessage: '多标签',
                  //   }),
                  //   action: (
                  //     <Switch
                  //       size="small"
                  //       checked={!!multiTab}
                  //       onChange={(checked) => {
                  //         changeSetting('multiTab', checked as boolean);
                  //       }}
                  //     />
                  //   ),
                  // },
                  // {
                  //   title: formatMessage({
                  //     id: 'app.setting.multitabFixed',
                  //     defaultMessage: '固定多标签',
                  //   }),
                  //   disabled: !(multiTab && fixedHeader),
                  //   disabledReason: formatMessage({
                  //     id: 'app.setting.multitab.fixed.hit',
                  //     defaultMessage: '固定多标签需要先开启多标签并且固定 Header',
                  //   }),
                  //   action: (
                  //     <Switch
                  //       size="small"
                  //       checked={!!multiTabFixed}
                  //       onChange={(checked) => {
                  //         changeSetting('multiTabFixed', checked as boolean);
                  //       }}
                  //     />
                  //   ),
                  // },
                  {
                    title: formatMessage({
                      id: 'app.setting.weakmode',
                      defaultMessage: '色弱模式',
                    }),
                    action: (
                      <Switch
                        size="small"
                        class="color-weak"
                        checked={!!settingState.value.colorWeak}
                        onChange={(checked) => {
                          changeSetting('colorWeak', checked as boolean);
                        }}
                      />
                    ),
                  },
                ]}
              />
            </SeetingBody>
            {hideHintAlert && hideCopyButton ? null : <Divider />}
            {hideHintAlert ? null : (
              <Alert
                type="warning"
                message={formatMessage({
                  id: 'app.setting.production.hint',
                  defaultMessage:
                    '配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件',
                })}
                icon={<NotificationOutlined />}
                showIcon
                style={{ marginBlockEnd: '16px' }}
              />
            )}
            {hideCopyButton ? null : (
              <CopyToClipboard
                text={genCopySettingJson(settingState.value)}
                onCopy={() =>
                  Message.success(
                    formatMessage({
                      id: 'app.setting.copyinfo',
                      defaultMessage: '拷贝成功，请到 src/defaultSettings.js 中替换默认配置',
                    })
                  )
                }
              >
                <Button block icon={<CopyOutlined />} style={{ marginBlockEnd: '24px' }}>
                  {formatMessage({ id: 'app.setting.copy' })}
                </Button>
              </CopyToClipboard>
            )}
          </div>
        </Drawer>
      );
    };
  },
});

export default SettingDrawer;
