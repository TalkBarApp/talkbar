import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Controlled as ControlledZoom, type ControlledProps } from 'react-medium-image-zoom';

type ZoomContentProps = Parameters<NonNullable<ControlledProps['ZoomContent']>>[0];

export interface GalleryItem {
  id: string;
  thumb: string;
  thumbSrcSet: string;
  full: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Temporary screenshot: shows its "Temp · id" label. */
  temp: boolean;
}

interface GalleryLabels {
  prev: string;
  next: string;
  /** "{current} of {total}" */
  counter: string;
  /** "Expand {label} screenshot" */
  zoom: string;
  /** "Close {label} screenshot" */
  unzoom: string;
  /** Accessible name for the row. */
  region: string;
  /** Accessible name for the progress bar, which also scrubs the row. */
  scrub: string;
}

interface ScreenshotGalleryProps {
  items: GalleryItem[];
  labels: GalleryLabels;
}

// Upper bound on waiting for the open image to settle back into the row.
const SWAP_TIMEOUT_MS = 1200;
// Thumbnails visible on first paint load straight away; the rest load lazily.
const EAGER_THUMBS = 4;

// The zoom library locks page scroll per dialog, so the next image may only
// open once the current dialog has fully closed.
const whenZoomClosed = (done: () => void) => {
  const start = performance.now();
  const tick = () => {
    const stillOpen = document.querySelector('dialog[data-rmiz-modal][open]');
    if (!stillOpen || performance.now() - start > SWAP_TIMEOUT_MS) done();
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  );
}

export default function ScreenshotGallery({ items, labels }: ScreenshotGalleryProps) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    duration: 26,
  });
  const swapping = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleShare, setVisibleShare] = useState(0.3);
  const [snap, setSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(1);
  const scrubbing = useRef(false);
  const [open, setOpen] = useState<number | null>(null);
  const total = items.length;

  // Leave room under the full-size image for the caption bar on wider screens.
  const [zoomMargin, setZoomMargin] = useState(24);
  useEffect(() => {
    const fit = () => setZoomMargin(window.innerWidth >= 640 ? 88 : 16);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      setProgress(Math.min(1, Math.max(0, embla.scrollProgress())));
      setVisibleShare(Math.max(0.12, Math.min(1, embla.slidesInView().length / total)));
      setSnap(embla.selectedScrollSnap());
      setSnapCount(embla.scrollSnapList().length);
    };
    update();
    embla.on('select', update).on('scroll', update).on('reInit', update).on('slidesInView', update);
    return () => {
      embla.off('select', update).off('scroll', update).off('reInit', update).off('slidesInView', update);
    };
  }, [embla, total]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(prefersReducedMotion()), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(prefersReducedMotion()), [embla]);

  // Bring a slide into view at once: find the snap that holds it (the last
  // few slides share the final snap).
  const showSlide = useCallback(
    (index: number) => {
      if (!embla) return;
      const snap = embla.internalEngine().slideRegistry.findIndex((group) => group.includes(index));
      embla.scrollTo(snap === -1 ? index : snap, true);
    },
    [embla],
  );

  // While zoomed, step to the neighbouring screenshot: close this one, bring
  // the next into the row, wait for its thumbnail, then open it.
  const step = useCallback(
    (dir: -1 | 1) => {
      if (open === null) return;
      const next = open + dir;
      if (next < 0 || next >= total || swapping.current) return;
      swapping.current = true;
      setOpen(null);
      whenZoomClosed(() => {
        showSlide(next);
        const img = embla?.slideNodes()[next]?.querySelector('img');
        const openNext = () => {
          swapping.current = false;
          setOpen(next);
        };
        if (!img || (img.complete && img.naturalWidth > 0)) return openNext();
        img.loading = 'eager';
        const timer = setTimeout(openNext, SWAP_TIMEOUT_MS);
        img.addEventListener('load', () => { clearTimeout(timer); openNext(); }, { once: true });
      });
    },
    [open, total, embla, showSlide],
  );
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step]);

  const onViewportKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    }
  };

  const counter = (current: number) =>
    labels.counter.replace('{current}', String(current)).replace('{total}', String(total));

  // One stable component per screenshot, so the full-screen bar is not
  // remounted while the row re-renders.
  const zoomContents = useMemo(
    () =>
      items.map((item, i) => {
        function GalleryZoomContent({ img, buttonUnzoom, modalState }: ZoomContentProps) {
          return (
            <>
              {buttonUnzoom}
              {img}
              <div className="gal-zoom-bar" data-state={modalState}>
                <button type="button" className="gal-btn gal-btn-ink" onClick={() => stepRef.current(-1)} disabled={i === 0} aria-label={labels.prev}>
                  <Chevron dir="left" />
                </button>
                <p className="gal-zoom-cap">
                  {item.caption}
                  <span>{counter(i + 1)}</span>
                </p>
                <button type="button" className="gal-btn gal-btn-ink" onClick={() => stepRef.current(1)} disabled={i === total - 1} aria-label={labels.next}>
                  <Chevron dir="right" />
                </button>
              </div>
            </>
          );
        }
        return GalleryZoomContent;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, labels, total],
  );

  const thumbWidth = visibleShare * 100;

  // The progress bar doubles as pagination: click or drag along it and the
  // row follows, with the thumb centred where the pointer is.
  const snapAt = (clientX: number, bar: HTMLElement) => {
    const rect = bar.getBoundingClientRect();
    const share = visibleShare;
    const x = (clientX - rect.left) / rect.width;
    const p = share >= 1 ? 0 : Math.min(1, Math.max(0, (x - share / 2) / (1 - share)));
    return Math.round(p * (snapCount - 1));
  };
  const scrubTo = (target: number, instant = false) => {
    if (!embla || target === embla.selectedScrollSnap()) return;
    embla.scrollTo(target, instant || prefersReducedMotion());
  };
  const onScrubDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    scrubbing.current = true;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* pointer already gone */ }
    scrubTo(snapAt(event.clientX, event.currentTarget));
  };
  const onScrubMove = (event: PointerEvent<HTMLDivElement>) => {
    if (scrubbing.current) scrubTo(snapAt(event.clientX, event.currentTarget));
  };
  const onScrubUp = (event: PointerEvent<HTMLDivElement>) => {
    scrubbing.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onScrubKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowLeft: snap - 1,
      ArrowDown: snap - 1,
      ArrowRight: snap + 1,
      ArrowUp: snap + 1,
      Home: 0,
      End: snapCount - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    scrubTo(Math.min(snapCount - 1, Math.max(0, moves[event.key])));
  };

  return (
    <div className="gal">
      <div className="container gal-controls">
        <div
          className="gal-progress"
          role="slider"
          tabIndex={0}
          aria-label={labels.scrub}
          aria-valuemin={1}
          aria-valuemax={snapCount}
          aria-valuenow={snap + 1}
          aria-valuetext={labels.counter.replace('{current}', String(snap + 1)).replace('{total}', String(snapCount))}
          onPointerDown={onScrubDown}
          onPointerMove={onScrubMove}
          onPointerUp={onScrubUp}
          onPointerCancel={onScrubUp}
          onKeyDown={onScrubKey}
        >
          <i style={{ width: `${thumbWidth}%`, left: `${progress * (100 - thumbWidth)}%` }} />
        </div>
        <div className="gal-buttons">
          <button type="button" className="gal-btn" onClick={scrollPrev} disabled={!canPrev} aria-label={labels.prev}>
            <Chevron dir="left" />
          </button>
          <button type="button" className="gal-btn" onClick={scrollNext} disabled={!canNext} aria-label={labels.next}>
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="gal-viewport"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.region}
        onKeyDown={onViewportKey}
      >
        <ul className="gal-track">
          {items.map((item, i) => (
            <li key={item.id} className="gal-card" data-shot={item.id} aria-roledescription="slide" aria-label={counter(i + 1)}>
              <div className="gal-frame">
                <ControlledZoom
                  isZoomed={open === i}
                  // A closing dialog reports late; only let it clear its own image.
                  onZoomChange={(zoomed) => setOpen((current) => (zoomed ? i : current === i ? null : current))}
                  zoomImg={{ src: item.full, srcSet: `${item.full} 2400w`, sizes: '100vw', alt: item.alt }}
                  zoomMargin={zoomMargin}
                  a11yNameButtonZoom={labels.zoom.replace('{label}', item.caption)}
                  a11yNameButtonUnzoom={labels.unzoom.replace('{label}', item.caption)}
                  ZoomContent={zoomContents[i]}
                >
                  <img
                    className="gal-img"
                    src={item.thumb}
                    srcSet={item.thumbSrcSet}
                    sizes="(min-width: 1024px) 440px, 80vw"
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={i < EAGER_THUMBS ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </ControlledZoom>
                {item.temp && (
                  <span className="shot-tag" aria-hidden="true">
                    Temp · {item.id}
                  </span>
                )}
              </div>
              <p className="gal-cap">{item.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
