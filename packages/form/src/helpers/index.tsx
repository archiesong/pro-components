import type { FunctionalComponent, InjectionKey } from 'vue';
import type { ColProps, RowProps } from 'ant-design-vue';
import type { ProFormGridConfig } from '../typing';
import { provide, inject } from 'vue';
import { Col, Row } from 'ant-design-vue';
import { useMemo } from '@ant-design-vue/pro-utils';

export const gridContextKey: InjectionKey<ProFormGridConfig> = Symbol('gridContext');

export const useGridContextProvider = (props: ProFormGridConfig) => provide(gridContextKey, props);

export const useGridContextInject = () =>
  inject(gridContextKey, {
    grid: false,
    colProps: undefined,
    rowProps: undefined,
  } as ProFormGridConfig);

interface CommonProps {
  Wrapper?: FunctionalComponent<any>;
}

export interface GridHelpers {
  RowWrapper: FunctionalComponent<RowProps & CommonProps>;
  ColWrapper: FunctionalComponent<ColProps & CommonProps>;
  grid: boolean;
}

export const gridHelpers: (config: ProFormGridConfig & CommonProps) => GridHelpers = ({
  grid,
  rowProps,
  colProps,
}) => ({
  grid: !!grid,
  RowWrapper({ Wrapper, ...props }, { slots }) {
    if (!grid) {
      return Wrapper ? <Wrapper>{slots.default?.()}</Wrapper> : slots.default?.();
    }
    return (
      <Row gutter={8} {...rowProps} {...props}>
        {slots.default?.()}
      </Row>
    );
  },
  ColWrapper({ Wrapper, ...rest }, { slots }) {
    const props = { ...colProps, ...rest };
    if (typeof props.span === 'undefined' && typeof props.xs === 'undefined') {
      props.xs = 24;
    }
    if (!grid) {
      return Wrapper ? <Wrapper>{slots.default?.()}</Wrapper> : slots.default?.();
    }
    return <Col {...props}>{slots.default?.()}</Col>;
  },
});

export const useGridHelpers = (props?: (ProFormGridConfig & CommonProps) | boolean) => {
  const config = useMemo(() => {
    {
      if (typeof props === 'object') {
        return props;
      }
      return {
        grid: props,
      };
    }
  }, [() => props]);
  const { grid, colProps } = useGridContextInject();
  return gridHelpers({
    grid: !!(grid || config.value.grid),
    rowProps: config.value.rowProps,
    colProps: config.value.colProps || colProps,
    Wrapper: config.value.Wrapper,
  });
};
