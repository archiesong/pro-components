import type { FunctionalComponent } from 'vue'
import type { RenderSetting } from '../../defaultSettings'
import type { MessageDescriptor } from '../../typing'
import { Listy } from '@antdv-next1/pro-listy'
import { classNames } from '@v-c/util'
import { Switch } from 'antdv-next'
import { renderLayoutSettingItem } from './LayoutChange'

const RegionalSetting: FunctionalComponent<{
  settings: Partial<RenderSetting>
  changeSetting: (key: string, value: any, hideLoading?: boolean) => void
  hashId: string
  prefixCls: string
  formatMessage: (data: MessageDescriptor) => string
}> = ({ settings = {}, prefixCls, changeSetting, formatMessage, hashId }) => {
  const regionalSetting = ['header', 'footer', 'menu', 'menuHeader']
  return (
    <Listy
      split={false}
      class={classNames(`${prefixCls}-list`, hashId)}
      itemRender={item => renderLayoutSettingItem(item)}
      rowKey="title"
      variant="borderless"
      items={regionalSetting.map((key) => {
        return {
          title: formatMessage({ id: `app.setting.regionalsettings.${key}` }),
          action: (
            <Switch
              size="small"
              class={classNames(`regional-${key}`, hashId)}
              checked={
                (settings[`${key}Render` as 'headerRender']
                  || settings[`${key}Render` as 'headerRender']) === undefined
              }
              onChange={checked =>
                changeSetting(`${key}Render`, checked === true ? undefined : false)}
            />
          ),
        }
      })}
    />
  )
}
export default RegionalSetting
