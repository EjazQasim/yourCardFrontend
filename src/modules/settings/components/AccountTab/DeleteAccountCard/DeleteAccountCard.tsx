import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Icon from 'src/@core/components/icon'

const DeleteAccountCard = () => {
  const { logout }: any = useAuth()
  const [open, setOpen] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: { checkbox: false },
    mode: 'onBlur'
  })

  const handleClose = () => setOpen(false)

  const handleDeleteAccount = () => {
    logout()
  }

  return (
    <>
      <Card>
        <CardHeader title='Account Deletion' />
        <CardContent>
          <form onSubmit={handleSubmit(() => setOpen(true))}>
            <Box sx={{ mb: 4 }}>
              <FormControl>
                <Controller
                  name='checkbox'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControlLabel
                      label='I confirm my account deactivation'
                      sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                      control={
                        <Checkbox
                          {...field}
                          size='small'
                          name='validation-basic-checkbox'
                          sx={errors.checkbox ? { color: 'error.main' } : null}
                        />
                      }
                    />
                  )}
                />
                {errors.checkbox && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                    Please confirm you want to delete account
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Button
              variant='contained'
              color='error'
              type='submit'
              disabled={errors.checkbox !== undefined}
              startIcon={<Icon icon='mdi:trash' />}
            >
              Deactivate Account
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>Are you sure you would like to deactivate your account?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={handleDeleteAccount}>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteAccountCard
