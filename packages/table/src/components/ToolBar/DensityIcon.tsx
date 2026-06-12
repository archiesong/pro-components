import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next1/pro-utils'
import type { VueNode } from '@v-c/util'
import { unit } from '@antdv-next/cssinjs'
import { ColumnHeightOutlined } from '@antdv-next/icons'
import { useIntl } from '@antdv-next1/pro-provider'
import { Dropdown, Tooltip } from 'antdv-next'
import { defineComponent } from 'vue'
import { useTableContextInject } from '../../Store/Provide'

export type DensitySize = 'medium' | 'small' | 'large' | undefined

const DensityIcon = defineComponent(
  <T extends Record<string, any>, P extends Record<string, any>, U extends (ProFieldValueType | ProFieldValueObjectType)>(props: {
    icon?: VueNode
  }) => {
    const intl = useIntl()
    const { tableSize, setTableSize } = useTableContextInject<T, P, U>()
    return () => {
      const { icon = <ColumnHeightOutlined /> } = props
      return (
        <Dropdown
          menu={{
            ...{
              style: {
                width: unit(80),
              },
            },
            selectedKeys: [tableSize?.value!],
            onClick: ({ key }) => {
              setTableSize?.(key as DensitySize)
            },
            items: [
              {
                key: 'large',
                label: intl.value.getMessage({ id: 'tableToolBar.densityLarger', defaultMessage: '宽松' }),
              },
              {
                key: 'medium',
                label: intl.value.getMessage({ id: 'tableToolBar.densityMedium', defaultMessage: '中等' }),
              },
              {
                key: 'small',
                label: intl.value.getMessage({ id: 'tableToolBar.densitySmall', defaultMessage: '紧凑' }),
              },
            ],
          }}
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
      )
    }
  },
  {
    name: 'DensityIcon',
    inheritAttrs: false,
  },
)

export default DensityIcon
