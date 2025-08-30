<template>
  <div>
    <div
      class="overflow-hidden border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300"
    >
      <table class="min-w-full">
        <thead
          class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
                 dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
                 text-white"
        >
          <tr>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Razón Social</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">RUC</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">N° Transformadores</th>
          </tr>
        </thead>

        <tbody
          class="divide-y divide-slate-200/70 dark:divide-slate-700/60
                 text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300"
        >
          <tr
            v-for="factory in factories"
            :key="factory.ruc"
            role="button"
            tabindex="0"
            @click="goToFactory(factory.ruc)"
            @keydown.enter="goToFactory(factory.ruc)"
            class="group cursor-pointer select-none
                   odd:bg-white/90 even:bg-slate-50/70
                   dark:odd:bg-slate-800/70 dark:even:bg-slate-800/60
                   transition-all duration-300"
          >
            <td colspan="3" class="relative p-0">
              <div
                class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       bg-gradient-to-r from-color1/6 via-color2/8 to-transparent
                       dark:from-color3/10 dark:via-color4/10 dark:to-transparent"
              ></div>

              <div class="grid grid-cols-3">
                <div class="px-6 py-4 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">
                  {{ factory.razonSocial }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap font-mono text-slate-700 dark:text-slate-200">
                  {{ factory.ruc }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {{ factory.numTransformers }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const factories = [
  { razonSocial: 'Fábrica Eléctrica SAC', ruc: '20123456789', numTransformers: 5 },
  { razonSocial: 'Industrias Energéticas SRL', ruc: '20456789123', numTransformers: 3 },
  { razonSocial: 'Compañía de Transformadores del Perú', ruc: '20678912345', numTransformers: 8 },
]

function goToFactory() {

  router.push(`/app/factoryTransformer`)
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
