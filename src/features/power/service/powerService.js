import client from '@/services/api/client'
import { POWER } from '@/services/api/endpoints'


export async function allPower(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${POWER.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
