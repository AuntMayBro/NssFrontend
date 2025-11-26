import { urlFor } from '@/lib/image';

const Image = ({ src, alt, className = '', eager = false, aspectRatio }) => {
  if (!src) {
    return (
      <div className={`bg-muted ${className}`} aria-label={alt}>
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          No image available
        </div>
      </div>
    );
  }

  const widths = [360, 640, 1024, 1600];
  
  const srcSet = widths
    .map(width => `${urlFor(src).width(width).auto('format').url()} ${width}w`)
    .join(', ');

  const defaultSrc = urlFor(src).width(1024).auto('format').url();

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes="(max-width: 640px) 360px, (max-width: 1024px) 640px, 1024px"
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      style={aspectRatio ? { aspectRatio } : undefined}
    />
  );
};

export default Image;
