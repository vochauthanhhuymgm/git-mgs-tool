<template>
  <div id="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global app configuration
useHead({
  title: 'Git Message Tool',
  meta: [
    { name: 'description', content: 'A tool for managing git commit messages' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
