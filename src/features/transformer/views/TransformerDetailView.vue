<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
        <div class=" py-1">
            <NavigationComponent :breadcrumbs="[
                { label: 'Panel de Transformadores', path: '/app/transformer' },
                { label: 'Panel detalle transformador', path: '/app/transformerDetail' },
            ]" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
  <CardComponent />
  <CardDetailComponent />
</div>


    </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue';
import CardDetailComponent from '../components/CardDetailComponent.vue';
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'

</script>