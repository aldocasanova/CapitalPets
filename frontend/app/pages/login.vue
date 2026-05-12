<template>
  <NuxtLayout name="default">
    <div class="min-h-screen flex items-center justify-center py-12 px-4" style="background-image: url('/client-bg.png'); background-size: cover;">
      <div class="card-glass w-full max-w-md p-8 animate-fade-in-up">
        <div class="text-center mb-8">
          <img src="/logo.jpg" alt="Capital Pets" class="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg" />
          <h1 class="font-display text-2xl font-bold text-dark-800">{{ isRegister ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h1>
          <p class="text-dark-400 text-sm mt-1">{{ isRegister ? 'Únete a Capital Pets 🐾' : 'Bienvenido de nuevo 🐾' }}</p>
        </div>
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">⚠️ {{ errorMsg }}</div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="isRegister">
            <label class="block text-sm font-medium text-dark-600 mb-1">Nombre</label>
            <input v-model="form.name" type="text" class="input" placeholder="Tu nombre" id="login-name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-dark-600 mb-1">Correo</label>
            <input v-model="form.email" type="email" class="input" placeholder="tu@email.com" required id="login-email" />
          </div>
          <div>
            <label class="block text-sm font-medium text-dark-600 mb-1">Contraseña</label>
            <input v-model="form.password" type="password" class="input" placeholder="••••••••" required minlength="6" id="login-password" />
          </div>
          <button type="submit" class="btn-primary w-full btn-lg" :disabled="loading" id="login-submit">
            {{ loading ? 'Cargando...' : (isRegister ? 'Crear Cuenta' : 'Iniciar Sesión') }}
          </button>
        </form>
        <div class="text-center mt-6">
          <button @click="isRegister = !isRegister; errorMsg = ''" class="text-primary-500 hover:text-primary-600 text-sm font-medium">
            {{ isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({ title: 'Iniciar Sesión | Capital Pets' });
const auth = useAuth();
const router = useRouter();
const isRegister = ref(false);
const loading = ref(false);
const errorMsg = ref('');
const form = reactive({ email: '', password: '', name: '' });

const handleSubmit = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    if (isRegister.value) {
      await auth.register(form.email, form.password, form.name || undefined);
    } else {
      await auth.login(form.email, form.password);
    }
    router.push(auth.isAdmin.value ? '/admin' : '/');
  } catch (error: any) {
    errorMsg.value = error.message || 'Error al procesar la solicitud';
  } finally {
    loading.value = false;
  }
};
</script>
