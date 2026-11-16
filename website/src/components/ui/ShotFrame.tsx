import type { CSSProperties, ReactNode } from 'react';

/** Background colour profiles. Each has a light and a muted dark version (global.css, "Shot frame"). */
export const SHOT_FRAME_PROFILES = ['sky', 'peach', 'mint', 'sun', 'lavender', 'rose'] as const;
export type ShotFrameProfile = (typeof SHOT_FRAME_PROFILES)[number];

/** Where the window sits on the gradient. The corner it points to is cut off by the frame. */
export type ShotFramePosition = 'bottom-right' | 'bottom-left' | 'center';

interface ShotFrameProps {
  /** Gradient colour profile. */
  profile?: ShotFrameProfile;
  /** Where the screenshot sits. bottom-right (default): gradient on the top and left, window bleeds off the bottom-right. */
  position?: ShotFramePosition;
  /** How large the window is drawn, relative to the frame width (1.4 = 140%, a close crop). Ignored for "center". */
  scale?: number;
  /** Frame shape, as a CSS aspect-ratio. */
  aspect?: string;
  className?: string;
  /** The screenshot: an <img>, or an <img> wrapped in a zoom component. */
  children?: ReactNode;
  /** Or pass the image directly. */
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
}

/**
 * A screenshot presented ShotCandy-style: a soft mesh gradient with the app
 * window placed on it, drawn larger than the frame and cropped by its edges.
 * Pure HTML and CSS: works with any screenshot, light or dark.
 */
export default function ShotFrame({
  profile = 'sky',
  position = 'bottom-right',
  scale = 1.4,
  aspect = '16 / 10',
  className,
  children,
  src,
  srcSet,
  sizes,
  alt = '',
}: ShotFrameProps) {
  const style = { '--sc-scale': scale, aspectRatio: aspect } as CSSProperties;
  return (
    <div className={['sc', `sc-${profile}`, `sc-pos-${position}`, className].filter(Boolean).join(' ')} style={style}>
      <div className="sc-stage">
        {children ?? <img className="sc-img" src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" />}
      </div>
    </div>
  );
}
