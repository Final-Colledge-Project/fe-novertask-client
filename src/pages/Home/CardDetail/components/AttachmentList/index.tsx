import { ICard } from '~/services/types'
import { DataList } from './styled'
import Attachment from './Attachment'
import { deleteAttachment, downloadAttachment } from '~/services/cardService'
import { enqueueSnackbar } from 'notistack'

interface IProps {
  card: ICard
  boardId: string
  uploadSuccessCb: () => Promise<void> | void
}

export default function AttachmentList(props: Readonly<IProps>) {
  const { card, boardId, uploadSuccessCb } = props

  const handleDeleteAttachment = async (name: string) => {
    if (!card || !boardId) return
    try {
      const res = await deleteAttachment({
        boardId,
        cardId: card._id,
        fileName: name
      })
      if (res) {
        enqueueSnackbar('Delete attachment successfully', {
          variant: 'success'
        })
        await uploadSuccessCb()
      }
    } catch (e) {
      // handle err
    }
  }

  const handleDownloadAttachment = async (name: string) => {
    if (!card || !boardId) return
    try {
      const res = await downloadAttachment({
        boardId,
        cardId: card._id,
        fileName: name
      })
      if (res) {
        enqueueSnackbar('Download attachment successfully', {
          variant: 'success'
        })
      }
    } catch (e) {
      // handle err
    }
  }

  return (
    <DataList>
      {card.attachments?.map((attachment) => (
        <Attachment
          key={attachment.fileUrl}
          attachment={attachment}
          onDelete={handleDeleteAttachment}
          onDownload={handleDownloadAttachment}
        />
      ))}
    </DataList>
  )
}
