import type { VNode, FunctionalComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { classNames } from '@ant-design-vue/pro-utils';

const BlockCheckbox: FunctionalComponent<{
  list?: {
    title: string;
    key: string;
    icon?: VNode;
  }[];
  prefixCls?: string;
  value?: string;
  hashId?: string;
  configType?: string;
  onChange?: (value: string) => void;
}> = (props) => {
  const baseClassName = `${props.prefixCls}-block-checkbox`;
  return (
    <div class={classNames(baseClassName, props.hashId)}>
      {(props.list || []).map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <div
            class={classNames(
              props.hashId,
              `${baseClassName}-item`,
              `${baseClassName}-item-${item.key}`,
              `${baseClassName}-${props.configType}-item`
            )}
            onClick={() => props.onChange?.(item.key)}
          >
            {item.key === 'left' && (
              <div class={`${baseClassName}-item-left-inner ${props.hashId}`} />
            )}
            <CheckOutlined
              class={`${baseClassName}-selectIcon ${props.hashId}`}
              style={{
                display: props.value === item.key ? 'block' : 'none',
              }}
            />
            {item?.icon ? (
              <div class={`${baseClassName}-icon ${props.hashId}`}>{item.icon}</div>
            ) : null}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
BlockCheckbox.inheritAttrs = false;
export default BlockCheckbox;
