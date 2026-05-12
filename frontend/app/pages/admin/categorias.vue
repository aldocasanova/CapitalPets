<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="font-display text-2xl font-bold text-white">Categorías</h1>
        <button @click="showForm = true; editing = null; form.name = ''; form.slug = ''" class="btn-accent btn-sm">➕ Nueva Categoría</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="cat in categories" :key="cat.id" class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-white text-lg">{{ cat.name }}</h3>
            <span class="badge-primary">{{ cat._count?.products || 0 }} productos</span>
          </div>
          <p class="text-dark-400 text-sm mb-4">Slug: {{ cat.slug }}</p>
          <div class="flex gap-2">
            <button @click="editing = cat; form.name = cat.name; form.slug = cat.slug; showForm = true" class="text-primary-400 hover:text-primary-300 text-xs">✏️ Editar</button>
            <button @click="deleteCategory(cat.id)" class="text-red-400 hover:text-red-300 text-xs">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="showForm = false">
          <div class="bg-dark-800 rounded-2xl border border-dark-700 p-6 w-full max-w-md animate-fade-in-up">
            <h2 class="font-display text-xl font-bold text-white mb-6">{{ editing ? 'Editar' : 'Nueva' }} Categoría</h2>
            <form @submit.prevent="saveCategory" class="space-y-4">
              <div>
                <label class="block text-sm text-dark-300 mb-1">Nombre *</label>
                <input v-model="form.name" class="input-dark" required @input="autoSlug" />
              </div>
              <div>
                <label class="block text-sm text-dark-300 mb-1">Slug *</label>
                <input v-model="form.slug" class="input-dark" required />
              </div>
              <div class="flex gap-3 pt-2">
                <button type="submit" class="btn-accent flex-1">Guardar</button>
                <button type="button" @click="showForm = false" class="btn-ghost text-dark-300">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useHead({ title: 'Categorías | Capital Pets Admin' });
const api = useApi();
const categories = ref<any[]>([]);
const showForm = ref(false);
const editing = ref<any>(null);
const form = reactive({ name: '', slug: '' });
const autoSlug = () => { if (!editing.value) form.slug = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); };
const loadData = async () => { try { categories.value = await api.get<any[]>('/categories'); } catch {} };
const saveCategory = async () => {
  try {
    if (editing.value) { await api.put(`/categories/${editing.value.id}`, form); }
    else { await api.post('/categories', form); }
    showForm.value = false; await loadData();
  } catch (e: any) { alert(e.message); }
};
const deleteCategory = async (id: number) => {
  if (!confirm('¿Eliminar esta categoría?')) return;
  try { await api.del(`/categories/${id}`); await loadData(); } catch (e: any) { alert(e.message); }
};
onMounted(loadData);
</script>
