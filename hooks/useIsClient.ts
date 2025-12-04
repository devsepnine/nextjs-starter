import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * SSR-safe hook to check if running on the client.
 * Uses useSyncExternalStore to avoid hydration mismatch.
 *
 * @returns true on a client, false on server
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
