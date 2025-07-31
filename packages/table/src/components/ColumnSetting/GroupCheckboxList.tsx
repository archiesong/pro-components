import type { PropType } from 'vue';
import type { ProColumns } from '../../typing';
import { defineComponent } from 'vue';
import { classNames } from '@ant-design-vue/pro-utils';
import { useIntl, useProConfigContextInject } from '@ant-design-vue/pro-provider';
import CheckboxList from './CheckboxList';
const GroupCheckboxList = defineComponent({
  name: 'GroupCheckboxList',
  inheritAttrs: false,
  props: {
    draggable: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    checkable: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    showListItemOption: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: undefined,
    },
    listHeight: {
      type: Number as PropType<number>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const proProvide = useProConfigContextInject();
    const intl = useIntl();

    return () => {
      const { columns, draggable, checkable, showListItemOption, listHeight } = props;
      const rightList: ProColumns[] = [];
      const leftList: ProColumns[] = [];
      const list: ProColumns[] = [];
      columns?.forEach((item) => {
        const { fixed, hideInSetting } = item;
        /** 不在 setting 中展示的 */
        if (hideInSetting) {
          return;
        }
        if (fixed === 'left') {
          leftList.push(item);
          return;
        }
        if (fixed === 'right') {
          rightList.push(item);
          return;
        }
        list.push(item);
      });

      const showRight = rightList && rightList.length > 0;

      const showLeft = leftList && leftList.length > 0;
      return (
        <div
          class={classNames(`${attrs.class}-list`, proProvide.value.hashId, {
            [`${attrs.class}-list-group`]: showRight || showLeft,
          })}
        >
          <CheckboxList
            title={intl.value.getMessage({
              id: 'tableToolBar.leftFixedTitle',
              defaultMessage: '固定在左侧',
            })}
            list={leftList}
            class={attrs.class}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            listHeight={listHeight}
          />
          {/* 如果没有任何固定，不需要显示title */}
          <CheckboxList
            list={list}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            title={intl.value.getMessage({
              id: 'tableToolBar.noFixedTitle',
              defaultMessage: '不固定',
            })}
            showTitle={showLeft || showRight}
            class={attrs.class}
            listHeight={listHeight}
          />
          <CheckboxList
            title={intl.value.getMessage({
              id: 'tableToolBar.rightFixedTitle',
              defaultMessage: '固定在右侧',
            })}
            list={rightList}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            class={attrs.class}
            listHeight={listHeight}
          />
        </div>
      );
    };
  },
});

export default GroupCheckboxList;
