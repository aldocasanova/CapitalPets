<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-dark-100 shadow-sm">
      <div class="container-app">
        <nav class="flex items-center justify-between h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group" id="nav-logo">
            <img src="/logo.jpg" alt="Capital Pets" class="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300" />
            <div class="hidden sm:block">
              <h1 class="font-display font-bold text-xl text-primary-500 leading-tight">Capital Pets</h1>
              <p class="text-[10px] text-dark-400 tracking-wider uppercase">Alimento, Ropa & Accesorios</p>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-4 py-2 rounded-lg text-sm font-medium text-dark-500 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200"
              active-class="!text-primary-600 !bg-primary-50"
              :id="`nav-${link.id}`"
            >
              <span class="flex items-center gap-2">
                <span v-html="link.icon"></span>
                {{ link.label }}
              </span>
            </NuxtLink>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <template v-if="isLoggedIn">
              <NuxtLink
                v-if="isAdmin"
                to="/admin"
                class="btn-primary btn-sm"
                id="nav-admin-btn"
              >
                🛠️ Panel Admin
              </NuxtLink>
              <button @click="logout" class="btn-ghost btn-sm" id="nav-logout-btn">
                Salir
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="btn-outline btn-sm" id="nav-login-btn">
                Iniciar Sesión
              </NuxtLink>
            </template>

            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
              id="nav-mobile-toggle"
            >
              <svg class="w-6 h-6 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-dark-100 bg-white pb-4">
          <div class="container-app pt-4 flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 rounded-lg text-sm font-medium text-dark-600 hover:text-primary-500 hover:bg-primary-50 transition-all"
              active-class="!text-primary-600 !bg-primary-50"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-800 text-white py-12 mt-auto">
      <div class="container-app">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Capital Pets" class="w-10 h-10 rounded-full" />
              <span class="font-display font-bold text-lg">Capital Pets</span>
            </div>
            <p class="text-dark-300 text-sm leading-relaxed">
              Tu tienda de confianza para todo lo que tu mascota necesita. Alimento premium, accesorios, ropa y repostería artesanal.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="font-display font-semibold text-sm uppercase tracking-wider text-dark-300 mb-4">Navegación</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-dark-400 hover:text-accent-400 text-sm transition-colors">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-display font-semibold text-sm uppercase tracking-wider text-dark-300 mb-4">Contacto</h3>
            <div class="space-y-2 text-sm text-dark-400">
              <p>📍 Sucre, Bolivia</p>
              <p>📞 +591 70000000</p>
              <p>📧 info@capitalpets.com</p>
            </div>
          </div>
        </div>

        <div class="border-t border-dark-700 mt-8 pt-8 text-center">
          <p class="text-dark-500 text-xs">&copy; {{ new Date().getFullYear() }} Capital Pets. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, isAdmin, logout } = useAuth();
const mobileMenuOpen = ref(false);

const navLinks = [
  { to: '/', label: 'Inicio', id: 'home', icon: '🏠' },
  { to: '/catalogo', label: 'Catálogo', id: 'catalog', icon: '🛍️' },
  { to: '/nosotros', label: 'Nosotros', id: 'about', icon: '🐾' },
];
</script>
