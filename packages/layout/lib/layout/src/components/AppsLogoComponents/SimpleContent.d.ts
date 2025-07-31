import { Ref, FunctionalComponent } from 'vue';
import { AppItemProps, AppListProps } from './typing';
declare const SimpleContent: FunctionalComponent<{
    appList?: AppListProps;
    itemClick?: (item: AppItemProps, popoverRef?: Ref<HTMLSpanElement>) => void;
    baseClassName?: string;
    hashId?: string;
}>;
export default SimpleContent;
