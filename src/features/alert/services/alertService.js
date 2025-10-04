import client from '@/services/api/client'
import { ALERT } from '@/services/api/endpoints'

export async function createAlerts(payload) {

  const res = await client.post(ALERT.CREATE, payload)
  return res.data?.data
}


export async function updateAlerts(payload, id) {
  const { data } = await client.patch(`${ALERT.UPDATE}/${id}`, payload)
  return data
}


export async function allAlerts() {
  const { data } = await client.get(ALERT.LIST_ROOT)
  return data
}

export async function listAlerts() {
  const { data } = await client.get(ALERT.LIST)
  return data
}


export async function deleteAlerts(id) {
  const { data } = await client.delete(`${ALERT.DELETE}/${id}`)
  return data
}



