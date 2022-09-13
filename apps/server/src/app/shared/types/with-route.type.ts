export interface Route {
  route?: string;
}

export type WithRoute<T> = T & Route;
