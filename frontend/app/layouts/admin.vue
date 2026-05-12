<template>
  <div class="min-h-screen flex bg-dark-900" style="background-image: url('/admin-bg.png'); background-size: cover; background-position: center; background-attachment: fixed;">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-dark-950/95 backdrop-blur-xl border-r border-dark-700/50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-dark-700/50">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/logo.jpg" alt="Capital Pets" class="w-10 h-10 rounded-full shadow-lg group-hover:scale-105 transition-transform" />
          <div>
            <h1 class="font-display font-bold text-white text-lg">Capital Pets</h1>
            <p class="text-[10px] text-primary-400 uppercase tracking-widest">Panel Admin</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="link in adminLinks"
          :key="link.to"
          :to="link.to"
          @click="sidebarOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
            $route.path === link.to
              ? 'bg-primary-500/20 text-primary-400 shadow-lg shadow-primary-500/10'
              : 'text-dark-300 hover:bg-dark-700/50 hover:text-white'
          ]"
          :id="`admin-nav-${link.id}`"
        >
          <span class="text-lg">{{ link.icon }}</span>
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- User info -->
      <div class="p-4 border-t border-dark-700/50">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center text-primary-400 text-sm font-bold">
            {{ user?.name?.charAt(0) || 'A' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">{{ user?.name || 'Admin' }}</p>
            <p class="text-dark-400 text-xs truncate">{{ user?.email }}</p>
          </div>
        </div>
        <button @click="logout" class="w-full mt-2 px-4 py-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 text-sm transition-all text-left" id="admin-logout-btn">
          🚪 Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
    ></div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top bar -->
      <header class="sticky top-0 z-20 bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50 px-4 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-lg text-dark-300 hover:bg-dark-700 transition-colors"
            id="admin-sidebar-toggle"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="flex items-center gap-3 ml-auto">
            <NuxtLink to="/" class="text-dark-400 hover:text-white text-sm transition-colors">
              🌐 Ver Tienda
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth();
const sidebarOpen = ref(false);

const adminLinks = [
  { to: '/admin', label: 'Dashboard', id: 'dashboard', icon: '📊' },
  { to: '/admin/productos', label: 'Productos', id: 'products', icon: '📦' },
  { to: '/admin/categorias', label: 'Categorías', id: 'categories', icon: '📂' },
  { to: '/admin/ventas', label: 'Ventas', id: 'sales', icon: '💰' },
];
</script>
