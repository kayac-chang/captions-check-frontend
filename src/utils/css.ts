import { CSSProperties } from "react";

type ClampProps<T> = {
  min: T;
  value: T;
  max: T;
};
export function clamp<T>({ min, max, value }: ClampProps<T>) {
  return `clamp(${min}, ${value}, ${max})`;
}

export function calc<T>(value: T) {
  return `calc(${value})`;
}

export function css(obj: any): CSSProperties {
  return obj;
}
