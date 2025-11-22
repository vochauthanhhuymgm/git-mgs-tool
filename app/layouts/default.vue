<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="border-b flex-shrink-0">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold">Git Message Tool</h1>
          <div class="flex items-center gap-6">
            <NuxtLink
              to="/branch"
              class="text-foreground hover:text-primary transition-colors"
              active-class="text-primary font-medium"
            >
              Branch
            </NuxtLink>
            <NuxtLink
              to="/commit"
              class="text-foreground hover:text-primary transition-colors"
              active-class="text-primary font-medium"
            >
              Commit
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="container mx-auto px-4 py-8 flex-1">
      <slot /> <!-- Your page content goes here -->
    </main>

    <!-- Footer -->
    <footer class="border-t flex-shrink-0">
      <div class="container mx-auto px-4 py-4 text-center text-muted-foreground">
        © 2025 Git Message Tool - HuyMgM
      </div>
    </footer>
  </div>
</template>
