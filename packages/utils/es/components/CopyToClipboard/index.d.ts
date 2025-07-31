import { FunctionalComponent } from 'vue';
declare const CopyToClipboard: FunctionalComponent<{
    text?: string;
    onCopy?: (text?: string, copied?: boolean) => void;
    options?: {
        debug?: boolean;
        format?: 'text/plain' | 'text/html' | 'default';
        message?: string;
    };
}>;
export default CopyToClipboard;
