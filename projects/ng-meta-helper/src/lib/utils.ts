export const merge = (target: any, source: any) => {
  if (target !== undefined) {
    for (const [key, value] of Object.entries(source)) {
      if (value instanceof Object) Object.assign(value, merge(target[key], value));
    }
    return Object.assign(target, source);
  }
};
