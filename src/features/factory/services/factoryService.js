import client from '@/services/api/client'
import { FACTORY } from '@/services/api/endpoints'

export async function createFactory(payload) {

  const res = await client.post(FACTORY.CREATE, payload)
  return res.data?.data
}

export async function updateFactory(payload, id) {
  const { data } = await client.patch(`${FACTORY.UPDATE}/${id}`, payload)
  return data
}

export async function listFactory() {
  const { data } = await client.get(FACTORY.LIST)
  return data
}

export async function deleteFactory(id) {
  const { data } = await client.delete(`${FACTORY.DELETE}/${id}`)
  return data
}





