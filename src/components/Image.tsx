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
    <div className="max-w-xs p-5 mx-auto border border-blue-300 bg-blue-200">
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover w-full h-full ${className}`}
      />
    </div>
  )
}
