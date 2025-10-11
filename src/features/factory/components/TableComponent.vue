<template>
  <div class="overflow-x-auto">
    <div
      class="inline-block min-w-full border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300"
    >
      <table class="min-w-full table-auto">
        <!-- Cabecera -->
        <thead
          class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
                 dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
                 text-white"
        >
          <tr>
             <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase whitespace-nowrap">Código</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase whitespace-nowrap">RUC</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase whitespace-nowrap">Razón Social</th>
           
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase whitespace-nowrap">Distrito</th>
          </tr>
        </thead>

        <!-- Cuerpo -->
        <tbody
          class="divide-y divide-slate-200/70 dark:divide-slate-700/60
                 text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300"
        >
          <tr
            v-for="factory in props.items"
            :key="factory.uid"
            role="button"
            tabindex="0"
            @click="goToFactory(factory)"
            @keydown.enter="goToFactory(factory)"
            class="group cursor-pointer select-none
                   odd:bg-white/90 even:bg-slate-50/70
                   dark:odd:bg-slate-800/70 dark:even:bg-slate-800/60
                   transition-all duration-300"
          >

            <td class="px-6 py-4 whitespace-nowrap font-medium text-slate-600 dark:text-slate-300">
              {{ factory.code }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-mono text-slate-700 dark:text-slate-200">
              {{ factory.ruc }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">
              {{ factory.businessName }}
            </td>
          
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300 capitalize">
              {{ factory.distric }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useFactoryStore } from '@/features/factory/store/factoryStore'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

const router = useRouter()
const factoryStore = useFactoryStore()

function goToFactory(factory) {
  factoryStore.setFactory(factory)
  router.push('/app/factoryTransformer')
}
</script>

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

tr:focus {
  outline: 2px solid theme('colors.color2');
  outline-offset: 2px;
}
:global(.dark) tr:focus {
  outline-color: theme('colors.color3');
}
</style>