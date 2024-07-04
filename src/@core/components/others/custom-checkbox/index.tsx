import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

type CustomCheckboxProps = {
  label?: any
  name?: string
  control: any
  error?: any
}

function CustomCheckbox({ label, name, control, error }: CustomCheckboxProps) {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <FormControlLabel
        label={label}
        control={
          <Controller
            name={name || ''}
            control={control}
            render={({ field }) => (
              <Checkbox onChange={(e: any) => field.onChange(e.target.checked)} checked={Boolean(field.value)} />
            )}
          />
        }
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </FormControl>
  )
}

export default CustomCheckbox
