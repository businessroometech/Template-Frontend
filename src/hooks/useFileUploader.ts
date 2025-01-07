import { useState } from 'react'

type FileType = File & {
  preview?: string
  formattedSize?: string
  base64?: string // Added base64 property
}

export default function useFileUploader(showPreview: boolean = true) {
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([])

  /**
   * Handles the accepted files and shows the preview
   */
  const handleAcceptedFiles = (files: FileType[], callback?: (files: FileType[]) => void) => {
    let allFiles: FileType[] = []

    if (showPreview) {
      files.map((file) => {
        // Read file as base64
        const reader = new FileReader()
        reader.onloadend = () => {
          // Add base64 data and other properties
          const base64String = reader.result as string
          const fileWithDetails: FileType = {
            ...file,
            preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
            formattedSize: formatBytes(file.size),
            base64: base64String, // Store the base64 string here
          }

          // Add the file with base64 to the allFiles array
          allFiles = [...selectedFiles, fileWithDetails]
          setSelectedFiles(allFiles)

          if (callback) callback(allFiles)
        }

        reader.readAsDataURL(file) // Read file as base64
      })
    } else {
      allFiles = [...selectedFiles, ...files]
      setSelectedFiles(allFiles)
    }
  }

  /**
   * Formats the size
   */
  const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  /*
   * Removes the selected file
   */
  const removeFile = (file: FileType) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setSelectedFiles(newFiles)
  }

  return {
    selectedFiles,
    handleAcceptedFiles,
    removeFile,
  }
}
