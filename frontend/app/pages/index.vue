<template>
  <NuxtLayout name="default">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <img src="/pattern-paws.svg" alt="" class="w-full h-full object-cover" />
      </div>

      <div class="container-app relative z-10 py-20 md:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in-up">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <span class="animate-bounce-subtle">🐾</span>
              <span>Bienvenido a Capital Pets</span>
            </div>

            <h1 class="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Todo lo que tu
              <span class="relative">
                <span class="relative z-10">mascota</span>
                <span class="absolute bottom-1 left-0 w-full h-3 bg-accent-500/40 rounded-full"></span>
              </span>
              necesita 🐶🐱
            </h1>

            <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-lg leading-relaxed">
              Alimento premium, accesorios únicos, ropa adorable y repostería artesanal para consentir a tu compañero peludo.
            </p>

            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/catalogo" class="btn bg-accent-500 text-white hover:bg-accent-600 hover:shadow-lg hover:-translate-y-0.5 btn-lg" id="hero-cta-catalog">
                🛍️ Ver Catálogo
              </NuxtLink>
              <NuxtLink to="/nosotros" class="btn bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 btn-lg border border-white/20" id="hero-cta-about">
                Conócenos →
              </NuxtLink>
            </div>
          </div>

          <div class="hidden lg:flex justify-center">
            <div class="relative">
              <div class="w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
                <img src="/logo.jpg" alt="Capital Pets Logo" class="w-64 h-64 rounded-full object-cover shadow-2xl" />
              </div>
              <!-- Decorative circles -->
              <div class="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent-500/30 animate-bounce-subtle"></div>
              <div class="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-yellow-400/30 animate-bounce-subtle" style="animation-delay: 0.5s;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section bg-white" id="section-categories">
      <div class="container-app">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-dark-800 mb-4">
            Explora nuestras <span class="text-gradient">categorías</span>
          </h2>
          <p class="text-dark-400 max-w-lg mx-auto">
            Encuentra exactamente lo que necesitas para tu mascota
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/catalogo?categoria=${cat.slug}`"
            class="card-hover group p-6 text-center"
            :id="`cat-${cat.slug}`"
          >
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {{ cat.emoji }}
            </div>
            <h3 class="font-semibold text-dark-700 text-sm">{{ cat.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section bg-dark-50" id="section-featured">
      <div class="container-app">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="font-display text-3xl md:text-4xl font-bold text-dark-800 mb-2">
              Productos <span class="text-gradient">destacados</span>
            </h2>
            <p class="text-dark-400">Los favoritos de nuestros clientes</p>
          </div>
          <NuxtLink to="/catalogo" class="btn-outline btn-sm hidden md:inline-flex">
            Ver todos →
          </NuxtLink>
        </div>

        <div v-if="loadingProducts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="card p-4 animate-pulse">
            <div class="w-full h-48 bg-dark-100 rounded-xl mb-4"></div>
            <div class="h-4 bg-dark-100 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-dark-100 rounded w-1/2"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="card-hover group"
          >
            <div class="relative overflow-hidden">
              <img
                :src="product.imageUrl || 'https://placehold.co/400x400/3D5192/white?text=Capital+Pets'"
                :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 right-3">
                <span class="badge-accent">
                  {{ product.category?.name }}
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-dark-800 mb-1 group-hover:text-primary-500 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-dark-400 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-display font-bold text-xl text-primary-500">
                  Bs. {{ Number(product.price).toFixed(2) }}
                </span>
                <span :class="product.stock > 5 ? 'badge-accent' : 'badge-warning'" class="text-[10px]">
                  {{ product.stock > 5 ? 'En stock' : `Quedan ${product.stock}` }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8 md:hidden">
          <NuxtLink to="/catalogo" class="btn-primary">
            Ver todo el catálogo →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section bg-white" id="section-why-us">
      <div class="container-app">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-dark-800 mb-4">
            ¿Por qué <span class="text-gradient">elegirnos</span>?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center group">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300">
              {{ feature.icon }}
            </div>
            <h3 class="font-display font-semibold text-lg text-dark-800 mb-2">{{ feature.title }}</h3>
            <p class="text-dark-400 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-accent-500 to-accent-600 text-white py-16">
      <div class="absolute inset-0 opacity-10">
        <img src="/pattern-paws.svg" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="container-app relative z-10 text-center">
        <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">
          ¿Listo para consentir a tu mascota? 🐾
        </h2>
        <p class="text-accent-100 text-lg mb-8 max-w-lg mx-auto">
          Explora nuestro catálogo completo y encuentra los mejores productos para tu compañero fiel.
        </p>
        <NuxtLink to="/catalogo" class="btn bg-white text-accent-600 hover:bg-dark-50 hover:shadow-lg btn-lg font-bold" id="cta-catalog">
          Explorar Catálogo →
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Capital Pets | Alimento, Ropa & Accesorios para Mascotas',
  meta: [
    { name: 'description', content: 'Capital Pets - Tu tienda de confianza para alimento, ropa, accesorios y repostería para mascotas en Sucre, Bolivia.' },
  ],
});

const api = useApi();
const featuredProducts = ref<any[]>([]);
const loadingProducts = ref(true);

const categories = [
  { name: 'Comida', slug: 'comida', emoji: '🍖' },
  { name: 'Accesorios', slug: 'accesorios', emoji: '🦴' },
  { name: 'Postres', slug: 'postres', emoji: '🎂' },
  { name: 'Ropa', slug: 'ropa', emoji: '👕' },
  { name: 'Higiene', slug: 'higiene', emoji: '🧴' },
  { name: 'Juguetes', slug: 'juguetes', emoji: '🧸' },
];

const features = [
  { icon: '⭐', title: 'Calidad Premium', desc: 'Solo trabajamos con las mejores marcas y productos artesanales de alta calidad.' },
  { icon: '🚚', title: 'Entrega Rápida', desc: 'Entrega en toda la ciudad de Sucre. Tu pedido llega en tiempo récord.' },
  { icon: '💚', title: 'Amor por las Mascotas', desc: 'Cada producto es seleccionado con amor pensando en el bienestar de tu mascota.' },
];

onMounted(async () => {
  try {
    const products = await api.get<any[]>('/products');
    featuredProducts.value = products.slice(0, 4);
  } catch {
    // API may not be running, show empty state
    featuredProducts.value = [];
  } finally {
    loadingProducts.value = false;
  }
});
</script>
