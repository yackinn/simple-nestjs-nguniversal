export function toBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export function isNil(v: any) {
  return v === null || v === undefined;
}

export function hasDefinedProperties(data: Record<any, any>): boolean {
  return !!Object.values(data).filter((property) => !isNil(property)).length;
}

export function objectSpread<T>(value: T): T {
  return value || ({} as T);
}

export function arraySpread<T>(array: T[]): T[] {
  return array || [];
}

export function isArray<T>(value: Array<T> | any): value is Array<T> {
  return Array.isArray(value);
}

export function isFunction<T extends Function>(value: any): value is T {
  return typeof value === 'function';
}
