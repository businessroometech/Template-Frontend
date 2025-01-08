import { LIVE_URL } from "./api"

interface APIRequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  data?: any
  headers?: Record<string, string>
  contentType?: string
  // tempToken?: string | null;
}

const API_BASE_URL = LIVE_URL // Replace with your base URL

const handleError = (error: any): string => {
  if (!navigator.onLine) {
    return 'No Internet Connection'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

const makeApiRequest = async <T>({
  method,
  url,
  data = null,
  headers = {},
  contentType = 'application/json',
  // tempToken = null,
}: APIRequestParams): Promise<T> => {
  const finalHeaders: Record<string, string> = {
    'Content-Type': contentType,
    ...headers,
  }

  const tempToken = localStorage.getItem('token')
  if (tempToken) {
    finalHeaders['Authorization'] = `Bearer ${tempToken}`
  }

  const requestOptions: RequestInit = {
    method,
    headers: finalHeaders,
    body: method === 'GET' ? undefined : JSON.stringify(data),
  }

  try {
    const response = await fetch(`${LIVE_URL}/api/v1/${url}`, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData: T = await response.json()
    return responseData
  } catch (error: any) {
    const errorMessage = handleError(error)
    console.error('API Error:', errorMessage, error)
    throw new Error(errorMessage)
  }
}

export default makeApiRequest
