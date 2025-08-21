<template>
  <div class="">
    <div
      class=" overflow-hidden border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300"
    >
      <table class="min-w-full">
        <!-- Header con gradiente y sutil separación -->
        <thead
          class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
                 dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
                 text-white"
        >
          <tr>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Código</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Tipo</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Año Fabricación</th>
          </tr>
        </thead>

        <!-- Body con zebra, divide y hover “Claude style” -->
        <tbody
          class="divide-y divide-slate-200/70 dark:divide-slate-700/60
                 text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300"
        >
          <tr
            v-for="row in rows"
            :key="row.code"
            role="button"
            tabindex="0"
            @click="goToStrain"
            @keydown.enter="goToStrain"
            class="group cursor-pointer select-none
                   odd:bg-white/90 even:bg-slate-50/70
                   dark:odd:bg-slate-800/70 dark:even:bg-slate-800/60
                   transition-all duration-300"
          >
            <!-- Overlay de hover con gradiente y sombra sutil -->
            <td colspan="4" class="relative p-0">
              <div
                class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       bg-gradient-to-r from-color1/6 via-color2/8 to-transparent
                       dark:from-color3/10 dark:via-color4/10 dark:to-transparent"
              ></div>

              <div class="grid grid-cols-4">
                <div class="px-6 py-4 whitespace-nowrap font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {{ row.code }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-200">
                  {{ row.name }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[12px] font-semibold
                           bg-gradient-to-r from-color1/10 via-color2/10 to-transparent
                           dark:from-color3/15 dark:via-color4/12 dark:to-transparent
                           text-color1 dark:text-color3 border border-color1/20 dark:border-color3/25
                           transition-all duration-300 group-hover:shadow-sm"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-color2 dark:bg-color4 shadow-[0_0_8px] shadow-color2/40 dark:shadow-color4/40"
                    ></span>
                    {{ row.type }}
                  </span>
                </div>
                <div class="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {{ row.year }}
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

const rows = [
  { code: 'TRF001', name: 'Transformador Principal', type: 'Aceite', year: 2018 },
  { code: 'TRF002', name: 'Transformador Auxiliar',  type: 'Seco',   year: 2020 },
  { code: 'TRF003', name: 'Transformador Backup',    type: 'Aceite', year: 2016 },
]

function goToStrain() {
  router.push('/app/transformerDetail')
}
</script>

<style scoped>
/* Suaviza texto y remueve “jaggies” en ambas plataformas */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

/* Accesibilidad: foco visible sin romper el layout */
tr:focus {
  outline: 2px solid theme('colors.color2');
  outline-offset: 2px;
}
:global(.dark) tr:focus {
  outline-color: theme('colors.color3');
}
</style>
