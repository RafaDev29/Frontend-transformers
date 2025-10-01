<template>
  <div class="">
    <div class="overflow-hidden border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300">
      <table class="min-w-full">
        <thead class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
                 dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
                 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Código</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Número de serie</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Potencia (KVA)</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Tipo</th>
            <th class="px-6 py-3 text-left text-[11px] tracking-wider font-bold uppercase">Año Fabricación</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-200/70 dark:divide-slate-700/60
                 text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300">
          <tr v-for="transformer in filteredTransformers" :key="transformer.uid" role="button" tabindex="0"
            @click="goToTransformerDetail(transformer)" @keydown.enter="goToTransformerDetail(transformer)" class="group cursor-pointer select-none
                   odd:bg-white/90 even:bg-slate-50/70
                   dark:odd:bg-slate-800/70 dark:even:bg-slate-800/60
                   transition-all duration-300">
            <td colspan="5" class="relative p-0">
              <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       bg-gradient-to-r from-color1/6 via-color2/8 to-transparent
                       dark:from-color3/10 dark:via-color4/10 dark:to-transparent"></div>

              <div class="grid grid-cols-5">

                <div class="px-6 py-4 whitespace-nowrap font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {{ transformer.code }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {{ transformer.serialNumber }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-200">
                  {{ transformer.apparentPowerKVA }}
                </div>
                <div class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[12px] font-semibold
                           bg-gradient-to-r from-color1/10 via-color2/10 to-transparent
                           dark:from-color3/15 dark:via-color4/12 dark:to-transparent
                           text-color1 dark:text-color3 border border-color1/20 dark:border-color3/25
                           transition-all duration-300 group-hover:shadow-sm">
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-color2 dark:bg-color4 shadow-[0_0_8px] shadow-color2/40 dark:shadow-color4/40"></span>
                    {{ transformer.type }}
                  </span>
                </div>
                <div class="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {{ transformer.yearManufacture }}
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
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

const router = useRouter()
const transformerStore = useTransformerStore()

const filteredTransformers = computed(() => {


  return props.items
})

function goToTransformerDetail(transformer) {

  transformerStore.setTransformer(transformer)


  router.push('/app/transformerDetail')
}
</script>