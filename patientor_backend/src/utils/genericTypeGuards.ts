/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isString = (text:any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (dateText:any):boolean /*dateText is Date*/ =>  {
  const regex = new RegExp(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
  return regex.test(dateText);
};
