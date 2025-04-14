interface ImageProps {
  url?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Image = ({
  url = 'placeholder.png',
  alt = '',
  className = '',
  width = 256,
  height = 256
}: ImageProps) => {
  return (
    <div className={`w-full h-full max-w-[320px] max-h-[320px] aspect-square mx-auto border border-blue-300 bg-blue-200 ${className}`}>
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="object-cover max-w-[320px] max-h-[320px] w-full h-full"
      />
    </div>
  )
}
