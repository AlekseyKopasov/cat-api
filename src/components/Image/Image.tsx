import { useState } from 'react';

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
  containerClassName = '',
  ...props
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(url || 'placeholder.png');

  const handleError = () => {
    setCurrentSrc('placeholder.png');
  };

  return (
    <div className={`w-[320px] mx-auto border border-blue-300 bg-blue-200 ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full aspect-square"
        onError={() => setCurrentSrc('placeholder.png')}
        {...props}
      />
    </div>
  );
};
