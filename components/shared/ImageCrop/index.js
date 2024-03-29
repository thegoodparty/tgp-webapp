/**
 *
 * ImageCrop
 *
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';

import { H3, Body13 } from '../typogrophy';
import BlackButton from '../buttons/BlackButton';

const CanvasWrapper = styled.div`
  overflow: hidden;
  border: solid 2px #333;
  border-radius: 50%;
  maring: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  margin: 1.5rem auto;
`;

const Error = styled.div`
  color: red;
  padding: 8px 0;
`;

const pixelRatio = 4;

function ImageCrop({
  uploadImageCallback,
  loading,
  currentImage,
  showTitle = true,
  withPreview = true,
  label = 'UPLOAD IMAGE',
  additionalButton,
}) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [error, setError] = useState(false);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setError(false);
      if (!file) {
        e.target.value = null;
        setError('No file selected');
        return false;
      }
      if (file.size > 1000000) {
        e.target.value = null;
        setError('File size cannot exceed 1MB');
        return false;
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    setCanvasWidth(crop.width);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  const handleUpload = () => {
    setUpImg(null);
    const canvas = previewCanvasRef.current;
    uploadImageCallback(canvas.toDataURL('image/jpeg'));
  };

  return (
    <div>
      <div className="text-center">
        {showTitle && <H3>Upload a New Image</H3>}
        {currentImage && (
          <Body13>
            Existing image:{' '}
            <a href={currentImage} targe="_blank">
              {currentImage}
            </a>
          </Body13>
        )}
        <br />
        <input type="file" accept="image/*" onChange={onSelectFile} />
        {error && <Error>{error}</Error>}
      </div>
      <br />
      {upImg && !loading && (
        <>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12}>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={
                withPreview
                  ? {}
                  : {
                      opacity: 0,
                      position: 'absolute',
                      left: '-3000px',
                    }
              }
            >
              <CanvasWrapper
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasWidth}px`,
                }}
              >
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: completedCrop?.width ?? 0,
                    height: completedCrop?.height ?? 0,
                  }}
                />
              </CanvasWrapper>
            </Grid>
          </Grid>
          <ButtonWrapper onClick={handleUpload}>
            {additionalButton || ''} &nbsp;
            <BlackButton fullWidth>{label}</BlackButton>
          </ButtonWrapper>
        </>
      )}
    </div>
  );
}

ImageCrop.propTypes = {
  uploadImageCallback: PropTypes.func,
  loading: PropTypes.bool,
  currentImage: PropTypes.string,
  showTitle: PropTypes.bool,
  withPreview: PropTypes.bool,
  label: PropTypes.string,
  additionalButton: PropTypes.object,
};

export default ImageCrop;
