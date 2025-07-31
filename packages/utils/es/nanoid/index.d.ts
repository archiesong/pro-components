/**
 * 生成uuid，如果不支持 randomUUID，就用 genNanoid
 *
 * @returns string
 */
declare const nanoid: () => string;
export default nanoid;
