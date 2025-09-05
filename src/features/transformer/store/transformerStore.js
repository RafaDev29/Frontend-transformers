import { defineStore } from 'pinia'

const TRANSFORMER_KEY = 'app:transformer'

export const useTransformerStore = defineStore('transformer', {
  state: () => ({
    selectedTransformer: JSON.parse(localStorage.getItem(TRANSFORMER_KEY) || 'null'),
  }),
  getters: {
    hasTransformer: (s) => !!s.selectedTransformer,
    transformerUid: (s) => s.selectedTransformer?.uid || null,
  },
  actions: {
    setTransformer(transformer) {
      this.selectedTransformer = transformer
      localStorage.setItem(TRANSFORMER_KEY, JSON.stringify(transformer))
    },
    clearTransformer() {
      this.selectedTransformer = null
      localStorage.removeItem(TRANSFORMER_KEY)
    },
    loadTransformer() {
      this.selectedTransformer = JSON.parse(localStorage.getItem(TRANSFORMER_KEY) || 'null')
    },
  },
})