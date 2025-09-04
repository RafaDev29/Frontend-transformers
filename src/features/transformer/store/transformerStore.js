// feature/transformer/store/transformerStore.js
import { defineStore } from 'pinia'

const FACTORY_KEY = 'app:factory'

export const useTransformerStore = defineStore('transformer', {
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
      // hidrata desde localStorage con el state inicial
      this.selectedFactory = JSON.parse(localStorage.getItem(FACTORY_KEY) || 'null')
    },
  },
})
