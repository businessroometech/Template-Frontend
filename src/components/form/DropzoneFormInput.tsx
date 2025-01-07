import { FileType } from '@/hooks/useFileUploader'
import { useState } from 'react'
import { Card, Col, FormLabel, FormText } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type DropzoneFormInputProps = {
  label?: string
  labelClassName?: string
  helpText?: string
  showPreview?: boolean
  icon?: React.ComponentType<any>
  iconProps?: React.ComponentProps<any>
  text?: string
  textClassName?: string
  onFileUpload?: (files: FileUpload[]) => void // Updated callback to return FileUpload type
}

interface FileUpload {
  key: string
  fileType: string
  fileObject: string // Base64 encoded file content
  documentType: string
  documentName: string
  documentDescription: string
  fileSize: number
}

const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  icon,
  iconProps,
  showPreview,
  text,
  textClassName,
  onFileUpload,
}: DropzoneFormInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([])

  const handleAcceptedFiles = async (files: File[]) => {
    let allFiles: FileUpload[] = []

    for (let file of files) {
      // Read file as base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string

        const fileUploadData: FileUpload = {
          key: file.name,
          fileType: file.type,
          fileObject: base64String, // Base64 content of the file
          documentType: 'image', // Set appropriate document type
          documentName: file.name,
          documentDescription: 'Uploaded image file',
          fileSize: file.size,
        }

        // Add preview URL for images
        if (file.type.startsWith('image/')) {
          file.preview = URL.createObjectURL(file) // Create an object URL for image preview
        }

        allFiles.push(fileUploadData)
        setSelectedFiles((prevFiles) => [...prevFiles, file])

        if (onFileUpload) onFileUpload(allFiles) // Pass the formatted files to parent component
      }

      reader.readAsDataURL(file)
    }
  }

  const removeFile = (file: FileType) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setSelectedFiles(newFiles)
  }

  const Icon = icon ?? BsUpload

  return (
    <>
      <FormLabel className={labelClassName}>{label}</FormLabel>

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dropzone-custom cursor-pointer">
            <div className="dz-message" {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon {...iconProps} className="display-3" />
              <p className={textClassName}>{text}</p>
            </div>
            {showPreview && selectedFiles.length > 0 && (
              <div className="dz-preview row g-4">
                {selectedFiles.map((file, idx) => (
                  <Col md={4} sm={6} key={`file-${idx}-${file.name}`}>
                    <Card className="p-2 mb-0 shadow-none border position-relative h-100">
                      {file.preview ? (
                        <img alt={file.name} src={file.preview} className="rounded bg-light" />
                      ) : (
                        <div className="rounded bg-light text-center">{file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()}</div>
                      )}
                      <div className="mt-2">
                        <p role="button" className="text-body-secondary fw-bold">
                          {file.name}
                        </p>
                        <p className="mb-0 small">{file.formattedSize}</p>
                      </div>
                      <div className="position-absolute top-0 start-100 translate-middle">
                        <button
                          className="btn btn-danger rounded-circle icon-sm p-0 d-flex align-items-center justify-content-center"
                          onClick={() => removeFile(file)}>
                          <FaTimes />
                        </button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {helpText && <FormText>{helpText}</FormText>}
    </>
  )
}

export default DropzoneFormInput
