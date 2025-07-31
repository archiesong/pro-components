import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';

export const formListContextKey: InjectionKey<{}> = Symbol('formListContext');

export const useFormListContextProvider = (props) => provide(formListContextKey, props);

export const useFormListContextInject = () => inject(formListContextKey, {} as {});
