<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Fabricas', path: '/app/factory' },
        { label: 'Panel de Transformadores', path: '/app/transformer' },
      ]" />
    </div>
    <HeadMaster />


    <div class=" pb-1">
      <TableComponent />
    </div>
  </div>
</template>

<script setup>
import HeadMaster from '@/components/head/HeadMaster.vue'
import TableComponent from '@/features/transformer/components/TableComponent.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
</script>