import client from '@/services/api/client'
import { USER } from '@/services/api/endpoints'

export async function uploadLogo(payload, id) {

    const { data } = await client.post(`${USER.UPLOAD}/${id}/logo`, payload)
    return data
}






