// src/hooks/useServiceCareCategories.js
import { useEffect, useState } from "react";
import { getServiceCareCategories } from "../lib/jobs";

export function useServiceCareCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    getServiceCareCategories()
      .then((data) => {
        if (active) {
          setCategories(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load categories");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
