import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import Icon from '../icon'

interface CustomAlertProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  handleSuccess: () => void
}

const Alert: React.FC<CustomAlertProps> = ({ show, setShow, message, handleSuccess }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={show}
      onClose={() => {
        setShow(false)
      }}
    >
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>{message}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant='contained' onClick={handleSuccess}>
          Yes
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => {
            setShow(false)
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alert
