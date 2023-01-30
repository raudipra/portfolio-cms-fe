import React, { useState, useRef, useEffect, DependencyList } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import {
  Input,
  Row,
  Col,
} from "reactstrap";
import { canvasPreview } from './canvasPreview'

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}

function ImageUploader() {
  const [imgSrc, setImgSrc] = useState(null)
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)
	
	// Useful resource: https://bbbootstrap.com/snippets/image-drag-and-drop-upload-using-tailwind-css-remove-option-76647320#

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const { width, height } = imgRef.current
      setAspect(16 / 9)
      setCrop(centerAspectCrop(width, height, 16 / 9))
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        <div className="p-3 md:w-auto rounded-md">
					<div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
						<input type="file" accept="image/*" onChange={onSelectFile} className="h-full w-full opacity-0 z-10 absolute" name="files[]" />
						<div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
							<div className="flex flex-col">
								<i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
								<p>Drag and Drop a file</p>
							</div>
						</div>
					</div>
				</div>
				{imgSrc &&
					<div className="pl-lg-4">
						<Row>
							<Col md="4">
								<div>
									<p class="mb-2"><small>Scale: {scale}</small></p>
									<input 
										id="scale-input" 
										type="range"
										min="0.1" 
										max="2.0"
										step="0.1"
										value={scale}
										disabled={!imgSrc}
										class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
										onChange={(e) => setScale(Number(e.target.value))}
									/>
								</div>
							</Col>
							<Col md="4">
								<div>
									<p class="mb-2"><small>Rotation: {rotate}</small></p>
									<input 
										id="rotate-input" 
										type="range"
										min="0" 
										max="360"
										value={rotate}
										disabled={!imgSrc}
										class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
										onChange={(e) =>
											setRotate(Math.min(360, Number(e.target.value)))
										}
									/>
								</div>
							</Col>
							<Col md="4">
								<div className="text-center">
									<p class="mb-2"><small>Aspect Ratio</small></p>
									<label class="custom-toggle">
										<input 
											type="checkbox" 
											checked={aspect}
											onClick={handleToggleAspectClick}
										/>
										<span class="custom-toggle-slider rounded-circle"></span>
									</label>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								{!!imgSrc && (
									<ReactCrop
										crop={crop}
										onChange={(_, percentCrop) => setCrop(percentCrop)}
										onComplete={(c) => setCompletedCrop(c)}
										aspect={aspect}
									>
										<img
											ref={imgRef}
											alt="Crop me"
											src={imgSrc}
											style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
											onLoad={onImageLoad}
										/>
									</ReactCrop>
								)}
							</Col>
							<Col md="6">
								<div>
									{!!completedCrop && (
										<canvas
											ref={previewCanvasRef}
											style={{
												border: '1px solid black',
												objectFit: 'contain',
												width: completedCrop.width,
												height: completedCrop.height,
											}}
										/>
									)}
								</div>
							</Col>
						</Row>
					</div>
				}
      </div>
		</div>
  )
}

export default ImageUploader;