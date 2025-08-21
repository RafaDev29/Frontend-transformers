<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Fabricas', path: '/app/factory' },

        ]"
      />
    </div>
    <headRoot />

   
    <div class=" pb-1">
      <TableComponent />
    </div>
  </div>
</template>

<script setup>
import headRoot from '@/components/head/headRoot.vue';
import TableComponent from '@/features/factory/components/TableComponent.vue'
import NavigationComponent from '@/features/factory/components/NavigationComponent.vue'
</script>