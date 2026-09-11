const configuredBase = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

function withApiPrefix(value) {
  if (value.endsWith("/api/v1")) return value;
  if (value.endsWith("/api")) return `${value}/v1`;
  return `${value}/api/v1`;
}

export const API_BASE = withApiPrefix(configuredBase);
export const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || "newcomers";

export class ApiClientError extends Error {
  constructor(message, { status, code, requestId } = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

export async function api(path, init = {}, token) {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);
  const isFormData = init.body instanceof FormData;
  const headers = {
    Accept: "application/json",
    "X-Site-Slug": SITE_SLUG,
    ...(!isFormData && init.body ? { "Content-Type": "application/json" } : {}),
    ...init.headers,
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      ...init,
      headers,
      signal: init.signal || controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json().catch(() => null)
      : await response.text().catch(() => "");

    if (!response.ok) {
      const details = payload?.error || payload || {};
      throw new ApiClientError(
        details.message || (typeof payload === "string" && payload) || "The request could not be completed.",
        {
          status: response.status,
          code: details.code,
          requestId: details.requestId || response.headers.get("x-request-id"),
        },
      );
    }

    return response.status === 204 ? null : payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new ApiClientError("The server took too long to respond. Please try again.", {
        code: "REQUEST_TIMEOUT",
      });
    }
    if (error instanceof ApiClientError) throw error;
    throw new ApiClientError("Unable to reach the server. Check your connection and try again.", {
      code: "NETWORK_ERROR",
    });
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function uploadResumeObject(file, userId, token) {
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !anonKey) {
    throw new ApiClientError(
      "Resume upload is not configured. Add the public Supabase URL and anon key to the frontend environment.",
      { code: "RESUME_UPLOAD_NOT_CONFIGURED" },
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-160);
  const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/resumes/${path.split("/").map(encodeURIComponent).join("/")}`,
    {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
        "x-upsert": "false",
      },
      body: file,
    },
  );

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new ApiClientError(payload?.message || payload?.error || "Resume upload failed.", {
      status: response.status,
      code: "RESUME_STORAGE_UPLOAD_FAILED",
    });
  }

  return path;
}
