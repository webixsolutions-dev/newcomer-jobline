import { useCallback, useEffect, useState } from "react";

export function useAsync(getData, opts = {}) {
  const { deps = [] } = opts;
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  const run = useCallback(async () => {
    setState({ status: "loading", data: null, error: null });
    try {
      const data = await getData();
      setState({ status: "success", data, error: null });
      return data;
    } catch (error) {
      setState({ status: "error", data: null, error: error.message || "Something went wrong loading this data." });
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, retry: run };
}
