import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ImageLoader.css";

const ImageLoader = ({ src, alt, ...rest }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const onImageLoad = () => setIsImageLoading(false);

  return (
    <div className="ImageLoader">
      <img src={src} alt={alt} onLoad={onImageLoad} {...rest} />
      {isImageLoading && (
        <span className="ImageLoader__loader">
          <CircularProgress disableShrink size={50} />
        </span>
      )}
    </div>
  );
};

export default ImageLoader;
