<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Mi perfil', path: '/app/profile' },
        ]"
      />
    </div>
    <headRoot />
    <div class=" pb-1">
      <ProfileFormFactory />
    </div>
  </div>
</template>

<script setup>
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import ProfileFormFactory from '../components/ProfileFormFactory.vue';
</script>