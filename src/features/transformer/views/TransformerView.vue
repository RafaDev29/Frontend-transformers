<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Transformadores', path: '/app/welcome' },
        ]"
      />
    </div>
    <HeadFactory />

   
    <div class=" pb-1">
      <TableComponent />
    </div>
  </div>
</template>

<script setup>
import HeadFactory from '@/components/ui/head/HeadFactory.vue'
import TableComponent from '@/features/transformer/components/TableComponent.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
</script>