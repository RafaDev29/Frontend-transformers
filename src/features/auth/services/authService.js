import client from '@/services/api/client'
import { AUTH } from '@/services/api/endpoints'

export async function login(payload) {

  const res = await client.post(AUTH.LOGIN, payload)
  return res.data?.data           
}

export async function register(payload) {
  const { data } = await client.post(AUTH.REGISTER, payload)
  return data
}

export async function fetchProfile() {
  const { data } = await client.get(AUTH.PROFILE)
  return data 
}


