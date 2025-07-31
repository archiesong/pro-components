type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

const omitUndefined = <T extends Record<string, any>>(obj: T): OmitUndefined<T> => {
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key as keyof typeof newObj] = obj[key];
    }
  });
  if (Object.keys(newObj as Record<string, any>).length < 1) {
    return void 0 as any;
  }
  return newObj as OmitUndefined<T>;
};
export default omitUndefined;
