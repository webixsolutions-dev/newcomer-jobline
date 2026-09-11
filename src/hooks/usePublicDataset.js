import { useEffect, useState } from "react";
import { getPublicDataset } from "../lib/jobs";

let cachedDataset = null;
let datasetRequest = null;

function loadDataset() {
  if (cachedDataset) return Promise.resolve(cachedDataset);
  if (!datasetRequest) {
    datasetRequest = getPublicDataset()
      .then((data) => {
        cachedDataset = data;
        return data;
      })
      .finally(() => {
        datasetRequest = null;
      });
  }
  return datasetRequest;
}

export function usePublicDataset() {
  const [dataset, setDataset] = useState(cachedDataset);
  const [loading, setLoading] = useState(!cachedDataset);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    loadDataset()
      .then((data) => {
        if (active) setDataset(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Public data could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { dataset, loading, error };
}
