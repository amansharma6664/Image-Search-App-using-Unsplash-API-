import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const useImageContext = () => {
  return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ImageContext.Provider value={{ images, setImages, loading, setLoading, error, setError }}>
      {children}
    </ImageContext.Provider>
  );
};
