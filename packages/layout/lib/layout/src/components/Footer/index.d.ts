import { CSSProperties, FunctionalComponent, VNode } from 'vue';
import { WithFalse } from '../../typing';
declare const FooterView: FunctionalComponent<{
    links?: WithFalse<{
        key?: string;
        title: VNode;
        href: string;
        blankTarget?: boolean;
    }[]>;
    copyright?: WithFalse<string>;
    style?: CSSProperties;
    class?: string;
    prefixCls?: string;
}>;
export default FooterView;
