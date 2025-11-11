
import client from '@/services/api/client'
import { FREQUENCY } from '@/services/api/endpoints'


export async function allFrequency(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${FREQUENCY.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}


