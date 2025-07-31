import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import { defineComponent } from 'vue';
import { useIntl, useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { classNames } from '@ant-design-vue/pro-utils';
import ToolTipIcon from './ToolTipIcon';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons-vue';

const CheckboxListItem = defineComponent({
  name: 'CheckboxListItem',
  inheritAttrs: false,
  props: {
    columnKey: {
      type: [Number, String] as PropType<string | number>,
      default: undefined,
    },
    title: {
      type: [String, Object, Function] as PropType<VueNode>,
      default: undefined,
    },
    fixed: {
      type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
      default: undefined,
    },
    showListItemOption: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    isLeaf: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const intl = useIntl();
    const proProvide = useProConfigContextInject();
    return () => (
      <span
        class={classNames(`${attrs.class}-list-item`, proProvide.value.hashId)}
        key={props.columnKey}
      >
        <span class={classNames(`${attrs.class}-list-item-title`, proProvide.value.hashId)}>
          {props.title}
        </span>
        {props.showListItemOption && !props.isLeaf ? (
          <span class={classNames(`${attrs.class}-list-item-option`, proProvide.value.hashId)}>
            <ToolTipIcon
              columnKey={props.columnKey}
              fixed="left"
              title={intl.value.getMessage({
                id: 'tableToolBar.leftPin',
                defaultMessage: '固定在列首',
              })}
              show={props.fixed !== 'left'}
            >
              <VerticalAlignTopOutlined />
            </ToolTipIcon>
            <ToolTipIcon
              columnKey={props.columnKey}
              fixed={undefined}
              title={intl.value.getMessage({ id: 'tableToolBar.noPin', defaultMessage: '不固定' })}
              show={!!props.fixed}
            >
              <VerticalAlignMiddleOutlined />
            </ToolTipIcon>
            <ToolTipIcon
              columnKey={props.columnKey}
              fixed="right"
              title={intl.value.getMessage({
                id: 'tableToolBar.rightPin',
                defaultMessage: '固定在列尾',
              })}
              show={props.fixed !== 'right'}
            >
              <VerticalAlignBottomOutlined />
            </ToolTipIcon>
          </span>
        ) : null}
      </span>
    );
  },
});
export default CheckboxListItem;
