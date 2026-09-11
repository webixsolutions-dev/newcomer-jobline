import { getRecommendedJobs, getSeekerDashboard } from "../../lib/jobs";
import { readSession } from "../../lib/auth/session";
import { normalizeJob } from "../../lib/jobs";
import { useAsync } from "./useAsync";

export function useSeekerDashboard({ recommendations = false } = {}) {
  return useAsync(async () => {
    const token = readSession()?.access_token;
    if (!token) throw new Error("Your session has expired. Please sign in again.");
    const [dashboard, recommended] = await Promise.all([
      getSeekerDashboard(token),
      recommendations ? getRecommendedJobs(token, 6) : Promise.resolve({ items: [] }),
    ]);
    return {
      ...dashboard,
      recommended: (recommended?.items || []).map((job) => normalizeJob(job)),
    };
  }, { deps: [recommendations] });
}
