import React, { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useController } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { compressImage } from 'src/@core/utils/imageUtils'

interface InputFieldProps {
  size?: 'small' | 'medium'
  name: string
  label: string
  control: any
  type?: any
  accept?: string
  errors?: Record<string, any>
  setValue?: any
  hidden?: boolean
  options?: Array<{ label: string; value: any }>
  inputProps?: any
  disabled?: boolean
  autoComplete?: any
  rows?: any
  multiline?: any
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  control,
  type = 'text',
  accept,
  errors,
  setValue,
  hidden,
  options,
  inputProps,
  ...rest
}) => {
  const {
    field,
    fieldState: { invalid, isTouched }
  } = useController({
    name,
    control,
    defaultValue: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue && event.target.files) {
      let selectedFile: any = event.target.files[0]
      if (selectedFile) {
        const fileType = selectedFile.type
        if (fileType.startsWith('image/')) {
          const compressedFile: any = await compressImage(selectedFile)
          selectedFile = compressedFile
        }
      }
      setValue(name, selectedFile)
    }
  }

  const renderInputField = () => {
    switch (type) {
      case 'file':
        return (
          <TextField
            type='file'
            inputProps={{ accept }}
            onChange={handleFileChange}
            error={invalid && isTouched}
            {...rest}
          />
        )
      case 'select':
        return (
          <>
            <InputLabel>{label}</InputLabel>
            <Select label={label} {...field} {...rest}>
              {options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )
      case 'date':
        return (
          <TextField
            label={label}
            type={type}
            inputProps={inputProps}
            {...field}
            error={invalid && isTouched}
            {...rest}
          />
        )
      case 'password':
        return (
          <TextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              ...inputProps,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility} edge='end' size='small'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...field}
            error={invalid && isTouched}
            {...rest}
          />
        )
      default:
        return (
          <TextField
            label={label}
            type={type}
            inputProps={inputProps}
            {...field}
            error={invalid && isTouched}
            {...rest}
          />
        )
    }
  }

  return (
    <FormControl fullWidth sx={{ mb: 1, textAlign: 'left' }} hidden={hidden}>
      {renderInputField()}
      {errors?.[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

export default InputField
