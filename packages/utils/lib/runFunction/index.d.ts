/** 如果是个方法执行一下它 */
declare const runFunction: <T extends any[]>(valueEnum: any, ...rest: T) => any;
export default runFunction;
