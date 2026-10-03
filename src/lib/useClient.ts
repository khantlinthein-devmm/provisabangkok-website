import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during server rendering and hydration, true afterwards. For values that depend on the visitor's browser. */
export function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}
