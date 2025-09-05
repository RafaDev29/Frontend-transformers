<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1 flex flex-col">

        <!-- Navigation arriba (NO se mueve) -->
        <div class="py-1">
            <NavigationComponent :breadcrumbs="[
                { label: 'Panel de Fábrica', path: '/app/factory' },
                { label: 'Panel de transformadores', path: '/app/factoryTransformer' },
                { label: 'Panel  detalle transformador', path: '/app/factoryTransformerDetail' },
                { label: 'Panel de Tensión ', path: '/app/strain' },
            ]" />
        </div>




        <GraphicOneComponent  />




    </div>
</template>

<script setup>

import GraphicOneComponent from '../components/GraphicOneComponent.vue';
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'

</script>

<style scoped>

</style>