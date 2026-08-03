import { useEffect, useState, useCallback } from "react";

/**
 * Simulates an async fetch against the mock data layer so every list/table
 * can genuinely exercise loading, error, and success states (spec 6.1)
 * instead of just rendering static arrays.
 *
 * @param {() => any} getData - returns the mock data (sync is fine)
 * @param {{ delay?: number, failRate?: number, deps?: any[] }} [opts]
 */
export function useAsync(getData, opts = {}) {
  const { delay = 500, failRate = 0, deps = [] } = opts;
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  const run = useCallback(() => {
    setState({ status: "loading", data: null, error: null });
    const timer = setTimeout(() => {
      if (Math.random() < failRate) {
        setState({ status: "error", data: null, error: "Something went wrong loading this data." });
      } else {
        setState({ status: "success", data: getData(), error: null });
      }
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => run(), [run]);

  return { ...state, retry: run };
}
