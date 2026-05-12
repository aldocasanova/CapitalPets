<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <h1 class="font-display text-2xl font-bold text-white">Dashboard</h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <p class="text-dark-400 text-sm mb-1">Ventas Totales</p>
          <p class="font-display text-3xl font-bold text-white">{{ stats.totalSales }}</p>
        </div>
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <p class="text-dark-400 text-sm mb-1">Ingresos</p>
          <p class="font-display text-3xl font-bold text-accent-400">Bs. {{ Number(stats.totalRevenue).toFixed(2) }}</p>
        </div>
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <p class="text-dark-400 text-sm mb-1">Productos</p>
          <p class="font-display text-3xl font-bold text-primary-400">{{ productCount }}</p>
        </div>
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <p class="text-dark-400 text-sm mb-1">Stock Bajo</p>
          <p class="font-display text-3xl font-bold text-amber-400">{{ stats.lowStockProducts?.length || 0 }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Sales -->
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <h2 class="font-display text-lg font-semibold text-white mb-4">Ventas Recientes</h2>
          <div v-if="stats.recentSales?.length" class="space-y-3">
            <div v-for="sale in stats.recentSales.slice(0, 5)" :key="sale.id" class="flex items-center justify-between p-3 rounded-xl bg-dark-700/50">
              <div>
                <p class="text-white text-sm font-medium">{{ sale.items?.map((i: any) => i.product?.name).join(', ') }}</p>
                <p class="text-dark-400 text-xs">{{ new Date(sale.date).toLocaleDateString('es') }} · {{ sale.type }}</p>
              </div>
              <span class="font-display font-bold text-accent-400">Bs. {{ Number(sale.total).toFixed(2) }}</span>
            </div>
          </div>
          <p v-else class="text-dark-400 text-sm text-center py-8">No hay ventas registradas</p>
        </div>

        <!-- Low Stock Alert -->
        <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <h2 class="font-display text-lg font-semibold text-white mb-4">⚠️ Alerta de Stock</h2>
          <div v-if="stats.lowStockProducts?.length" class="space-y-3">
            <div v-for="product in stats.lowStockProducts" :key="product.id" class="flex items-center justify-between p-3 rounded-xl bg-dark-700/50">
              <div class="flex items-center gap-3">
                <img :src="product.imageUrl || 'https://placehold.co/40x40/3D5192/white?text=P'" class="w-10 h-10 rounded-lg object-cover" />
                <span class="text-white text-sm">{{ product.name }}</span>
              </div>
              <span :class="product.stock === 0 ? 'badge-danger' : 'badge-warning'">
                {{ product.stock === 0 ? 'Agotado' : `${product.stock} uds` }}
              </span>
            </div>
          </div>
          <p v-else class="text-dark-400 text-sm text-center py-8">✅ Todo el inventario está bien</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useHead({ title: 'Dashboard | Capital Pets Admin' });

const api = useApi();
const stats = ref<any>({ totalSales: 0, totalRevenue: 0, recentSales: [], lowStockProducts: [] });
const productCount = ref(0);

onMounted(async () => {
  try {
    const [dashData, products] = await Promise.all([
      api.get<any>('/sales/dashboard'),
      api.get<any[]>('/products'),
    ]);
    stats.value = dashData;
    productCount.value = products.length;
  } catch { /* API not available */ }
});
</script>
