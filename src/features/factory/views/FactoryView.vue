<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Fábricas', path: '/app/factory' },

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
import headRoot from '@/components/ui/head/headRoot.vue';
import TableComponent from '@/features/factory/components/TableComponent.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
</script>