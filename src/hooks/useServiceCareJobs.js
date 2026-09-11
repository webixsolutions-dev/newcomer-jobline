// src/hooks/useServiceCareJobs.js
import { useEffect, useState } from "react";
import { getPublicJobs, getServiceCareCategories, normalizeJob } from "../lib/jobs";

export function useServiceCareJobs(query = {}) {
  const [rawJobs, setRawJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stringify query to trigger rerun on change
  const queryStr = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const parsedQuery = JSON.parse(queryStr);

    Promise.all([
      getPublicJobs(parsedQuery),
      getServiceCareCategories()
    ])
      .then(([jobsData, catsData]) => {
        if (active) {
          setRawJobs(jobsData?.items || []);
          setCategories(catsData || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load jobs");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [queryStr]);

  const jobs = rawJobs.map((job) => normalizeJob(job, categories));

  return { jobs, rawJobs, categories, loading, error };
}
