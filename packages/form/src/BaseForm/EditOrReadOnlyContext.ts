import type { InjectionKey } from 'vue';
import type { FormModeType } from '../typing';
import { provide, inject } from 'vue';

export const editOrReadOnlyContextKey: InjectionKey<{ mode: FormModeType }> =
  Symbol('editOrReadOnlyContext');

export const useEditOrReadOnlyContextProvider = (props: { mode: FormModeType }) =>
  provide(editOrReadOnlyContextKey, props);

export const useEditOrReadOnlyContextInject = () =>
  inject(editOrReadOnlyContextKey, {
    mode: 'edit',
  } as { mode: FormModeType });
