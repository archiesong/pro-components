/**
 * 剔除 boolean 值
 * @param  {boolean|T} obj
 * @returns T
 */
declare const omitBoolean: <T>(obj: boolean | T) => T | undefined;
export default omitBoolean;
