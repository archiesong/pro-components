import type { ComputedRef, FunctionalComponent, VNode } from 'vue';
import type { PureSettings } from '../../defaultSettings';
import type { Locale } from 'ant-design-vue/es/locale';
import type { SelectValue } from 'ant-design-vue/es/select';
import type { MessageDescriptor, VueNode } from '../../typing';
import { cloneVNode } from 'vue';
import defaultSettings from '../../defaultSettings';
import { List, Select, Switch, Tooltip } from 'ant-design-vue';
import { gLocaleObject } from '../../locales';
import { classNames } from '@ant-design-vue/pro-utils';

export type SettingItemProps = {
  title: VueNode;
  action: VueNode;
  disabled?: boolean;
  disabledReason?: VueNode;
};
export const getFormatMessage = (
  locale?: ComputedRef<Locale>
): ((data: { id: string; defaultMessage?: string }) => string) => {
  return ({ id }: { id: string; defaultMessage?: string }): string => {
    const locales = gLocaleObject(locale?.value.locale);
    return locales[id];
  };
};

export const renderLayoutSettingItem = (item: SettingItemProps) => {
  const action = cloneVNode(item.action as VNode, {
    disabled: item.disabled,
  });
  return (
    <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
      <List.Item actions={[action]}>
        <span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
      </List.Item>
    </Tooltip>
  );
};

export const LayoutSetting: FunctionalComponent<{
  settings: Partial<PureSettings>;
  changeSetting: (key: string, value: any) => void;
  hashId: string;
  prefixCls: string;
  formatMessage: (data: MessageDescriptor) => string;
}> = ({ settings = {}, prefixCls, formatMessage, changeSetting, hashId }) => {
  const { compact, contentWidth, splitMenus, fixedHeader, layout, fixedSiderbar } =
    settings || defaultSettings;
  return (
    <List
      class={classNames(`${prefixCls}-list`, hashId)}
      split={false}
      renderItem={({ item }) => renderLayoutSettingItem(item)}
      dataSource={[
        {
          title: formatMessage({
            id: 'app.setting.content-width',
            defaultMessage: '内容区域宽度',
          }),
          action: (
            <Select
              value={contentWidth || 'Fixed'}
              size="small"
              class={classNames(`content-width`, hashId)}
              onSelect={(value: SelectValue) => changeSetting('contentWidth', value)}
              style={{ width: 80 }}
            >
              {layout !== 'top' ? null : (
                <Select.Option value="Fixed">
                  {formatMessage({
                    id: 'app.setting.content-width.fixed',
                    defaultMessage: '固定',
                  })}
                </Select.Option>
              )}
              <Select.Option value="Fluid">
                {formatMessage({
                  id: 'app.setting.content-width.fluid',
                  defaultMessage: '流式',
                })}
              </Select.Option>
            </Select>
          ),
        },
        {
          title: formatMessage({
            id: 'app.setting.theme.mode.compact',
            defaultMessage: '紧凑模式',
          }),
          action: (
            <Switch
              size="small"
              class="compact-mode"
              checked={!!compact}
              onChange={(checked) => changeSetting('compact', checked)}
            />
          ),
        },
        {
          title: formatMessage({
            id: 'app.setting.fixedheader',
            defaultMessage: '固定头部',
          }),
          disabled: layout === 'mix',
          disabledReason: formatMessage({
            id: 'app.setting.fixedheader.hint',
            defaultMessage: '混合模式必须开启固定 Header',
          }),
          action: (
            <Switch
              size="small"
              class="fixed-header"
              checked={!!fixedHeader}
              onChange={(checked) => changeSetting('fixedHeader', checked)}
            />
          ),
        },
        {
          title: formatMessage({
            id: 'app.setting.fixedsidebar',
            defaultMessage: '固定侧边菜单',
          }),
          disabled: layout === 'top',
          disabledReason: formatMessage({
            id: 'app.setting.fixedsidebar.hint',
            defaultMessage: '侧边菜单布局时可配置',
          }),
          action: (
            <Switch
              size="small"
              class="fix-sidebar"
              checked={!!fixedSiderbar}
              onChange={(checked) => changeSetting('fixedSiderbar', checked)}
            />
          ),
        },
        {
          title: formatMessage({ id: 'app.setting.splitMenus' }),
          disabled: layout !== 'mix',
          disabledReason: formatMessage({
            id: 'app.setting.layout.mix.hint',
            defaultMessage: '将菜单分割成Header和Side',
          }),
          action: (
            <Switch
              size="small"
              checked={!!splitMenus}
              class="split-menus"
              onChange={(checked) => changeSetting('splitMenus', checked)}
            />
          ),
        },
      ]}
    />
  );
};
