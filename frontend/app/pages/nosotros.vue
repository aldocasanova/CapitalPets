<template>
  <NuxtLayout name="default">
    <section class="section bg-white">
      <div class="container-app">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <img src="/logo.jpg" alt="Capital Pets" class="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl" />
          <h1 class="font-display text-4xl font-bold text-dark-800 mb-4">Sobre <span class="text-gradient">Capital Pets</span></h1>
          <p class="text-dark-400 text-lg leading-relaxed">
            Somos una tienda dedicada al bienestar y felicidad de tus mascotas. Ofrecemos alimento de calidad, accesorios únicos, ropa adorable y repostería artesanal elaborada con amor en Sucre, Bolivia.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="card-hover p-8 text-center">
            <div class="text-4xl mb-4">🏪</div>
            <h3 class="font-display font-semibold text-lg mb-2">Nuestra Tienda</h3>
            <p class="text-dark-400 text-sm">Ubicados en el corazón de Sucre, con un espacio diseñado para que tú y tu mascota se sientan como en casa.</p>
          </div>
          <div class="card-hover p-8 text-center">
            <div class="text-4xl mb-4">🎂</div>
            <h3 class="font-display font-semibold text-lg mb-2">Repostería Artesanal</h3>
            <p class="text-dark-400 text-sm">Gelatinas, queques y más, elaborados con ingredientes naturales especiales para mascotas.</p>
          </div>
          <div class="card-hover p-8 text-center">
            <div class="text-4xl mb-4">💚</div>
            <h3 class="font-display font-semibold text-lg mb-2">Compromiso</h3>
            <p class="text-dark-400 text-sm">Cada producto es seleccionado pensando en la salud y felicidad de tu compañero peludo.</p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({ title: 'Nosotros | Capital Pets', meta: [{ name: 'description', content: 'Conoce Capital Pets, tu tienda de mascotas en Sucre, Bolivia.' }] });
</script>
