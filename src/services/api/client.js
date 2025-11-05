import axios from 'axios'


const cliURL = process.env.VUE_APP_API_URL

const client = axios.create({
  baseURL:  cliURL ,
  timeout: 500000,
})

export default client
