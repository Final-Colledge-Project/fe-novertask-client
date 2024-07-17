import { IAttachment } from '~/services/types'
import {
  Actions,
  AttachmentContainer,
  AttachmentName,
  AttachmentReview
} from './styles'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { RiDeleteBin5Line, RiDownload2Line, RiEyeLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import { useState } from 'react'

interface IProps {
  attachment: IAttachment
  onDelete: (name: string) => Promise<void> | void
  onDownload: (name: string) => Promise<void> | void
}

export default function Attachment(props: IProps) {
  const { attachment, onDelete, onDownload } = props
  const DATE_FORMAT = 'DD MMM YYYY, h:mm A'
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const isImage = () => attachment.fileType.includes('image')

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(attachment.fileName)
    setIsDeleting(false)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    await onDownload(attachment.fileName)
    setIsDownloading(false)
  }

  return (
    <AttachmentContainer>
      <AttachmentReview>
        <img src={attachment.fileUrl} alt="Can't load" />
      </AttachmentReview>
      <Tooltip arrow title={attachment.fileName} placement="bottom-start">
        <AttachmentName $isImage={isImage()}>
          <p className="name">{attachment.fileName}</p>
          <p className="date">
            {dayjs(attachment.createAt).format(DATE_FORMAT)}
          </p>
        </AttachmentName>
      </Tooltip>
      <Actions>
        <Tooltip arrow title="Review">
          <IconButton size="small">
            <RiEyeLine />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Download this file">
          <IconButton
            size="small"
            onClick={handleDownload}
            disabled={isDownloading}>
            {isDownloading ? (
              <CircularProgress size={18} />
            ) : (
              <RiDownload2Line />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Delete this file">
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={18} /> : <RiDeleteBin5Line />}
          </IconButton>
        </Tooltip>
      </Actions>
    </AttachmentContainer>
  )
}
