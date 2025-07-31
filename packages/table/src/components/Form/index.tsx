import type { FunctionalComponent } from 'vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { ActionType } from '../../typing';
import type { ProTableProps } from '../../proTableProps';
import FormRender from './FormRender';
import { omit, omitUndefined } from '@ant-design-vue/pro-utils';
import { isBordered } from '../../utils';
type BaseFormProps = {
  pagination?: TablePaginationConfig | false;
  beforeSearchSubmit?: (params: Partial<Record<string, any>>) => Record<string, any>;
  action: ActionType | undefined;
  onSubmit?: (params: Record<string, any>) => void;
  onReset?: () => void;
  loading: boolean;
  onFormSearchSubmit: (params: Record<string, any>) => void;
  columns: ProTableProps['columns'];
  dateFormatter: ProTableProps['dateFormatter'];
  formRef: ProTableProps['formRef'];
  setFormRef: ProTableProps['onUpdate:formRef'];
  type: ProTableProps['type'];
  cardBordered: ProTableProps['cardBordered'];
  form: ProTableProps['form'];
  search: ProTableProps['search'];
  manualRequest: ProTableProps['manualRequest'];
};

const FormSearch: FunctionalComponent<
  BaseFormProps & {
    ghost?: boolean;
  }
> = ({
  onFormSearchSubmit,
  action,
  columns,
  loading,
  type,
  ghost,
  form,
  formRef,
  setFormRef,
  manualRequest,
  search,
  cardBordered,
  dateFormatter,
  onSubmit: propsOnSubmit,
  beforeSearchSubmit = (searchParams) => searchParams,
  pagination,
}) => {
  const onSubmit = (value: Record<string, any>, firstLoad: boolean) => {
    // 只传入 pagination 中的 current 和 pageSize 参数
    const pageInfo: TablePaginationConfig = pagination
      ? omitUndefined({
          current: pagination.current,
          pageSize: pagination.pageSize,
        })
      : ({} as TablePaginationConfig);
    const submitParams = {
      ...value,
      _timestamp: Date.now(),
      ...pageInfo,
    };
    const omitParams = omit(beforeSearchSubmit(submitParams), Object.keys(pageInfo!));
    onFormSearchSubmit(omitParams);
    if (!firstLoad) {
      // back first page
      action?.setPageInfo?.({
        current: 1,
      });
    }
    if (propsOnSubmit && !firstLoad) {
      propsOnSubmit?.(value);
    }
  };
  const onReset = () => {};
  // const pageInfo = pagination
  //   ? omitUndefined({
  //       current: pagination.current,
  //       pageSize: pagination.pageSize,
  //     })
  //   : {};
  return (
    <FormRender
      loading={loading}
      columns={columns!}
      type={type}
      ghost={ghost}
      formRef={formRef!}
      onUpdate:formRef={setFormRef}
      onSubmit={onSubmit}
      manualRequest={manualRequest}
      onReset={onReset}
      dateFormatter={dateFormatter}
      search={search}
      form={{
        autoFocusFirstInput: false,
        ...form,
      }}
      action={action}
      bordered={isBordered('search', cardBordered)}
    />
  );
};

export default FormSearch;
