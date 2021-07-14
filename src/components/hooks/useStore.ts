import React from "react";
// @ts-ignore
import storeJs from "store";

export interface Store {
  get(
    key: string,
    optionalDefaultValue?: any
  ): any;

  set(key: string, value: any): any;

  remove(key: string): void;

  setNamespace(namespace: string): void;
}

let NAMESPACE = "st_store";
const getStore = () =>
  storeJs.namespace(NAMESPACE);

const setNamespace: Store["setNamespace"] = (
  k
) => {
  NAMESPACE = k;
};
const set: Store["set"] = (k, v) =>
  getStore().set(k, v);
const get: Store["get"] = (k, o) =>
  getStore().get(k, o);
const remove: Store["remove"] = (k) =>
  getStore().remove(k);

const store = { set, get, remove, setNamespace };

export function useStore<T = any>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] =
    React.useState<T>(
      store.get(key, initialValue)
    );
  const setValue: React.Dispatch<
    React.SetStateAction<T>
  > = (value) => {
    const valueToStore =
      value instanceof Function
        ? value(storedValue)
        : value;
    store.set(key, valueToStore);
    setStoredValue(valueToStore);
  };
  return [storedValue, setValue];
}
