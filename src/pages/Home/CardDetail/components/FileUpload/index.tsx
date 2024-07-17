import {
  Dropzone,
  ExtFile,
  FileMosaic,
  FileMosaicProps,
  FullScreen,
  ImagePreview,
  VideoPreview
} from '@files-ui/react'
import { useState } from 'react'
import {
  ACCEPT_FILES,
  ACCEPTS_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_UPLOAD
} from '~/utils/constant/common'
import requests from '~/services/cardService/requests'
import { FileUpdateContainer } from './styles'
interface IProps {
  cardId: string
  boardId: string
  uploadSuccessCb: () => Promise<void> | void
  maxFiles?: number
}

export default function FileUpload(props: Readonly<IProps>) {
  const { cardId, boardId, uploadSuccessCb, maxFiles = MAX_UPLOAD } = props
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string
  const [extFiles, setExtFiles] = useState<ExtFile[]>([])
  const [imageSrc, setImageSrc] = useState<File | string | undefined>(undefined)
  const [videoSrc, setVideoSrc] = useState<File | string | undefined>(undefined)
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setExtFiles(incommingFiles)
  }
  const onDelete = (id: FileMosaicProps['id']) => {
    setExtFiles(extFiles.filter((x) => x.id !== id))
  }
  const handleSee = (imageSource: File | string | undefined) => {
    setImageSrc(imageSource)
  }
  const handleWatch = (videoSource: File | string | undefined) => {
    setVideoSrc(videoSource)
  }
  const handleStart = (filesToUpload: ExtFile[]) => {}
  const handleFinish = (uploadedFiles: ExtFile[]) => {
    uploadSuccessCb()
  }
  const handleAbort = (id: FileMosaicProps['id']) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' }
        } else return { ...ef }
      })
    )
  }
  const handleCancel = (id: FileMosaicProps['id']) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined }
        } else return { ...ef }
      })
    )
  }
  return (
    <FileUpdateContainer>
      <Dropzone
        onChange={updateFiles}
        minHeight="195px"
        value={extFiles}
        maxFiles={maxFiles}
        maxFileSize={MAX_FILE_SIZE}
        // FmaxFileSize={2998000 * 20}
        label="Drag'n drop files here or click to browse"
        // accept=".png,image/*, video/*"
        uploadConfig={{
          // autoUpload: true
          url: BASE_URL + requests.uploadAttachment(cardId, boardId),
          cleanOnUpload: true,
          headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: `Bearer ${localStorage.getItem(
              import.meta.env.VITE_USER_TOKEN_KEY
            )}`
          },
          method: 'POST',
          uploadLabel: 'files'
        }}
        footerConfig={{
          customMessage: `Only accept ${ACCEPTS_EXTENSIONS.join(', ')} files`
        }}
        onUploadStart={handleStart}
        accept={ACCEPT_FILES.join(',')}
        onUploadFinish={handleFinish}
        cleanFiles
        actionButtons={{
          position: 'after',
          abortButton: {},
          deleteButton: {},
          uploadButton: {}
        }}>
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}>
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </FileUpdateContainer>
  )
}
