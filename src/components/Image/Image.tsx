import { useEffect, useState } from 'react'
import { ImageContainer, StyledImage } from './Image.styled'

interface ImageProps {
  url?: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  containerClassName?: string;
}

export const Image = ({
  url = 'placeholder.png',
  alt = '',
  width = 256,
  height = 256,
  ...props
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(url || 'placeholder.png');

  useEffect(() => {
    setCurrentSrc(url || 'placeholder.png');
  }, [url]);

  const handleError = () => {
    setCurrentSrc('placeholder.png')
  };

  return (
    <ImageContainer {...props}>
      <StyledImage
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full aspect-square"
        onError={handleError}
        {...props}
      />
    </ImageContainer>
  );
};
