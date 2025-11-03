import client from '@/services/api/client'
import { STRAIN } from '@/services/api/endpoints'


export async function allStrain(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${STRAIN.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
