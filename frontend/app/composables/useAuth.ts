// Auth composable for managing user authentication state
interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'CUSTOMER';
}

export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null);
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const api = useApi();

  const login = async (email: string, password: string) => {
    const data = await api.post<{ user: User; token: string }>('/auth/login', { email, password });
    user.value = data.user;
    api.setToken(data.token);
    return data;
  };

  const register = async (email: string, password: string, name?: string) => {
    const data = await api.post<{ user: User; token: string }>('/auth/register', { email, password, name });
    user.value = data.user;
    api.setToken(data.token);
    return data;
  };

  const logout = () => {
    user.value = null;
    api.removeToken();
    navigateTo('/');
  };

  const fetchProfile = async () => {
    try {
      const token = api.getToken();
      if (!token) return;
      const data = await api.get<User>('/auth/profile');
      user.value = data;
    } catch {
      api.removeToken();
      user.value = null;
    }
  };

  return { user, isLoggedIn, isAdmin, login, register, logout, fetchProfile };
};
