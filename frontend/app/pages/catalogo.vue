<template>
  <NuxtLayout name="default">
    <div class="bg-dark-50 min-h-screen">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12">
        <div class="container-app">
          <h1 class="font-display text-3xl md:text-4xl font-bold mb-2">Catálogo de Productos</h1>
          <p class="text-primary-100">Encuentra todo lo que tu mascota necesita 🐾</p>
        </div>
      </div>

      <div class="container-app py-8">
        <!-- Filters -->
        <div class="card p-4 mb-8" id="catalog-filters">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1 relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar productos..."
                class="input pl-12"
                id="catalog-search"
              />
            </div>

            <!-- Category filter -->
            <select v-model="selectedCategory" class="input md:w-48" id="catalog-category-filter">
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="card p-4 animate-pulse">
            <div class="w-full h-52 bg-dark-100 rounded-xl mb-4"></div>
            <div class="h-4 bg-dark-100 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-dark-100 rounded w-1/2 mb-4"></div>
            <div class="h-4 bg-dark-100 rounded w-1/3"></div>
          </div>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="font-display text-xl font-semibold text-dark-700 mb-2">No se encontraron productos</h3>
          <p class="text-dark-400 mb-4">Intenta cambiar los filtros de búsqueda</p>
          <button @click="clearFilters" class="btn-primary btn-sm">Limpiar filtros</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="card-hover group animate-fade-in"
          >
            <div class="relative overflow-hidden">
              <img
                :src="product.imageUrl || 'https://placehold.co/400x400/3D5192/white?text=Capital+Pets'"
                :alt="product.name"
                class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3">
                <span class="badge-primary">
                  {{ product.category?.name }}
                </span>
              </div>
              <div v-if="product.stock <= 5 && product.stock > 0" class="absolute top-3 right-3">
                <span class="badge-warning">¡Últimos!</span>
              </div>
              <div v-if="product.stock === 0" class="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
                <span class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">Agotado</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-dark-800 mb-1 group-hover:text-primary-500 transition-colors line-clamp-1">
                {{ product.name }}
              </h3>
              <p class="text-dark-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-display font-bold text-xl text-primary-500">
                  Bs. {{ Number(product.price).toFixed(2) }}
                </span>
                <span class="text-dark-300 text-xs">
                  Stock: {{ product.stock }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Catálogo | Capital Pets',
  meta: [{ name: 'description', content: 'Explora nuestro catálogo completo de alimento, accesorios, ropa y más para mascotas.' }],
});

const api = useApi();
const route = useRoute();

const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');

const filteredProducts = computed(() => {
  let result = products.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.categoryId === parseInt(selectedCategory.value));
  }

  return result;
});

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};

onMounted(async () => {
  try {
    const [productsData, categoriesData] = await Promise.all([
      api.get<any[]>('/products'),
      api.get<any[]>('/categories'),
    ]);
    products.value = productsData;
    categories.value = categoriesData;

    // Check URL query for category filter
    if (route.query.categoria) {
      const cat = categoriesData.find((c: any) => c.slug === route.query.categoria);
      if (cat) selectedCategory.value = cat.id.toString();
    }
  } catch {
    products.value = [];
    categories.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
