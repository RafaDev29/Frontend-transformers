import client from '@/services/api/client'
import { TEMPERATURE } from '@/services/api/endpoints'


export async function allTemperature(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${TEMPERATURE.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
