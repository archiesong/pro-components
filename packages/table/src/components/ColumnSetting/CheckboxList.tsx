import type { PropType } from 'vue';
import type { ProColumns } from '../../typing';
import type { ColumnsState } from '../../Store/Provide';
import type { DataNode, EventDataNode } from 'ant-design-vue/es/tree';
import type { Key } from 'ant-design-vue/es/_util/type';
import type { CheckInfo } from 'ant-design-vue/es/vc-tree/props';
import { computed, defineComponent } from 'vue';
import { Tree, TypographyText } from 'ant-design-vue';
import { HolderOutlined } from '@ant-design/icons-vue';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { useTableContextInject } from '../../Store/Provide';
import { classNames, useMemo, runFunction, omit } from '@ant-design-vue/pro-utils';
import { genColumnKey } from '../../utils/genProColumnToColumn';
import CheckboxListItem from './CheckboxListItem';
const CheckboxList = defineComponent({
  name: 'CheckboxList',
  inheritAttrs: false,
  props: {
    title: {
      type: String as PropType<string>,
      default: undefined,
    },
    list: {
      type: Array as PropType<ProColumns[]>,
      default: undefined,
    },
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
    showTitle: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    listHeight: {
      type: Number as PropType<number>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const proProvide = useProConfigContextInject();
    const { columnsMap, sortKeyColumns, setColumnsMap, setSortKeyColumns } =
      useTableContextInject();
    const show = computed(() => props.list && props.list.length > 0);

    const treeDataConfig = useMemo(() => {
      if (!show.value) return {};
      const checkedKeys: string[] = [];
      const treeMap = new Map<string | number, DataNode>();

      const loopData = (
        data: ProColumns[],
        parentConfig?: ColumnsState & {
          columnKey: string;
        }
      ): DataNode[] =>
        data.map(({ key, dataIndex, children, ...rest }) => {
          const columnKey = genColumnKey(
            key,
            [parentConfig?.columnKey, rest.index].filter(Boolean).join('-')
          );
          const config = columnsMap.value?.[columnKey || 'null'] || { show: true };
          if (config.show !== false && !children) {
            checkedKeys.push(columnKey);
          }

          const item: DataNode = {
            key: columnKey,
            ...rest,
            selectable: false,
            disabled: config.disable === true,
            disableCheckbox:
              typeof config.disable === 'boolean' ? config.disable : config.disable?.checkbox,
            isLeaf: parentConfig ? true : undefined,
          };

          if (children) {
            item.children = loopData(children, {
              ...config,
              columnKey,
            });
            // 如果children 已经全部是show了，把自己也设置为show
            if (
              item.children?.every((childrenItem) =>
                checkedKeys?.includes(childrenItem.key as string)
              )
            ) {
              checkedKeys.push(columnKey);
            }
          }
          treeMap.set(key!, item);
          return item;
        });
      return { list: loopData(props.list!), keys: checkedKeys, map: treeMap };
    }, [() => columnsMap.value, () => props.list, () => show.value]);

    /** 移动到指定的位置 */
    const move = (id: Key, targetId: Key, dropPosition: number) => {
      const newMap = { ...columnsMap.value };
      const newColumns = [...sortKeyColumns.value];

      const findIndex = newColumns.findIndex((columnKey) => columnKey === id);

      const targetIndex = newColumns.findIndex((columnKey) => columnKey === targetId);
      const isDownWard = dropPosition >= findIndex;
      if (findIndex < 0) return;
      const targetItem = newColumns[findIndex];
      newColumns.splice(findIndex, 1);
      if (dropPosition === 0) {
        newColumns.unshift(targetItem);
      } else {
        newColumns.splice(isDownWard ? targetIndex : targetIndex + 1, 0, targetItem);
      }
      // 重新生成排序数组
      newColumns.forEach((key, order) => {
        newMap[key] = { ...(newMap[key] || {}), order };
      });
      // 更新数组
      setColumnsMap(newMap);
      setSortKeyColumns(newColumns);
    };

    /** 选中反选功能 */
    const onCheckTree = (e: CheckInfo) => {
      const newColumnMap = { ...columnsMap.value };

      const loopSetShow = (key: string | number) => {
        const newSetting = { ...newColumnMap[key] };
        newSetting.show = e.checked;
        // 如果含有子节点，也要选中
        if (treeDataConfig.value.map?.get(key)?.children) {
          treeDataConfig.value.map
            .get(key)
            ?.children?.forEach((item) => loopSetShow(item.key as string));
        }
        newColumnMap[key] = newSetting;
      };
      loopSetShow(e.node.key);
      setColumnsMap({ ...newColumnMap });
    };
    return () => {
      const {
        showTitle = true,
        title,
        draggable,
        listHeight = 280,
        showListItemOption,
        checkable,
      } = props;
      if (!show.value) {
        return null;
      }
      const listDom = (
        <Tree
          itemHeight={24}
          draggable={
            draggable &&
            !!treeDataConfig.value.list?.length &&
            treeDataConfig.value.list?.length > 1 && {
              icon: <HolderOutlined />,
            }
          }
          key={`tree-${attrs.key}`}
          checkable={checkable}
          onDrop={(info) => {
            const dropKey = info.node.key;
            const dragKey = info.dragNode.key;
            const { dropPosition, dropToGap } = info;
            const position = dropPosition === -1 || !dropToGap ? dropPosition + 1 : dropPosition;
            move(dragKey, dropKey, position);
          }}
          blockNode
          height={listHeight}
          onCheck={(_, e) => onCheckTree(e)}
          checkedKeys={treeDataConfig.value.keys}
          showLine={false}
          v-slots={{
            title: (_node: EventDataNode) => {
              const node = { ..._node, children: undefined };
              if (!node.title) return null;
              const normalizedTitle = runFunction(node.title, node);
              const wrappedTitle = (
                <TypographyText ellipsis={{ tooltip: normalizedTitle }} content={normalizedTitle} />
              );
              return (
                <CheckboxListItem
                  class={attrs.class}
                  {...omit(node, ['key', 'isLeaf'])}
                  showListItemOption={showListItemOption}
                  title={wrappedTitle}
                  columnKey={node.key}
                />
              );
            },
          }}
          treeData={treeDataConfig.value.list?.map(
            ({ disabled /* 不透传 disabled，使子节点禁用时也可以拖动调整顺序 */, ...config }) =>
              config
          )}
        />
      );
      return (
        <>
          {showTitle && (
            <span class={classNames(`${attrs.class}-list-title`, proProvide.value.hashId)}>
              {title}
            </span>
          )}
          {listDom}
        </>
      );
    };
  },
});

export default CheckboxList;
