import type { ReactNode } from 'react';
import Zoom from 'react-medium-image-zoom';

interface HeroImageZoomProps {
  children: ReactNode;
  className?: string;
  zoomLabel: string;
  unzoomLabel: string;
  /** A larger rendition shown once zoomed, so full-screen stays sharp. */
  zoomSrc?: string;
}

export default function HeroImageZoom({
  children,
  className,
  zoomLabel,
  unzoomLabel,
  zoomSrc,
}: HeroImageZoomProps) {
  return (
    <div className={className}>
      <Zoom
        a11yNameButtonZoom={zoomLabel}
        a11yNameButtonUnzoom={unzoomLabel}
        zoomMargin={24}
        // srcSet too: the zoomed image otherwise keeps the thumbnail's srcset.
        zoomImg={zoomSrc ? { src: zoomSrc, srcSet: `${zoomSrc} 2400w`, sizes: '100vw' } : undefined}
      >
        {children}
      </Zoom>
    </div>
  );
}
