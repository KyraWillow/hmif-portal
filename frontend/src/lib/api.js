const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function buildHeaders(token, extraHeaders = {}) {
  const headers = { ...extraHeaders };

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["X-Admin-Token"] = token;
  }

  return headers;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

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
    headers: buildHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
}

export { API_BASE_URL };
