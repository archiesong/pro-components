import type { FunctionalComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { classNames } from '@ant-design-vue/pro-utils';
export type TagProps = {
  color: string;
  check: boolean;
  class?: string;
  onClick?: () => void;
};

const Tag: FunctionalComponent<TagProps> = ({ color, check, ...rest }) => {
  return (
    <div {...rest} style={{ backgroundColor: color }}>
      {check ? <CheckOutlined /> : ''}
    </div>
  );
};

export type ThemeColorProps = {
  colorList?: {
    key: string;
    color: string;
    title?: string;
  }[];
  prefixCls: string;
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
  hashId: string;
};
const ThemeColor: FunctionalComponent<ThemeColorProps> = ({
  value,
  colorList,
  onChange,
  prefixCls,
  formatMessage,
  hashId,
}) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  const baseClassName = `${prefixCls}-theme-color`;
  return (
    <div class={classNames(`${baseClassName}`, hashId)}>
      {colorList?.map(({ key, color, title }) => {
        if (!key) return null;
        return (
          <Tooltip
            key={color}
            title={
              title ??
              formatMessage({
                id: `app.setting.themecolor.${key}`,
              })
            }
          >
            <Tag
              class={classNames(`${baseClassName}-block`, hashId)}
              color={color}
              check={(value.startsWith('#') ? value.toUpperCase() : value) === color}
              onClick={() => onChange && onChange(color)}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};
export default ThemeColor;
