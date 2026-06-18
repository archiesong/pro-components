// import type { Ref } from 'vue'

export function useFieldExpose(ref, valueType) {
//   const mergeValueType = typeof valueType === 'string' ? valueType : valueType.type
  // let exposed: ProFieldExpose<T> | null = null
//   if (mergeValueType === 'text') {

  //   }

  return {
    focus: ref.value?.focus,
    blur: ref.value?.blur,
    // setSelectionRange: ref.value?.setSelectionRange,
    // input: ref.value?.input,
    // select: ref.value?.select,
    // nativeElement: ref.value?.nativeElement,
  }
}
