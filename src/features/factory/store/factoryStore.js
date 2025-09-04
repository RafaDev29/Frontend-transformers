


import { defineStore } from 'pinia'

const FACTORY_KEY = 'app:factory'

export const useFactoryStore = defineStore('factory', {
  state: () => ({
    selectedFactory: JSON.parse(localStorage.getItem(FACTORY_KEY) || 'null'),
  }),
  getters: {
    hasFactory: (s) => !!s.selectedFactory,
    factoryUid: (s) => s.selectedFactory?.uid || null,
  },
  actions: {
    setFactory(factory) {
      this.selectedFactory = factory
      localStorage.setItem(FACTORY_KEY, JSON.stringify(factory))
    },
    clearFactory() {
      this.selectedFactory = null
      localStorage.removeItem(FACTORY_KEY)
    },
    loadFactory() {
      // si quieres forzar la recarga desde localStorage
      this.selectedFactory = JSON.parse(localStorage.getItem(FACTORY_KEY) || 'null')
    },
  },
})
