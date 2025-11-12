import client from '@/services/api/client'
import { THDV} from '@/services/api/endpoints'


export async function allThdv(serialNumber, startDate, endDate) {
  const { data } = await client.get(`${THDV.DATA}/${serialNumber}`, {
    params: {
      startDate,
      endDate,
    },
  })
  return data
}
