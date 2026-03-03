const BASE_URL = "https://fakestoreapi.com";

const request = async (path, method, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const data = await response.json();
  return { data };
};

const api = {
  post: (path, body) => request(path, "POST", body),
  put: (path, body) => request(path, "PUT", body),
};

export default api;
