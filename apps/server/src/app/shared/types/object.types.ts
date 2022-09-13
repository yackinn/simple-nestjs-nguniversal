export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type TypeOfKey<T, K extends keyof T> = T[K];

export type UnknownObject = Record<PropertyKey, unknown>;

export type AnyObject = Record<PropertyKey, any>;

export type ObjectOf<T> = { [P in keyof T]: T[P] };

export type EmptyObject = {
  [K in any]: never;
};

export type TypedDictionary<Entity extends Record<any, any>> = {
  [key in keyof Entity]: Entity[key];
};

