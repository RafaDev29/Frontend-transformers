import client from '@/services/api/client'
import { CUSTOMER } from '@/services/api/endpoints'

export async function createCustomer(payload) {

  const res = await client.post(CUSTOMER.CREATE, payload)
  return res.data?.data
}

export async function updateCustomer(payload, id) {
  const { data } = await client.patch(`${CUSTOMER.UPDATE}/${id}`, payload)
  return data
}

export async function listCustomer() {
  const { data } = await client.get(CUSTOMER.LIST)
  return data
}

export async function deleteCustomer(id) {
  const { data } = await client.delete(`${CUSTOMER.DELETE}/${id}`)
  return data
}





