import React from 'react'
import { FormControl } from '@mui/material'
import { CirclePicker } from 'react-color'

interface ColorPickerProps {
  label: string
  setValue: any
}

function ColorPicker({ label, setValue }: ColorPickerProps) {
  return (
    <FormControl fullWidth sx={{ mb: 4, width: '200px' }}>
      <p>{label}</p>
      <CirclePicker
        width='300px'
        colors={['#F0F0F0', '#FF0000', '#FFA500', '#FFFF00', '#0000FF', '#00FF00', '#808080']}
        onChangeComplete={(color: any) => {
          const { hex } = color
          setValue(hex)
        }}
      />
    </FormControl>
  )
}

export default ColorPicker
