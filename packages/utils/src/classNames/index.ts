const isObject = (val: any) => val !== null && typeof val === 'object';
const isArray = Array.isArray;
const isString = (val: any) => typeof val === 'string';

const classNames = (...args: any[]) => {
  const classes: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (!value) continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const inner = classNames(value[i]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(' ');
};

export default classNames;
