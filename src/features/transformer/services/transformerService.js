import client from '@/services/api/client'
import { TRANSFORMER } from '@/services/api/endpoints'

export async function createTransformer(payload) {

  const res = await client.post(TRANSFORMER.CREATE, payload)
  return res.data?.data
}


export async function createTransformerRoot(payload) {

  const res = await client.post(TRANSFORMER.CREATE_ROOT, payload)
  return res.data?.data
}


export async function updateTransformer(payload, id) {
  const { data } = await client.patch(`${TRANSFORMER.UPDATE}/${id}`, payload)
  return data
}

export async function listTransformer() {
  const { data } = await client.get(TRANSFORMER.LIST)
  return data
}

export async function listTransformerRoot() {
  const { data } = await client.get(TRANSFORMER.LIST_ROOT)
  return data
}



export async function deleteTransformer(id) {
  const { data } = await client.delete(`${TRANSFORMER.DELETE}/${id}`)
  return data
}


export async function deleteTransformerRoot(id) {
  const { data } = await client.delete(`${TRANSFORMER.DELETE_ROOT}/${id}`)
  return data
}




