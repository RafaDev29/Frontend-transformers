import client from '@/services/api/client'
import { RANGE } from '@/services/api/endpoints'

export async function createRange(payload) {

  const res = await client.post(RANGE.CREATE, payload)
  return res.data?.data
}

export async function updateRange(payload, id) {
  const { data } = await client.patch(`${RANGE.UPDATE}/${id}`, payload)
  return data
}

export async function listRange() {
  const { data } = await client.get(RANGE.LIST)
  return data
}

export async function deleteRange(id) {
  const { data } = await client.delete(`${RANGE.DELETE}/${id}`)
  return data
}





