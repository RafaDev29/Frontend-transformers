import client from '@/services/api/client'
import { CURRENT } from '@/services/api/endpoints'


export async function allCurrent(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${CURRENT.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
