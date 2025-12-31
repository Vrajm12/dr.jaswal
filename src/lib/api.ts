const API_BASE =
  import.meta.env.MODE === 'production'
    ? '' // Same domain in production (Vercel serverless)
    : 'http://localhost:3001';

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
}