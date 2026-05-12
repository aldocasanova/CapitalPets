<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="font-display text-2xl font-bold text-white">Ventas</h1>
        <button @click="showForm = true" class="btn-accent btn-sm">➕ Nueva Venta</button>
      </div>
      <div class="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-dark-700/50">
                <th class="text-left p-4 text-dark-400 font-medium">Fecha</th>
                <th class="text-left p-4 text-dark-400 font-medium">Productos</th>
                <th class="text-left p-4 text-dark-400 font-medium">Tipo</th>
                <th class="text-left p-4 text-dark-400 font-medium">Estado</th>
                <th class="text-right p-4 text-dark-400 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in sales" :key="sale.id" class="border-b border-dark-700/30 hover:bg-dark-700/30">
                <td class="p-4 text-white">{{ new Date(sale.date).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' }) }}</td>
                <td class="p-4 text-dark-300 text-xs">{{ sale.items?.map((i: any) => `${i.quantity}x ${i.product?.name}`).join(', ') }}</td>
                <td class="p-4"><span :class="sale.type === 'MANUAL' ? 'badge-primary' : 'badge-accent'">{{ sale.type }}</span></td>
                <td class="p-4"><span class="badge-accent">{{ sale.status }}</span></td>
                <td class="p-4 text-right text-accent-400 font-bold">Bs. {{ Number(sale.total).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!sales.length" class="text-center py-12 text-dark-400">No hay ventas registradas</div>
      </div>

      <!-- New Sale Modal -->
      <Teleport to="body">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="showForm = false">
          <div class="bg-dark-800 rounded-2xl border border-dark-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <h2 class="font-display text-xl font-bold text-white mb-6">Registrar Venta</h2>
            <form @submit.prevent="createSale" class="space-y-4">
              <div>
                <label class="block text-sm text-dark-300 mb-1">Tipo</label>
                <select v-model="saleForm.type" class="input-dark">
                  <option value="MANUAL">Manual</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>
              <div v-for="(item, idx) in saleForm.items" :key="idx" class="flex gap-2 items-end">
                <div class="flex-1">
                  <label v-if="idx === 0" class="block text-sm text-dark-300 mb-1">Producto</label>
                  <select v-model="item.productId" class="input-dark" required>
                    <option value="">Seleccionar...</option>
                    <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} (Stock: {{ p.stock }})</option>
                  </select>
                </div>
                <div class="w-24">
                  <label v-if="idx === 0" class="block text-sm text-dark-300 mb-1">Cant.</label>
                  <input v-model.number="item.quantity" type="number" min="1" class="input-dark" required />
                </div>
                <button v-if="saleForm.items.length > 1" type="button" @click="saleForm.items.splice(idx, 1)" class="text-red-400 pb-3">✕</button>
              </div>
              <button type="button" @click="saleForm.items.push({ productId: '', quantity: 1 })" class="text-primary-400 text-sm hover:text-primary-300">+ Agregar producto</button>
              <div class="flex gap-3 pt-2">
                <button type="submit" class="btn-accent flex-1" :disabled="saving">{{ saving ? 'Guardando...' : 'Registrar Venta' }}</button>
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
useHead({ title: 'Ventas | Capital Pets Admin' });
const api = useApi();
const sales = ref<any[]>([]);
const products = ref<any[]>([]);
const showForm = ref(false);
const saving = ref(false);
const saleForm = reactive({ type: 'MANUAL' as 'MANUAL' | 'ONLINE', items: [{ productId: '', quantity: 1 }] });
const loadData = async () => {
  try { const [s, p] = await Promise.all([api.get<any[]>('/sales'), api.get<any[]>('/products')]); sales.value = s; products.value = p; } catch {}
};
const createSale = async () => {
  saving.value = true;
  try {
    await api.post('/sales', saleForm);
    showForm.value = false;
    saleForm.items = [{ productId: '', quantity: 1 }];
    await loadData();
  } catch (e: any) { alert(e.message); }
  finally { saving.value = false; }
};
onMounted(loadData);
</script>
