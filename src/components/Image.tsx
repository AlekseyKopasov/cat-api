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
    <div className='w-64 h-64 p-5 border border-blue-300 bg-blue-200'>
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover max-w-full h-auto ${className}`}
      />
    </div>
  )
}
