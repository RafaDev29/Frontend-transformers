import client from '@/services/api/client'
import { RULE } from '@/services/api/endpoints'

export async function createRule(payload) {

  const res = await client.post(RULE.CREATE, payload)
  return res.data?.data
}



export async function updateRule(payload, id) {
  const { data } = await client.patch(`${RULE.UPDATE}/${id}`, payload)
  return data
}


export async function allRule() {
  const { data } = await client.get(RULE.LIST_ROOT)
  return data
}

export async function listRule() {
  const { data } = await client.get(RULE.LIST)
  return data
}



export async function deleteRule(id) {
  const { data } = await client.delete(`${RULE.DELETE}/${id}`)
  return data
}



