import type { ExtractPropTypes, DefineComponent, Plugin, App } from 'vue';
import type { ProFormInstance } from '../../BaseForm';
import { defineComponent, ref, onMounted } from 'vue';
import { Form } from 'ant-design-vue';
import { formProps } from 'ant-design-vue/es/form';
import { omit } from '@ant-design-vue/pro-utils';
import { BaseForm, commonFormProps } from '../../BaseForm';

export const proFormProps = () => ({
  ...omit(formProps(), ['onFinish']),
  ...commonFormProps(),
});

export type ProFormProps = Partial<ExtractPropTypes<ReturnType<typeof proFormProps>>>;

const ProForm = defineComponent({
  name: 'ProForm',
  inheritAttrs: false,
  props: proFormProps(),
  setup(props, { slots, expose }) {
    const formRef = ref<ProFormInstance>();
    // onMounted(() => {
    //   console.log(formRef, 'ProForm');
    // });
    expose({});
    return () => (
      <BaseForm
        {...props}
        ref={formRef}
        layout="vertical"
        onInit={(_, form) => {
          formRef.value = form;
        }}
        contentRender={(items, submitter) => {
          return (
            <>
              {items}
              {submitter}
            </>
          );
        }}
      >
        {slots.default?.()}
      </BaseForm>
    );
  },
});

ProForm.useForm = Form.useForm;
ProForm.install = (app: App) => {
  app.component(ProForm.name as string, ProForm);
  return app;
};

export default ProForm as DefineComponent<ProFormProps> & Plugin;
