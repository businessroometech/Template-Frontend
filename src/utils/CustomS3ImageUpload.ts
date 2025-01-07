import { toast } from 'react-toastify'
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

// Function to convert base64 string to a Blob
function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64) // Decode base64 string to binary
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

// Upload function to handle file uploads to S3
export const uploadDoc = async (file: FileUpload): Promise<string | null> => {
  const doc = file[0]

  console.log('---- doc -------', doc)

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

    console.log('---- url -----', url)

    if (!doc.fileObject) {
      throw new Error('File object is missing.')
    }

    // Remove the base64 header (e.g., 'data:image/png;base64,')
    const base64WithoutHeader = doc.fileObject.replace(/^data:image\/\w+;base64,/, '')

    // Convert base64 string to a Blob
    const blob = base64ToBlob(base64WithoutHeader, doc.fileType)

    console.log('---- blob ------', blob)

    // Upload to S3
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      body: blob, // Pass the Blob directly
      headers: {
        'Content-Type': doc.fileType, // e.g., 'image/jpeg' or 'video/mp4'
      },
    })

    console.log('----- uploadResponse -----', uploadResponse)

    // if (uploadResponse.ok) {
    //   // Save file metadata
    //   const uploadDocDetails = await makeApiRequest({
    //     method: 'POST',
    //     url: '', // Replace with actual API endpoint for saving metadata
    //     data: {
    //       bucketName: 'connect-dev-test',
    //       key: doc.key,
    //       contentType: doc.fileType,
    //       documentType: doc.documentType,
    //       documentName: doc.documentName,
    //       documentDescription: doc.documentDescription,
    //       documentSize: doc.fileSize,
    //     },
    //   })

    //   if (uploadDocDetails.status === 201) {
    //     const docDetails = uploadDocDetails?.data?.document

    //     console.log('----doc details -----', docDetails.id)
    //     return docDetails.id
    //   } else {
    //     throw new Error('Failed to save file metadata.')
    //   }
    // } else {
    //   throw new Error('Failed to upload file to S3.')
    // }
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
