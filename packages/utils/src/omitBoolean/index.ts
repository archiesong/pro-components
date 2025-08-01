/**
 * 剔除 boolean 值
 * @param  {boolean|T} obj
 * @returns T
 */
const omitBoolean = <T>(obj: boolean | T): T | undefined => {
  if (obj && obj !== true) {
    return obj;
  }
  return undefined;
};
export default omitBoolean;
