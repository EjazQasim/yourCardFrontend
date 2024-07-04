import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImage } from 'src/@core/utils/imageUtils'

const ImageCropper = ({ file, setFile, setCroppedImage, aspect = 1 }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const cropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImage(file, croppedAreaPixels)
        if (croppedImage) {
          setCroppedImage(croppedImage)
          setFile(null)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [file, setFile, croppedAreaPixels, setCroppedImage])

  return (
    <Dialog
      open={file !== null}
      onClose={() => {
        setFile(null)
      }}
    >
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <div
          style={{
            position: 'relative',
            width: 250,
            height: 250,
            backgroundColor: '#ffffff'
          }}
        >
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={cropImage}>Crop</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageCropper
