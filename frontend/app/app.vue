<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Trigger redeploy with new Vercel root directory settings
const auth = useAuth();

onMounted(async () => {
  await auth.fetchProfile();
});
</script>
