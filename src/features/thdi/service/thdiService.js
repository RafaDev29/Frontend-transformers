import client from '@/services/api/client'
import { THDI } from '@/services/api/endpoints'


export async function allThdi(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${THDI.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
