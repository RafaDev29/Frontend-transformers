<template>
  <div class="p-1">
    <table class="min-w-full divide-y divide-neutral-300 rounded-md overflow-hidden">
      <thead class="bg-color1 text-white">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase">Código</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase">Tipo</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase">Año Fabricación</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-neutral-200">
        <tr class="hover:bg-color5 cursor-pointer" @click="goToStrain">
          <td class="px-6 py-4 whitespace-nowrap">TRF001</td>
          <td class="px-6 py-4 whitespace-nowrap">Transformador Principal</td>
          <td class="px-6 py-4 whitespace-nowrap">Aceite</td>
          <td class="px-6 py-4 whitespace-nowrap">2018</td>
        </tr>
        <tr class="hover:bg-color5 cursor-pointer" @click="goToStrain">
          <td class="px-6 py-4 whitespace-nowrap">TRF002</td>
          <td class="px-6 py-4 whitespace-nowrap">Transformador Auxiliar</td>
          <td class="px-6 py-4 whitespace-nowrap">Seco</td>
          <td class="px-6 py-4 whitespace-nowrap">2020</td>
        </tr>
        <tr class="hover:bg-color5 cursor-pointer" @click="goToStrain">
          <td class="px-6 py-4 whitespace-nowrap">TRF003</td>
          <td class="px-6 py-4 whitespace-nowrap">Transformador Backup</td>
          <td class="px-6 py-4 whitespace-nowrap">Aceite</td>
          <td class="px-6 py-4 whitespace-nowrap">2016</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToStrain() {
  router.push('/app/welcome')
}
</script>
