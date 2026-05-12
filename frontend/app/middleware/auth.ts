export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn.value) {
    return navigateTo('/login');
  }

  if (to.path.startsWith('/admin') && !isAdmin.value) {
    return navigateTo('/');
  }
});
