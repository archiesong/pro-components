import { BaseQueryFilterProps } from '@ant-design-vue/pro-form';
export type SearchConfig = BaseQueryFilterProps & {
    filterType?: 'query' | 'light';
};
