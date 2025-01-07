import { toast } from 'react-toastify'
import { Buffer } from 'buffer'
import makeApiRequest from './apiServer'
import axios from 'axios'

interface FileUpload {
  key: string
  fileType: string
  fileObject: string // Base64 encoded file content
  documentType: string
  documentName: string
  documentDescription: string
  fileSize: number
}

interface ApiResponse<T> {
  status: number
  data: T
}

// Upload function to handle file uploads to S3
export const uploadDoc = async (file: FileUpload): Promise<string | null> => {
  const doc = file[0]
  try {
    if (!doc || typeof file !== 'object') {
      throw new Error('Invalid file object')
    }

    // Step 1: Generate upload URL
    const generateUrlResponse = await makeApiRequest<ApiResponse<{ url: string }>>({
      method: 'POST',
      url: 'auth/generate-upload-url',
      data: {
        key: doc.key,
        expDate: 15,
        contentType: doc.fileType,
      },
    })

    const { url } = generateUrlResponse.data
    // Decode base64 string
    if (!file.fileObject) {
      throw new Error('File object is missing.')
    }
    const base64WithoutHeader = file.fileObject.replace(/^data:image\/\w+;base64,/, '')
    const binaryData = Buffer.from(base64WithoutHeader, 'base64')

    // Upload to S3
    const uploadResponse = await axios.put(url, binaryData, {
      headers: {
        'Content-Type': file.fileType, // e.g., 'image/jpeg'
      },
    })

    if (uploadResponse.status === 200) {
      // Save file metadata
      const uploadDocDetails = await makeApiRequest({
        method: 'POST',
        url: '',
        data: {
          bucketName: 'connect-dev-test',
          key: file.key,
          contentType: doc.fileType,
          documentType: doc.documentType,
          documentName: doc.documentName,
          documentDescription: doc.documentDescription,
          documentSize: doc.fileSize,
        },
      })

      // const uploadDocDetails = await api.post(
      //   ListUploadDocument(),
      //   {
      //     bucketName: 'connect-dev-test',
      //     key: file.key,
      //     contentType: file.fileType,
      //     documentType: file.documentType,
      //     documentName: file.documentName,
      //     documentDescription: file.documentDescription,
      //     documentSize: file.fileSize,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //       'Content-Type': 'application/json',
      //     },
      //     withCredentials: true,
      //   },
      // );

      if (uploadDocDetails.status === 201) {
        const docDetails = uploadDocDetails?.data?.document

        console.log('----doc details -----', docDetails.id)
        return docDetails.id
      } else {
      }
    } else {
    }
  } catch (error: any) {
    const errorMessage = error.message || 'An unknown error occurred.'
    toast.error(errorMessage)
    console.error('Error:', errorMessage)
    return null
  }
}

// Fetch image by its ID using makeApiRequest
export const GetImageWithUrl = async (id: string): Promise<string | null> => {
  if (!id) return null

  try {
    const response = await makeApiRequest<ApiResponse<{ url: string }>>({
      method: 'POST',
      url: 'get-image-by-id',
      data: { documentId: id },
    })

    return response.data.url
  } catch (error) {
    console.error('Error fetching image:', error)
    return null
  }
}
