import { ComputedRef } from 'vue';
declare const useDocumentTitle: (titleInfo: ComputedRef<{
    title: string;
    id: string;
    pageName: string;
}>, appDefaultTitle: ComputedRef<string | false>) => void;
export default useDocumentTitle;
