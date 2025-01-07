import { toast } from 'react-toastify'
import { Buffer } from 'buffer'
import makeApiRequest from './apiServer'

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
  try {
    if (!file || typeof file !== 'object') {
      throw new Error('Invalid file object')
    }
    const generateUrlResponse = await makeApiRequest<ApiResponse<{ url: string }>>({
      method: 'POST',
      url: 'generate-s3-url',
      data: {
        bucketName: 'connect-dev-test',
        key: file.key,
        expDate: 15,
        contentType: file.fileType,
      },
    //   tempToken: accessToken,
    })

    const { url } = generateUrlResponse.data

    // Decode base64 string and prepare for upload
    if (!file.fileObject) {
      throw new Error('File object is missing.')
    }
    const base64WithoutHeader = file.fileObject.replace(/^data:image\/\w+;base64,/, '')
    const binaryData = Buffer.from(base64WithoutHeader, 'base64')

    // Upload to S3 using makeApiRequest (PUT method)
    const uploadResponse = await makeApiRequest<ApiResponse<any>>({
      method: 'PUT',
      url,
      data: binaryData,
      contentType: file.fileType,
    })

    if (uploadResponse.status === 200) {
      // Save file metadata using makeApiRequest
      const uploadDocDetails = await makeApiRequest<ApiResponse<{ document: { id: string } }>>({
        method: 'POST',
        url: 'upload-document',
        data: {
          bucketName: 'connect-dev-test',
          key: file.key,
          contentType: file.fileType,
          documentType: file.documentType,
          documentName: file.documentName,
          documentDescription: file.documentDescription,
          documentSize: file.fileSize,
        },
        // tempToken: accessToken,
      })

      if (uploadDocDetails.status === 201) {
        const docId = uploadDocDetails.data.document.id
        toast.success('File uploaded successfully!')
        return docId
      } else {
        throw new Error('Metadata upload failed')
      }
    } else {
      throw new Error('File upload failed')
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
