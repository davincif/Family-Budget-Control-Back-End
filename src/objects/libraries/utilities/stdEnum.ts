/**
 * This is the type of a standard enum type in typscript.
 * Only needed to perform some type safe generic operation over enums
 */
export type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};
