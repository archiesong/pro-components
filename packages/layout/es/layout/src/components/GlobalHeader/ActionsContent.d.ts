import { PropType } from 'vue';
import { AvatarProps } from 'ant-design-vue';
import { VueNode, WithFalse } from '../../typing';
import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import { ActionsRender } from '../../RenderTypings';
export type AvatarPropsType = WithFalse<AvatarProps & {
    title?: VueNode;
    render?: (avatarProps: AvatarProps, defaultDom: VueNode, props: SiderMenuProps) => VueNode;
}>;
declare const ActionsContent: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: PropType<string>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: PropType<string>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    prefixCls: string;
    avatarProps: AvatarPropsType;
    actionsRender: ActionsRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default ActionsContent;
