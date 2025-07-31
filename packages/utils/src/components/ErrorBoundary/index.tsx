import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import { defineComponent, onErrorCaptured, ref } from 'vue';
import { Result, TypographyText } from 'ant-design-vue';
const ErrorBoundary = defineComponent({
  name: 'ErrorBoundary',
  inheritAttrs: false,
  props: {
    fallback: {
      type: [Function, Object] as PropType<(error: Error, info: string) => VueNode>,
      default: undefined,
    },
    onError: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['errorCaptured'],
  setup(props, { slots, emit }) {
    const hasError = ref<boolean>(false);
    const errorInfo = ref();
    const $error = ref();
    onErrorCaptured((error: Error, vm, info: string) => {
      hasError.value = true;
      errorInfo.value = info;
      $error.value = error;
      props.onError?.(error);
      emit('errorCaptured', { error, vm, info });
      return false;
    });
    // $error
    return () => {
      return (
        <>
          {hasError.value ? (
            <>
              {props.fallback ? (
                <>
                  {typeof props.fallback === 'function'
                    ? props.fallback?.($error.value, errorInfo.value)
                    : props.fallback}
                </>
              ) : (
                <Result status="error" title="Something went wrong." style={{ zIndex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <TypographyText>
                      {errorInfo.value}：<TypographyText>{$error.value.toString()}</TypographyText>
                    </TypographyText>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {$error.value.stack
                        .replace($error.value.toString(), '')
                        ?.split('\n')
                        .map((stack: string, i: number) => (
                          <div key={stack + i} style={{ textAlign: 'left', fontSize: 10 }}>
                            <TypographyText type={'secondary'}>{stack}</TypographyText>
                          </div>
                        )) ?? null}
                    </div>
                  </div>
                </Result>
              )}
            </>
          ) : (
            <>{slots.default?.()}</>
          )}
        </>
      );
    };
  },
});

export default ErrorBoundary;
