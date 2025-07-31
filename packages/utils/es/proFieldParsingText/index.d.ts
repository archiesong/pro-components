import { FunctionalComponent } from 'vue';
import { BadgeProps } from 'ant-design-vue';
import { Key, VueNode } from 'ant-design-vue/es/_util/type';
import { ProFieldValueEnumType, ProSchemaValueEnumMap } from '../typing';
export declare const ProFieldBadgeColor: FunctionalComponent<BadgeProps>;
export declare const objectToMap: (value: ProFieldValueEnumType | undefined) => ProSchemaValueEnumMap;
/**
 * 转化 text 和 valueEnum 通过 type 来添加 Status
 *
 * @param text
 * @param valueEnum
 * @param pure 纯净模式，不增加 status
 */
declare const proFieldParsingText: (text: Key | Key[] | {
    label: string;
}, valueEnumParams: ProFieldValueEnumType, key?: number | string) => VueNode;
export default proFieldParsingText;
