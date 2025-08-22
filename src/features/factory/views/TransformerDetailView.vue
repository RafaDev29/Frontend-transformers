<template>

    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">

        <div class="py-1">
            <NavigationComponent :breadcrumbs="[
                { label: 'Panel de Fábrica', path: '/app/factory' },
                { label: 'Panel de transformadores', path: '/app/factoryTransformer' },
                { label: 'Panel detalle transformador', path: '/app/factoryTransformerDetail' },


            ]" />
        </div>
        <div class="transformer-layer" :style="bgStyle">
            <!-- Overlay para mejorar legibilidad -->


            <!-- Contenido principal -->
            <div class="relative z-10 h-full w-full p-1">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 ml-14 pl-14">
                    <CardDetailComponent />
                </div>
            </div>
        </div>

    </div>


</template>

<script setup>
import CardDetailComponent from '../components/CardDetailComponent.vue';
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
import bg from '@/assets/welcome/welcome.jpeg'

const bgStyle = { backgroundImage: `url(${bg})` }
</script>

<style scoped>
.transformer-layer {

    inset: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
}
</style>