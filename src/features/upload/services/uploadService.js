import client from '@/services/api/client'
import { UPLOAD } from '@/services/api/endpoints'

export async function createUpload(payload , code) {

  const res = await client.post(`${UPLOAD.CREATE}/${code}`, payload)
  return res.data?.data
}

export async function listUpload() {
  const { data } = await client.get(`${UPLOAD.LIST}/batches?uploadType=MANUAL`)
  return data
}



export async function deleteUpload(uid) {
  const { data } = await client.delete(`${UPLOAD.DELETE}/${uid}`)
  return data
}


