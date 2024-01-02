function isObject(obj: unknown) {
  return `${obj}` === '[object Object]'
}

/**
 * transform an object's keys to dot-notation style strings
 * @param obj deeply-nested object to transform
 * @param prefix optional prefix for returned keys
 */
export function transform(
  obj: Record<string, unknown>,
  prefix?: string
): string[] {
  const result: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    // type check each value
    if (Array.isArray(value)) {
      // if children are object
      if (value.some((v) => isObject(v))) {
        result.push(...value.map((v, i) => transform(v, `${key}.${i}`)).flat())
        continue
      }
    } else if (isObject(value)) {
      // @ts-expect-error need to assert value as an obj
      result.push(...transform(value, key))
      continue
    }

    result.push(key)
  }
  return result.map((key) => (prefix ? `${prefix}.${key}` : key))
}
