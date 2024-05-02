import { Button, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { StoreDispatchType } from '~/redux'
import { getAllByUserId } from '~/redux/boardSlice/actions'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { deleteBoard } from '~/services/boardService'
import { IBoard } from '~/services/types'

export default function DeleteProjectButton({
  projectId,
  board
}: {
  projectId: string
  board: IBoard
}) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()

  const toggleConfirmDialog = () => {
    setOpenConfirmDialog((prev) => !prev)
  }

  const onDeleteProject = async () => {
    dispatch(showLoading())
    try {
      if (!projectId || !board._id) throw new Error('Project ID is not found')
      const res = await deleteBoard({ boardId: projectId })
      if (res) {
        enqueueSnackbar('Delete project successfully', { variant: 'success' })
        navigate('/u')
        dispatch(getAllByUserId())
      }
    } catch (err) {
      enqueueSnackbar((err as Error).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
      toggleConfirmDialog()
    }
  }

  return (
    <div>
      <Button
        sx={{ marginTop: 'auto' }}
        variant="outlined"
        size="medium"
        color="error"
        fullWidth
        startIcon={<RiDeleteBin6Line />}
        onClick={toggleConfirmDialog}
      >
        Delete
      </Button>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={toggleConfirmDialog}
        title="Delete project"
        onConfirm={onDeleteProject}
        content={
          <p>
            Are you sure you want to delete project{' '}
            <Typography display={'inline'} fontWeight={600} color="error">
              {board.title}
            </Typography>{' '}
          </p>
        }
      />
    </div>
  )
}
