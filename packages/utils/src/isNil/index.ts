const isNil = (value: any): value is null | undefined => value === null || value === undefined;
export default isNil;
