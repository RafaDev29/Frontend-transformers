import axios from 'axios'


const cliURL = process.env.VUE_APP_API_URL


let viteURL = null
try {
  viteURL = import.meta?.env?.VITE_API_URL ?? null
} catch (_) {
  viteURL = null
}

const client = axios.create({
  baseURL: viteURL || cliURL || 'http://localhost:3000',
  timeout: 15000,
})

export default client
