// Composable for API calls to the Capital Pets backend
export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const getToken = (): string | null => {
    if (import.meta.server) return null;
    return localStorage.getItem('cp_token');
  };

  const setToken = (token: string) => {
    localStorage.setItem('cp_token', token);
  };

  const removeToken = () => {
    localStorage.removeItem('cp_token');
  };

  const headers = (): Record<string, string> => {
    const token = getToken();
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  };

  const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${apiBase}${endpoint}`, {
      ...options,
      headers: {
        ...headers(),
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Error de conexión' }));
      throw new Error(error.error || `Error ${res.status}`);
    }

    return res.json();
  };

  const get = <T>(endpoint: string) => request<T>(endpoint);

  const post = <T>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });

  const postForm = async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = getToken();
    const h: Record<string, string> = {};
    if (token) h['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${apiBase}${endpoint}`, {
      method: 'POST',
      headers: h,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Error de conexión' }));
      throw new Error(error.error || `Error ${res.status}`);
    }

    return res.json();
  };

  const put = <T>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });

  const putForm = async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = getToken();
    const h: Record<string, string> = {};
    if (token) h['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${apiBase}${endpoint}`, {
      method: 'PUT',
      headers: h,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Error de conexión' }));
      throw new Error(error.error || `Error ${res.status}`);
    }

    return res.json();
  };

  const del = <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' });

  return { get, post, postForm, put, putForm, del, getToken, setToken, removeToken };
};
