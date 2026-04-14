function resolveDefaultApiBaseURL() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:8080/api";
    }
  }

  return "/api";
}

function normalizeBaseUrl(value) {
  if (!value) return "";
  return value.replace(/\/+$/, "");
}

const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || resolveDefaultApiBaseURL()
);

function buildHeaders(token, { extraHeaders = {}, hasBody = false } = {}) {
  const headers = { ...extraHeaders };

  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["X-Admin-Token"] = token;
  }

  return headers;
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error("Tidak dapat terhubung ke server.");
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Permintaan ke server gagal.");
  }

  return data;
}

export function getJSON(path) {
  return request(path, { method: "GET" });
}

export function sendJSON(path, { method = "POST", body, token } = {}) {
  return request(path, {
    method,
    headers: buildHeaders(token, { hasBody: Boolean(body) }),
    body: body ? JSON.stringify(body) : undefined,
  });
}

export { API_BASE_URL };
