<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="font-display text-2xl font-bold text-white">Productos</h1>
        <button @click="showForm = true; editingProduct = null; resetForm()" class="btn-accent btn-sm" id="admin-add-product">
          ➕ Nuevo Producto
        </button>
      </div>

      <!-- Products Table -->
      <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-dark-700/50">
                <th class="text-left p-4 text-dark-400 font-medium">Producto</th>
                <th class="text-left p-4 text-dark-400 font-medium">Categoría</th>
                <th class="text-right p-4 text-dark-400 font-medium">Precio</th>
                <th class="text-right p-4 text-dark-400 font-medium">Stock</th>
                <th class="text-right p-4 text-dark-400 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="border-b border-dark-700/30 hover:bg-dark-700/30 transition-colors">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img :src="product.imageUrl || 'https://placehold.co/40/3D5192/white?text=P'" class="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p class="text-white font-medium">{{ product.name }}</p>
                      <p class="text-dark-400 text-xs line-clamp-1">{{ product.description }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4"><span class="badge-primary">{{ product.category?.name }}</span></td>
                <td class="p-4 text-right text-accent-400 font-semibold">Bs. {{ Number(product.price).toFixed(2) }}</td>
                <td class="p-4 text-right">
                  <span :class="product.stock > 5 ? 'text-accent-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'" class="font-semibold">{{ product.stock }}</span>
                </td>
                <td class="p-4 text-right space-x-2">
                  <button @click="editProduct(product)" class="text-primary-400 hover:text-primary-300 text-xs">✏️ Editar</button>
                  <button @click="deleteProduct(product.id)" class="text-red-400 hover:text-red-300 text-xs">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!products.length" class="text-center py-12 text-dark-400">No hay productos registrados</div>
      </div>

      <!-- Product Form Modal -->
      <Teleport to="body">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="showForm = false">
          <div class="bg-dark-800 rounded-2xl border border-dark-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <h2 class="font-display text-xl font-bold text-white mb-6">{{ editingProduct ? 'Editar' : 'Nuevo' }} Producto</h2>
            <form @submit.prevent="saveProduct" class="space-y-4">
              <div>
                <label class="block text-sm text-dark-300 mb-1">Nombre *</label>
                <input v-model="form.name" class="input-dark" required />
              </div>
              <div>
                <label class="block text-sm text-dark-300 mb-1">Descripción</label>
                <textarea v-model="form.description" class="input-dark" rows="3"></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-dark-300 mb-1">Precio (Bs.) *</label>
                  <input v-model="form.price" type="number" step="0.01" min="0" class="input-dark" required />
                </div>
                <div>
                  <label class="block text-sm text-dark-300 mb-1">Stock *</label>
                  <input v-model="form.stock" type="number" min="0" class="input-dark" required />
                </div>
              </div>
              <div>
                <label class="block text-sm text-dark-300 mb-1">Categoría *</label>
                <select v-model="form.categoryId" class="input-dark" required>
                  <option value="">Seleccionar...</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-dark-300 mb-1">Imagen</label>
                <input type="file" accept="image/*" @change="onFileChange" class="input-dark text-sm" />
              </div>
              <div class="flex gap-3 pt-2">
                <button type="submit" class="btn-accent flex-1" :disabled="saving">{{ saving ? 'Guardando...' : 'Guardar' }}</button>
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
useHead({ title: 'Productos | Capital Pets Admin' });

const api = useApi();
const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const showForm = ref(false);
const editingProduct = ref<any>(null);
const saving = ref(false);
const imageFile = ref<File | null>(null);

const form = reactive({ name: '', description: '', price: '', stock: '', categoryId: '' });

const resetForm = () => {
  form.name = ''; form.description = ''; form.price = ''; form.stock = ''; form.categoryId = '';
  imageFile.value = null;
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) imageFile.value = file;
};

const editProduct = (product: any) => {
  editingProduct.value = product;
  form.name = product.name;
  form.description = product.description || '';
  form.price = product.price;
  form.stock = product.stock;
  form.categoryId = product.categoryId;
  showForm.value = true;
};

const saveProduct = async () => {
  saving.value = true;
  try {
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('stock', form.stock);
    fd.append('categoryId', form.categoryId);
    if (imageFile.value) fd.append('image', imageFile.value);

    if (editingProduct.value) {
      await api.putForm(`/products/${editingProduct.value.id}`, fd);
    } else {
      await api.postForm('/products', fd);
    }
    showForm.value = false;
    await loadData();
  } catch (e: any) {
    alert(e.message);
  } finally {
    saving.value = false;
  }
};

const deleteProduct = async (id: string) => {
  if (!confirm('¿Eliminar este producto?')) return;
  try {
    await api.del(`/products/${id}`);
    await loadData();
  } catch (e: any) { alert(e.message); }
};

const loadData = async () => {
  try {
    const [p, c] = await Promise.all([api.get<any[]>('/products?isActive=true'), api.get<any[]>('/categories')]);
    products.value = p; categories.value = c;
  } catch { /* */ }
};

onMounted(loadData);
</script>
