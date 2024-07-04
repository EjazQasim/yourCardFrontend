import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FaXmark } from 'react-icons/fa6'
import { FaPencilAlt } from 'react-icons/fa'

import { getImageUrl } from 'src/@core/utils/imageUrlUtils'
import { isNullOrEmpty } from 'src/@core/utils/miscUtils'
import ImageCropper from './ImageCropper'
import Dropzone from 'react-dropzone'

const ImagePickerContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '10px'
}))

const CloseIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: 'whitesmoke',
  '&:hover': {
    backgroundColor: 'whitesmoke'
  }
}))

interface ImagePickerProps {
  id: string
  label: string
  image?: any
  setImage: any
  placeholder?: string
  rectangle?: boolean
  disabled?: boolean
  editButton?: boolean
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  id,
  label,
  placeholder,
  image,
  setImage,
  rectangle,
  disabled,
  editButton
}) => {
  const [file, setFile] = useState<any>(null)

  const dragImageSrc = rectangle
    ? '/images/placeholders/pick-image-rectangle.png'
    : '/images/placeholders/pick-image-square.jpg'

  const placeholderImage = placeholder || dragImageSrc
  const imgSrc = (image instanceof File ? URL.createObjectURL(image) : getImageUrl(image)) || placeholderImage
  const handleCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setFile(null)
    setImage('')
  }

  return (
    <>
      <ImagePickerContainer>
        <strong>{label}</strong>
        <Dropzone onDrop={acceptedFiles => setFile(URL.createObjectURL(acceptedFiles[0]))} disabled={disabled}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <Box sx={{ position: 'relative', display: 'inline-block' }} {...getRootProps()}>
              <img
                src={isDragActive ? dragImageSrc : imgSrc}
                alt=''
                style={
                  rectangle
                    ? {
                        width: '100%',
                        height: '120px',
                        borderRadius: '20px'
                      }
                    : {
                        width: '120px',
                        height: '120px',
                        borderRadius: '60px'
                      }
                }
              />

              {editButton && (
                <IconButton
                  style={{
                    fontSize: '20px',
                    position: 'absolute',
                    top: '70%',
                    left: '70%',
                    borderRadius: '50%', // Adjust the border radius as needed
                    border: '1px solid grey' // Add border to give a border radius effect
                  }}
                >
                  <FaPencilAlt />
                </IconButton>
              )}

              {!isNullOrEmpty(image) && (
                <CloseIconButton onClick={handleCloseButtonClick} size='small'>
                  <FaXmark />
                </CloseIconButton>
              )}
              <input hidden type='file' accept='image/*' id={id} {...getInputProps()} />
            </Box>
          )}
        </Dropzone>
      </ImagePickerContainer>
      <ImageCropper file={file} setFile={setFile} setCroppedImage={setImage} aspect={rectangle ? 1.5 : 1} />
    </>
  )
}

export default ImagePicker
