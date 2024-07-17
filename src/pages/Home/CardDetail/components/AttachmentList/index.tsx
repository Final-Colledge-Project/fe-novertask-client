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

  const downloadFile = (url: string, name: string) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'

    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = xhr.response
        const urlCreator = window.URL || window.webkitURL
        const downloadUrl = urlCreator.createObjectURL(blob)

        const tag = document.createElement('a')
        tag.href = downloadUrl
        tag.download = name

        document.body.appendChild(tag)
        tag.click()
        document.body.removeChild(tag)
      } else {
        console.error(
          'Failed to download file. Server returned status:',
          xhr.status
        )
      }
    }

    xhr.onerror = function () {
      console.error('Failed to download file. Network error occurred.')
    }

    xhr.send()
  }

  const handleDownloadAttachment = async (name: string) => {
    if (!card || !boardId) return
    try {
      const res = await downloadAttachment({
        boardId,
        cardId: card._id,
        fileName: name
      })
      const url = res?.data?.data
      downloadFile(url, name)
      // if (res) {
      //   enqueueSnackbar('Download attachment successfully', {
      //     variant: 'success'
      //   })
      // }
    } catch (e) {
      console.log('~~~~~~>e', e)
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
