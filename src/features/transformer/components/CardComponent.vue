<!-- src/components/TransformerCard.vue -->
<template>
  <div
    class="w-80 h-[420px] flex flex-col justify-between rounded-2xl overflow-hidden 
           border border-slate-200/70 dark:border-slate-700/60
           bg-gradient-to-br from-white via-slate-50 to-white
           dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
           shadow-md hover:shadow-lg transition-all duration-300
           cursor-pointer group"
  >
    <!-- Imagen (más alta) -->
    <div class="relative flex-1 overflow-hidden">
      <img
        src="@/assets/transformer/transformerDry.jpeg"
        alt="Transformador Seco"
        class="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
      />
      <!-- Overlay hover -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <!-- Título -->
    <div class="px-4 py-4 text-center bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm">
      <h3
        class="text-lg font-bold text-color1 dark:text-color3 tracking-wide
               group-hover:text-color2 dark:group-hover:text-color4 transition-colors duration-300"
      >
        Transformador Seco
      </h3>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
