import { FormControl, FormHelperText } from '@mui/material'
import React from 'react'
import { useController, FieldValues } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

interface PhoneFieldProps<T> {
  name: keyof T
  control: any
  label?: string
  type?: string
  accept?: string
  errors?: any
  hidden?: boolean
}

const PhoneField = <T extends FieldValues>({ name, control, label, errors, hidden }: PhoneFieldProps<T>) => {
  const { field } = useController({
    name: name as string,
    control,
    defaultValue: ' '
  })

  return (
    <FormControl fullWidth style={{ marginBottom: 10, textAlign: 'left' }} hidden={hidden}>
      <PhoneInput
        {...field}
        country='au'
        value={field.value || ''}
        inputStyle={{
          fontSize: 16,
          width: '100%',
          height: '55px'
        }}
        specialLabel={label}
      />
      {errors && errors[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

export default PhoneField
