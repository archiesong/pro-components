/** 如果是个方法执行一下它 */
const runFunction = <T extends any[]>(valueEnum: any, ...rest: T) => {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
};
export default runFunction;
