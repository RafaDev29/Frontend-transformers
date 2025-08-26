<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Fábricas', path: '/app/factory' },
        { label: 'Panel de Transformadores', path: '/app/transformer' },
      ]" />
    </div>
    <HeadFactory />


    <div class=" pb-1">
      <TableComponent />
    </div>
  </div>
</template>

<script setup>
import HeadFactory from '@/components/head/HeadFactory.vue'
import TableComponent from '@/features/factory/components/TableTransformerComponent.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
</script>