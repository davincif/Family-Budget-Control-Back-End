import { StandardEnum } from "../../objects/libraries/utilities/stdEnum.js";

/**
 * A Generator with whom to iterate over enums' keys
 * @param enumToIterate The Enum over which to iterate
 */
export function* keysIterator(enumToIterate: StandardEnum<unknown>) {
  const nextkeys = getKeys(enumToIterate);
  for (let key of nextkeys) {
    yield key;
  }
}

/**
 * A Generator with whom to iterate over enums' values
 * @param enumToIterate The Enum over which to iterate
 */
export function* valuesIterator(enumToIterate: StandardEnum<unknown>) {
  const nextValues = getValues(enumToIterate);

  for (let value of nextValues) {
    yield value;
  }
}

/**
 * Gets only the keys of a given enum
 * @param enumToIterate The Enum over which to iterate
 */
export function getKeys(enumToIterate: StandardEnum<unknown>) {
  const keys = Object.keys(enumToIterate);

  return keys.slice(0, keys.length / 2);
}

/**
 * Gets only the values of a given enum
 * @param enumToIterate The Enum over which to iterate
 */
export function getValues(enumToIterate: StandardEnum<unknown>) {
  const keys = Object.keys(enumToIterate);

  return keys.slice(keys.length / 2);
}
