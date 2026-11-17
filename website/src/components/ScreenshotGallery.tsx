import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Controlled as ControlledZoom, type ControlledProps } from 'react-medium-image-zoom';
import ShotFrame from './ui/ShotFrame';
import { SHOT_FRAME_PROFILES, type ShotFrameProfile } from './ui/shotFrameProfiles';

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
  /** Dark-theme thumbnail, used when the page has the `dark` class. */
  thumbDark?: string;
  thumbSrcSetDark?: string;
  fullDark?: string;
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
  /** Accessible name for the category tabs. */
  categories?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  /** Background profile for this tab's cards. */
  profile?: ShotFrameProfile;
  /** Screenshot ids in this group. */
  ids: string[];
}

interface ScreenshotGalleryProps {
  items: GalleryItem[];
  labels: GalleryLabels;
  /** Tabs above the row; each shows only its own screenshots. */
  categories?: GalleryCategory[];
}

// Thumbnails visible on first paint load straight away; the rest load lazily.
const EAGER_THUMBS = 4;

// Which screenshot the open full-screen view shows. Arrows change it in place
// (a short fade), so the view stays open while you step through the row.
const ZoomView = createContext<{ view: number | null; srcs: string[] }>({ view: null, srcs: [] });

// The part of a gallery card's thumbnail that shows inside its frame, as a
// clip-path in the image's own pixels.
const cardCrop = (id: string) => {
  const card = document.querySelector(`.gal-card[data-shot="${id}"]`);
  const img = card?.querySelector('.gal-img');
  const frame = card?.querySelector('.sc');
  if (!img || !frame) return 'inset(0px 0px 0px 0px round 0px)';
  const r = img.getBoundingClientRect();
  const f = frame.getBoundingClientRect();
  const top = Math.max(0, f.top - r.top);
  const left = Math.max(0, f.left - r.left);
  const right = Math.max(0, r.right - f.right);
  const bottom = Math.max(0, r.bottom - f.bottom);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 8px)`;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Chevron({ dir, size = 18 }: { dir: 'left' | 'right'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  );
}

export default function ScreenshotGallery({ items: allItems, labels, categories }: ScreenshotGalleryProps) {
  const [category, setCategory] = useState(0);
  const items = useMemo(() => {
    const cat = categories?.[category];
    if (!cat) return allItems;
    return cat.ids.map((id) => allItems.find((item) => item.id === id)).filter((item): item is GalleryItem => !!item);
  }, [allItems, categories, category]);
  // Every screenshot in tab order, so the full-screen view can run on from one
  // tab into the next and loop back to the start.
  const tour = useMemo(() => {
    if (!categories) return allItems.map((item, idx) => ({ item, cat: 0, idx }));
    return categories.flatMap((cat, c) =>
      cat.ids
        .map((id) => allItems.find((item) => item.id === id))
        .filter((item): item is GalleryItem => !!item)
        .map((item, idx) => ({ item, cat: c, idx })),
    );
  }, [allItems, categories]);
  const tourStart = Math.max(0, tour.findIndex((t) => t.cat === category));
  // A slide to show once a tab switch (made from the full-screen view) lands.
  const pendingSlide = useRef<number | null>(null);
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    duration: 26,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleShare, setVisibleShare] = useState(0.3);
  const [snap, setSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(1);
  const scrubbing = useRef(false);
  const [open, setOpen] = useState<number | null>(null);
  // The screenshot shown while zoomed; starts as the opened one.
  const [view, setView] = useState<number | null>(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const total = items.length;
  // Each tab has its own colour profile; without tabs, cards cycle through them.
  const tabProfile = categories?.[category]?.profile;
  const profileFor = (i: number): ShotFrameProfile => tabProfile ?? SHOT_FRAME_PROFILES[i % SHOT_FRAME_PROFILES.length];

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDarkTheme(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // A small margin round the full-size image on wider screens: the arrows sit
  // beside it and the caption strip just under it.
  const [zoomMargin, setZoomMargin] = useState(24);
  useEffect(() => {
    const fit = () => setZoomMargin(window.innerWidth >= 640 ? 52 : 16);
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
      setSnap(embla.selectedScrollSnap());
      setSnapCount(embla.scrollSnapList().length);
    };
    // The thumb's size is the share of the row that fits on screen. It is
    // measured from the layout, so it stays put while the row moves and only
    // changes when the window (or the tab's screenshot count) does.
    const measure = () => {
      const slides = embla.slideNodes();
      const last = slides[slides.length - 1];
      const content = last ? last.offsetLeft + last.offsetWidth - (slides[0]?.offsetLeft ?? 0) : 0;
      const share = content > 0 ? embla.rootNode().clientWidth / content : 1;
      setVisibleShare(Math.max(0.12, Math.min(1, share)));
    };
    update();
    measure();
    embla.on('select', update).on('scroll', update).on('reInit', update);
    embla.on('reInit', measure).on('resize', measure);
    return () => {
      embla.off('select', update).off('scroll', update).off('reInit', update);
      embla.off('reInit', measure).off('resize', measure);
    };
  }, [embla, total]);

  // A new tab starts at its first screenshot (or at the one the full-screen
  // view ended on).
  useEffect(() => {
    if (!embla) return;
    embla.reInit();
    const pending = pendingSlide.current;
    pendingSlide.current = null;
    const snapOf = pending === null ? -1 : embla.internalEngine().slideRegistry.findIndex((group) => group.includes(pending));
    embla.scrollTo(Math.max(0, snapOf), true);
  }, [embla, category]);

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!categories) return;
    const moves: Record<string, number> = {
      ArrowRight: category + 1,
      ArrowLeft: category - 1,
      Home: 0,
      End: categories.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + categories.length) % categories.length;
    setCategory(next);
    const tab = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next];
    tab?.focus();
  };

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

  const fullSrc = useCallback(
    (item: GalleryItem) => (darkTheme && item.fullDark ? item.fullDark : item.full),
    [darkTheme],
  );
  const zoomSrcs = useMemo(() => tour.map((t) => fullSrc(t.item)), [tour, fullSrc]);

  // While zoomed, step to the neighbouring screenshot in place.
  const stepTarget = useRef<number | null>(null);
  const step = useCallback(
    (dir: -1 | 1) => {
      if (open === null || tour.length < 2) return;
      const from = stepTarget.current ?? view ?? tourStart + open;
      const next = (from + dir + tour.length) % tour.length;
      // Switch once the next image has loaded, so the fade never shows a blank.
      stepTarget.current = next;
      const img = new Image();
      img.src = zoomSrcs[next];
      const go = () => {
        if (stepTarget.current !== next) return;
        stepTarget.current = null;
        setView(next);
      };
      if (img.complete && img.naturalWidth > 0) return go();
      const timer = setTimeout(go, 2500);
      img.onload = img.onerror = () => {
        clearTimeout(timer);
        go();
      };
    },
    [open, view, tour.length, tourStart, zoomSrcs],
  );

  // Warm up the screenshots either side of the one in view.
  useEffect(() => {
    if (open === null || tour.length < 2) return;
    const at = view ?? tourStart + open;
    for (const d of [1, -1]) new Image().src = zoomSrcs[(at + d + tour.length) % tour.length];
  }, [open, view, tour.length, tourStart, zoomSrcs]);

  // Which screenshot was clicked to open the view.
  const opened = useRef<number | null>(null);
  useEffect(() => {
    if (open !== null) opened.current = tourStart + open;
  }, [open, tourStart]);

  // On closing: if the arrows moved to another screenshot that is out of
  // sight, bring it into the row, but only after the view has fully closed,
  // so nothing moves under the closing animation. `view` keeps the last
  // screenshot until the next open sets it again.
  const bringIntoRow = (target: number | null) => {
    stepTarget.current = null;
    const dest = target === null ? undefined : tour[target];
    if (target === opened.current || !embla || !dest) return;
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now;
      if (document.querySelector('dialog[data-rmiz-modal][open]') && now - start < 1500) {
        requestAnimationFrame(tick);
        return;
      }
      if (dest.cat !== category) {
        pendingSlide.current = dest.idx;
        setCategory(dest.cat);
      } else if (!embla.slidesInView().includes(dest.idx)) {
        showSlide(dest.idx);
      }
    };
    requestAnimationFrame(tick);
  };

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Swipe left or right in the full-screen view to step, like the arrows.
  useEffect(() => {
    if (open === null) return;
    let start: { x: number; y: number } | null = null;
    const onStart = (event: TouchEvent) => {
      const t = event.touches[0];
      start = event.touches.length === 1 && t ? { x: t.clientX, y: t.clientY } : null;
    };
    const onEnd = (event: TouchEvent) => {
      const t = event.changedTouches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) stepRef.current(dx < 0 ? 1 : -1);
    };
    // The same with a mouse: drag left or right. A drag must not also count as
    // the click that closes the view, and must not drag the image itself.
    let mouse: { x: number; y: number } | null = null;
    let swallowClick = false;
    const onDown = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      mouse = { x: event.clientX, y: event.clientY };
      swallowClick = false;
    };
    const onUp = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== 'mouse' || !mouse) return;
      const dx = event.clientX - mouse.x;
      const dy = event.clientY - mouse.y;
      mouse = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swallowClick = true;
        stepRef.current(dx < 0 ? 1 : -1);
      } else if (Math.hypot(dx, dy) > 8) {
        swallowClick = true;
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      event.stopPropagation();
      event.preventDefault();
    };
    const onDragStart = (event: DragEvent) => {
      if ((event.target as Element | null)?.closest?.('dialog[data-rmiz-modal]')) event.preventDefault();
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('click', onClick, true);
    document.addEventListener('dragstart', onDragStart);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('dragstart', onDragStart);
    };
  }, [open]);

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
          const { view: viewed, srcs } = useContext(ZoomView);
          // Positions are in the whole tour (all tabs), not just this tab.
          const own = tourStart + i;
          const current = viewed ?? own;
          // The last two screenshots shown, so the new one fades in over the old.
          const [layers, setLayers] = useState<{ cur: number; prev: number | null }>({ cur: own, prev: null });
          // Follow the arrows only while the view is open; freeze while it
          // closes, and start fresh once closed so the next open zooms normally.
          useEffect(() => {
            if (modalState === 'UNLOADED') {
              setLayers((l) => (l.cur === own && l.prev === null ? l : { cur: own, prev: null }));
            } else if (modalState !== 'UNLOADING') {
              setLayers((l) => (l.cur === current ? l : { cur: current, prev: l.cur }));
            }
          }, [current, modalState, own]);
          const swapped = layers.cur !== own || layers.prev !== null;
          const modalImg = img as ReactElement<{ style?: CSSProperties; className?: string }> | null;
          const box = modalImg?.props.style;
          // The card shows a cropped thumbnail. Clip the zoom image to that crop
          // at the start and end of the animation, so it grows out of (and back
          // into) exactly what the card shows.
          const atCard = modalState === 'UNLOADED' || modalState === 'UNLOADING';
          const clip = atCard ? cardCrop(item.id) : 'inset(0px 0px 0px 0px round 0px)';
          const clipped = modalImg
            ? cloneElement(modalImg, {
                className: ['gal-zoom-clip', swapped && 'gal-zoom-hidden', modalState === 'UNLOADING' && 'gal-zoom-out'].filter(Boolean).join(' '),
                style: {
                  ...box,
                  clipPath: clip,
                  opacity: swapped || modalState === 'UNLOADING' ? 0 : 1,
                  transition: 'transform 0.3s, clip-path 0.3s, opacity 0.3s ease-in',
                },
              })
            : img;
          const stop = tour[current] ?? { item, cat: category, idx: i };
          const shown = stop.item;
          const groupSize = tour.filter((t) => t.cat === stop.cat).length;
          const position = labels.counter.replace('{current}', String(stop.idx + 1)).replace('{total}', String(groupSize));
          const group = categories?.[stop.cat]?.label;
          const canStep = tour.length > 1;
          // The empty band between the window edge and the image, so the side
          // arrows can sit in its middle.
          const [sideGap, setSideGap] = useState(0);
          useEffect(() => {
            if (modalState !== 'LOADED') return;
            const measure = () => {
              const m = document.querySelector('dialog[open] [data-rmiz-modal-img]');
              if (m) setSideGap(Math.max(0, m.getBoundingClientRect().left));
            };
            measure();
            window.addEventListener('resize', measure);
            return () => window.removeEventListener('resize', measure);
          }, [modalState]);
          const sideStyle = { '--gal-side-gap': `${sideGap}px` } as CSSProperties;
          return (
            <>
              {buttonUnzoom}
              {clipped}
              {box && swapped && layers.prev !== null && (
                <img key={`p${layers.prev}`} className="gal-zoom-alt gal-zoom-alt-prev" src={srcs[layers.prev]} alt="" aria-hidden="true" style={box} data-state={modalState} />
              )}
              {box && swapped && (
                <img key={`c${layers.cur}`} className="gal-zoom-alt" src={srcs[layers.cur]} alt={tour[layers.cur]?.item.alt ?? ''} style={box} data-state={modalState} />
              )}
              {/* Wider screens: large arrows beside the image. Phones: the bar's own arrows. */}
              <button type="button" className="gal-btn gal-btn-ink gal-zoom-side gal-zoom-side-prev" style={sideStyle} data-state={modalState} onClick={() => stepRef.current(-1)} disabled={!canStep} aria-label={labels.prev}>
                <Chevron dir="left" size={28} />
              </button>
              <button type="button" className="gal-btn gal-btn-ink gal-zoom-side gal-zoom-side-next" style={sideStyle} data-state={modalState} onClick={() => stepRef.current(1)} disabled={!canStep} aria-label={labels.next}>
                <Chevron dir="right" size={28} />
              </button>
              <div className="gal-zoom-bar gal-zoom-bar-sides" data-state={modalState}>
                <button type="button" className="gal-btn gal-btn-ink" onClick={() => stepRef.current(-1)} disabled={!canStep} aria-label={labels.prev}>
                  <Chevron dir="left" />
                </button>
                <p className="gal-zoom-cap">
                  {shown.caption}
                  <span>{group ? `${group} · ${position}` : position}</span>
                </p>
                <button type="button" className="gal-btn gal-btn-ink" onClick={() => stepRef.current(1)} disabled={!canStep} aria-label={labels.next}>
                  <Chevron dir="right" />
                </button>
              </div>
            </>
          );
        }
        return GalleryZoomContent;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, labels, total, tour, tourStart, categories],
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
    <ZoomView.Provider value={{ view, srcs: zoomSrcs }}>
    <div className="gal">
      {categories && (
      <div className="container gal-controls gal-controls-cats">
          <div className="gal-cats" role="tablist" aria-label={labels.categories} onKeyDown={onTabKey}>
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                className="gal-cat"
                aria-selected={i === category}
                tabIndex={i === category ? 0 : -1}
                onClick={() => setCategory(i)}
              >
                {cat.label}
                <span className="gal-cat-count">{cat.ids.length}</span>
              </button>
            ))}
          </div>
      </div>
      )}

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
          {items.map((item, i) => {
            const dark = darkTheme && item.fullDark;
            const thumb = dark ? item.thumbDark! : item.thumb;
            const thumbSrcSet = dark ? item.thumbSrcSetDark! : item.thumbSrcSet;
            const full = dark ? item.fullDark! : item.full;
            return (
            <li key={item.id} className="gal-card" data-shot={item.id} aria-roledescription="slide" aria-label={counter(i + 1)}>
              <ShotFrame profile={profileFor(i)}>
                <ControlledZoom
                  isZoomed={open === i}
                  // A closing dialog reports late; only let it clear its own image.
                  onZoomChange={(zoomed) => {
                    if (zoomed) setView(tourStart + i);
                    else if (open === i) bringIntoRow(view);
                    setOpen((current) => (zoomed ? i : current === i ? null : current));
                  }}
                  zoomImg={{ src: full, srcSet: `${full} 2400w`, sizes: '100vw', alt: item.alt }}
                  zoomMargin={zoomMargin}
                  swipeToUnzoomThreshold={90}
                  a11yNameButtonZoom={labels.zoom.replace('{label}', item.caption)}
                  a11yNameButtonUnzoom={labels.unzoom.replace('{label}', item.caption)}
                  ZoomContent={zoomContents[i]}
                >
                  <img
                    className="gal-img"
                    src={thumb}
                    srcSet={thumbSrcSet}
                    sizes="(min-width: 1024px) 440px, 80vw"
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={i < EAGER_THUMBS ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </ControlledZoom>
              </ShotFrame>
              {item.temp && (
                <span className="shot-tag" aria-hidden="true">
                  Temp · {item.id}
                </span>
              )}
              <p className="gal-cap">{item.caption}</p>
            </li>
            );
          })}
        </ul>
      </div>

      {/* Progress and arrows sit under the row, on the right. */}
      <div className="container gal-controls gal-controls-bottom">
        <div className="gal-nav">
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
      </div>
    </div>
    </ZoomView.Provider>
  );
}
