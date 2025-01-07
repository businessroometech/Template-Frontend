import { BaseUrl, POST_LIKE_POST } from '@/utils/api'
import { useCallback, useState } from 'react'

const useLike = (postId: string, initialLike = false) => {
  // Assuming `userId` is fetched or stored elsewhere
  const userId = '018faa07809d523c34ac1186d761459d'
  const [isLike, setIsLike] = useState(initialLike)

  const toggleLike = useCallback(async () => {
    try {
      const response = await fetch(`${BaseUrl()}${POST_LIKE_POST}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      })
      if (response?.status === 200) {
        setIsLike((prevLike) => !prevLike) // Toggle like state
      }
    } catch (err) {
      console.error('---- Error in the like hook ----', err)
    }
  }, [postId, userId])

  return { isLike, toggleLike }
}

export default useLike
