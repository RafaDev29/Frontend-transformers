<!-- src/components/Head.vue -->
<template>
  <header
    class="p-3 relative overflow-hidden bg-gradient-to-r from-petroleum via-colorDark1 to-petroleum text-white shadow-xl mb-1">
    <!-- Patrón decorativo de fondo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent">
      </div>
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-color3/20 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-color2/20 rounded-full blur-xl"></div>
    </div>

    <div class="relative flex items-center justify-between p-3 lg:px-6">
      <!-- Información de empresa -->
      <div class="flex-1" v-if="factory">
        <h1 class="text-2xl lg:text-3xl font-bold mb-1 text-white drop-shadow-sm">
          {{ factory.businessName || user.factory.businessName }}
        </h1>
        <div class="space-y-0.5 text-slate-100">
          <p class="flex items-center text-xs lg:text-sm font-medium">
            <svg class="w-3.5 h-3.5 mr-1.5 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg>
            RUC: {{ factory.ruc }}
          </p>
          <p class="flex items-center text-xs lg:text-sm">
            <svg class="w-3.5 h-3.5 mr-1.5 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd" />
            </svg>
            {{ factory.address }}
          </p>
        </div>
      </div>

      <div class="flex-1" v-if="user?.customer">
        <h1 class="text-2xl lg:text-3xl font-bold mb-1 text-white drop-shadow-sm">
          {{ user?.customer?.businessname }}
        </h1>
        <div class="space-y-0.5 text-slate-100">
          <p class="flex items-center text-xs lg:text-sm font-medium">
            <svg class="w-3.5 h-3.5 mr-1.5 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg>
            RUC: {{ user?.customer?.ruc }}
          </p>
          <p class="flex items-center text-xs lg:text-sm">
            <svg class="w-3.5 h-3.5 mr-1.5 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd" />
            </svg>
            {{ user?.customer?.address }}
          </p>
        </div>
      </div>


      <div class="flex-shrink-0 ml-4" v-if="logoUrl">
        <div class="relative group">
          <div
            class="absolute -inset-1.5 bg-gradient-to-r from-color3/50 to-color4/50 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>

          <div class="relative bg-white rounded-xl p-2 shadow-xl border border-white/20 backdrop-blur-sm">
            <img :src="logoUrl" :alt="`Logo de ${factory?.businessName}`"
              class="w-16 h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy" />
          </div>

          <div
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-success rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

    </div>

    <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-color3 via-color4 to-color3"></div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useFactoryStore } from '@/features/factory/store/factoryStore'
import { useAuthStore } from '@/features/auth/stores/authStore'

const userStore = useAuthStore()
const factoryStore = useFactoryStore()

const factory = computed(() => factoryStore.selectedFactory)
const user = computed(() => userStore.user)

const logoUrl = computed(() => factory.value?.user?.images?.[0]?.url || user.value?.images?.[0]?.url)
</script>