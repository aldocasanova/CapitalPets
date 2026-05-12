<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();

onMounted(async () => {
  await auth.fetchProfile();
});
</script>
