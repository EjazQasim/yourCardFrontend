import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, Control } from 'react-hook-form'

interface CustomUploadFieldProps {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  control: Control<any>
  name: string
  error: any
}

const CustomUploadField: React.FC<CustomUploadFieldProps> = ({ setFile, control, name, error }) => {
  const handleInputFileChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = file.target
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        control={control}
        name={name}
        render={() => <input type='file' onChange={handleInputFileChange} accept='.pdf' />}
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </FormControl>
  )
}

export default CustomUploadField
