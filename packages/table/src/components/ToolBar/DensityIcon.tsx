import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';

import { defineComponent } from 'vue';
import { Dropdown, Tooltip, Menu } from 'ant-design-vue';
import { useIntl } from '@ant-design-vue/pro-provider';
import { ColumnHeightOutlined } from '@ant-design/icons-vue';
import { useTableContextInject } from '../../Store/Provide';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

const DensityIcon = defineComponent({
  name: 'DensityIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: [String, Object, Function, Array] as PropType<VueNode>,
      default: undefined,
    },
  },
  setup(props) {
    const intl = useIntl();
    const counter = useTableContextInject();
    return () => {
      const { icon = <ColumnHeightOutlined /> } = props;
      return (
        <Dropdown
          overlay={
            <Menu
              style={{
                width: '80px',
              }}
              selectedKeys={[counter.tableSize.value || 'large']}
              onClick={({ key }) => counter.setTableSize?.(key as DensitySize)}
              items={[
                {
                  key: 'large',
                  label: intl.value.getMessage({
                    id: 'tableToolBar.densityLarger',
                    defaultMessage: '宽松',
                  }),
                },
                {
                  key: 'middle',
                  label: intl.value.getMessage({
                    id: 'tableToolBar.densityMiddle',
                    defaultMessage: '中等',
                  }),
                },
                {
                  key: 'small',
                  label: intl.value.getMessage({
                    id: 'tableToolBar.densitySmall',
                    defaultMessage: '紧凑',
                  }),
                },
              ]}
            />
          }
          trigger={['click']}
        >
          <Tooltip
            title={intl.value.getMessage({
              id: 'tableToolBar.density',
              defaultMessage: '表格密度',
            })}
          >
            {icon}
          </Tooltip>
        </Dropdown>
      );
    };
  },
});

export default DensityIcon;
