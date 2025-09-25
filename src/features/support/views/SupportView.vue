<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Soporte', path: '/app/support' },
        ]"
      />
    </div>
    <headRoot />
    <div class=" pb-1">
      <FormSupport  />
    </div>
  </div>
</template>

<script setup>
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormSupport from '../components/FormSupport.vue';
</script>