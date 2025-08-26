<template>
  <!-- Contenedor principal con margen mínimo -->
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <HeadFactory />

    <!-- Navegación con margen mínimo -->
    <div class="px-2 py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Transformadores', path: '/app/transfor' },
             { label: 'Panel de Transformadores', path: '/app/transformer' },
        ]"
      />
    </div>

 
  </div>
</template>

<script setup>
import HeadFactory from '@/components/head/HeadFactory.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
</script>