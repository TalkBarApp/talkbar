import { useCallback, useEffect, useState } from "react";
import {
  AudioLines,
  BookOpenText,
  Building2,
  ChevronDown,
  CircleHelp,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  Handshake,
  LifeBuoy,
  Lightbulb,
  LineChart,
  Menu,
  MessagesSquare,
  Mic,
  PhoneCall,
  Podcast,
  Presentation,
  Rocket,
  Scale,
  Settings,
  Share2,
  Sparkles,
  Terminal,
  UserRoundCheck,
  UserSearch,
  Voicemail,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ColorThemeToggle from "./ColorThemeToggle";
import type { Language, Translations } from "../i18n";
import { LANGUAGE_FLAGS } from "../i18n";
import { docsUrl } from "../lib/docs";
import { getDownloadLink } from "../lib/download";
import { logos } from "../lib/logos";

interface NavbarProps {
  lang: Language;
  translations: Translations;
  /** When set, shows an "English" link in the header pointing to the English site. */
  englishUrl?: string;
}

const WindowsDownloadIcon = ({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 164.11 144.637"
    className={`${className} fill-current mr-1.5 download-icon`}
    aria-hidden="true"
  >
    <path d="M34.089 6.949s32.8-17.843 60.859 3.654L79.246 64.561s-17.574-12.104-30.623-10.8c-13.049 1.304-30.234 7.554-30.234 7.554l15.7-54.366zM15.621 70.823s17.604-8.188 32.221-7.146c14.615 1.043 26.285 8.91 28.802 10.717l-15.865 54.521s-17.635-11.476-30.162-10.432C18.089 119.53 7.229 121.438 0 125.181l15.621-54.358zM84.859 79.672s16.744 10.888 27.705 10.627c10.799-.258 18.27-1.109 32.921-6.852.114-.045.412-.258.313-.195-.313.195-15.699 54.031-15.699 54.031s-17.273 8.082-32.935 7.301c-15.658-.783-25.062-9.738-27.929-10.873l15.624-54.039z" />
    <path d="M103.251 16.295L87.51 69.942s12.788 12.527 30.797 11.482c18.008-1.043 27.795-6.719 30.176-7.52l15.627-54.12s-20.748 8.66-34.32 7.094c-13.571-1.564-22.024-7.335-26.539-10.583z" />
  </svg>
);

const Logo = ({ className = "", alt }: { className?: string; alt: string }) => (
  <span
    className={`relative block h-7 w-[135px] lg:h-8 lg:w-[155px] ${className}`}
  >
    <img
      src={logos.warmLight}
      alt={alt}
      className="theme-logo theme-logo-warm theme-logo-light"
    />
    <img
      src={logos.warmDark}
      alt={alt}
      className="theme-logo theme-logo-warm theme-logo-dark"
    />
    <img
      src={logos.blueLight}
      alt={alt}
      className="theme-logo theme-logo-blue theme-logo-light"
    />
    <img
      src={logos.blueDark}
      alt={alt}
      className="theme-logo theme-logo-blue theme-logo-dark"
    />
  </span>
);

const Navbar = ({ lang, translations, englishUrl }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [useCasesMobileOpen, setUseCasesMobileOpen] = useState(false);
  const [industriesMobileOpen, setIndustriesMobileOpen] = useState(false);
  const [guidesMobileOpen, setGuidesMobileOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [downloadLink, setDownloadLink] = useState("#cta");

  const t = (key: string) => translations[key] || key;
  const themeToggleLabels = {
    switchToDarkLabel: t("theme.switchToDark"),
    switchToLightLabel: t("theme.switchToLight"),
  };
  const colorThemeToggleLabels = {
    switchToWarmLabel: t("colorTheme.switchToWarm"),
    switchToBlueLabel: t("colorTheme.switchToBlue"),
  };

  const navItems: Array<{
    label: string;
    shortLabel?: string;
    mobileLabel?: string;
    href: string;
  }> = [
    { label: t("nav.product"), href: "/#features" },
    {
      label: t("nav.liveContextCards"),
      shortLabel: t("nav.liveContextCardsShort"),
      mobileLabel: t("nav.liveContextCardsMobile"),
      href: "/#knowledge",
    },
    { label: t("nav.privacy"), href: "/privacy/" },
  ];

  const useCases: Array<{
    Icon: LucideIcon;
    label: string;
    desc: string;
    href: string;
  }> = [
    {
      Icon: UserRoundCheck,
      label: "nav.useCase.oneOnOne.label",
      desc: "nav.useCase.oneOnOne.desc",
      href: "/one-on-one-meetings/",
    },
    {
      Icon: Sparkles,
      label: "nav.useCase.coaching.label",
      desc: "nav.useCase.coaching.desc",
      href: "/coaching-sessions/",
    },
    {
      Icon: Mic,
      label: "nav.useCase.interviews.label",
      desc: "nav.useCase.interviews.desc",
      href: "/interviews/",
    },
    {
      Icon: Podcast,
      label: "nav.useCase.podcasts.label",
      desc: "nav.useCase.podcasts.desc",
      href: "/podcasts/",
    },
    {
      Icon: Voicemail,
      label: "nav.useCase.voiceNotes.label",
      desc: "nav.useCase.voiceNotes.desc",
      href: "/voice-notes/",
    },
    {
      Icon: PhoneCall,
      label: "nav.useCase.clientCalls.label",
      desc: "nav.useCase.clientCalls.desc",
      href: "/client-calls/",
    },
  ];

  const industries: Array<{
    Icon: LucideIcon;
    label: string;
    desc: string;
    href: string;
  }> = [
    {
      Icon: LineChart,
      label: "nav.industry.venture.label",
      desc: "nav.industry.venture.desc",
      href: "/venture-private-equity/",
    },
    {
      Icon: Scale,
      label: "nav.industry.legal.label",
      desc: "nav.industry.legal.desc",
      href: "/legal-counsel/",
    },
    {
      Icon: Building2,
      label: "nav.industry.exec.label",
      desc: "nav.industry.exec.desc",
      href: "/executive-leadership/",
    },
    {
      Icon: Handshake,
      label: "nav.industry.sales.label",
      desc: "nav.industry.sales.desc",
      href: "/b2b-sales/",
    },
    {
      Icon: Presentation,
      label: "nav.industry.consulting.label",
      desc: "nav.industry.consulting.desc",
      href: "/consulting/",
    },
    {
      Icon: UserSearch,
      label: "nav.industry.research.label",
      desc: "nav.industry.research.desc",
      href: "/product-research/",
    },
  ];

  const guideTopics: Array<{ Icon: LucideIcon; label: string; path: string }> = [
    {
      Icon: Rocket,
      label: "nav.guides.gettingStarted",
      path: "/getting-started/introduction",
    },
    { Icon: Mic, label: "nav.guides.sessions", path: "/sessions/overview" },
    {
      Icon: AudioLines,
      label: "nav.guides.voice",
      path: "/voice/recording-and-transcription",
    },
    {
      Icon: Lightbulb,
      label: "nav.guides.knowledge",
      path: "/knowledge/knowledge-cards",
    },
    {
      Icon: MessagesSquare,
      label: "nav.guides.chatsAndNotes",
      path: "/chats-and-notes/ask-talkbar",
    },
    { Icon: Cpu, label: "nav.guides.ai", path: "/ai/how-talkbar-uses-ai" },
    { Icon: Share2, label: "nav.guides.sharing", path: "/sharing/share-links" },
    {
      Icon: Database,
      label: "nav.guides.data",
      path: "/data/privacy-and-your-data",
    },
    { Icon: LifeBuoy, label: "nav.guides.help", path: "/help/troubleshooting" },
  ];

  const guideReferences: Array<{
    Icon: LucideIcon;
    label: string;
    desc: string;
    path: string;
  }> = [
    {
      Icon: Settings,
      label: "nav.guides.settings.label",
      desc: "nav.guides.settings.desc",
      path: "/settings/overview",
    },
    {
      Icon: Terminal,
      label: "nav.guides.mcp.label",
      desc: "nav.guides.mcp.desc",
      path: "/mcp",
    },
    {
      Icon: Wrench,
      label: "nav.guides.troubleshooting.label",
      desc: "nav.guides.troubleshooting.desc",
      path: "/help/troubleshooting",
    },
    {
      Icon: CircleHelp,
      label: "nav.guides.faq.label",
      desc: "nav.guides.faq.desc",
      path: "/help/faq",
    },
  ];

  useEffect(() => {
    const handle = setTimeout(() => setDownloadLink(getDownloadLink()), 0);
    return () => clearTimeout(handle);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const heroSentinel = document.querySelector(
      "#main-content > section:first-child",
    );
    const finalCta = document.getElementById("cta");
    const footer = document.querySelector("footer");

    if (!heroSentinel) return;

    let pastHero = false;
    let inSuppressedZone = false;
    const update = () => setShowStickyCta(pastHero && !inSuppressedZone);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 },
    );
    heroObserver.observe(heroSentinel);

    const suppressTargets = [finalCta, footer].filter(Boolean) as Element[];
    const zoneObserver = new IntersectionObserver(
      () => {
        inSuppressedZone = suppressTargets.some((el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.top < window.innerHeight * 0.6 &&
            rect.bottom > window.innerHeight * 0.2
          );
        });
        update();
      },
      { threshold: [0, 0.1, 0.5, 1] },
    );
    suppressTargets.forEach((el) => zoneObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      zoneObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setDrawerOpen(false);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [drawerOpen, handleEscape]);

  const closeDrawer = () => setDrawerOpen(false);

  const desktopNavItemClass =
    "cursor-pointer inline-flex h-9 items-center rounded-md px-2 lg:px-3 py-0 text-[13px] font-semibold leading-none whitespace-nowrap transition-colors hover:bg-foreground/5 lg:text-sm";

  const renderDesktopDropdown = (
    label: string,
    items: Array<{
      Icon: LucideIcon;
      label: string;
      desc: string;
      href: string;
    }>,
  ) => (
    <li className="group relative flex items-center">
      <button
        type="button"
        className={`${desktopNavItemClass} gap-1.5 group-hover:bg-foreground/5`}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown
          size={14}
          className="transition-transform duration-200 group-hover:rotate-180"
          strokeWidth={2.5}
        />
      </button>
      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
        <div
          className="nav-panel-pro nav-dropdown-panel overflow-hidden w-[620px]"
          role="menu"
        >
          <div className="p-3 grid grid-cols-2 gap-1">
            {items.map(({ Icon, label: itemLabel, desc, href }) => (
              <a
                key={href}
                href={href}
                role="menuitem"
                className="group/item flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <div className="bg-accent-soft text-primary border border-primary/15 rounded-lg size-10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/15 transition-colors">
                  <Icon className="size-5" />
                </div>
                <div className="text-sm flex-1 min-w-0">
                  <div className="font-semibold text-foreground leading-tight mb-0.5">
                    {t(itemLabel)}
                  </div>
                  <div className="text-muted-foreground text-[12px] leading-snug">
                    {t(desc)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </li>
  );

  const renderMobileDropdown = (
    label: string,
    open: boolean,
    setOpen: (open: boolean) => void,
    items: Array<{
      Icon: LucideIcon;
      label: string;
      desc: string;
      href: string;
    }>,
  ) => (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full py-4 px-6 text-base font-medium text-foreground hover:bg-muted transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>
      {open && (
        <div className="bg-sunken/55">
          {items.map(({ Icon, label: itemLabel, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeDrawer}
              className="flex items-center gap-3 py-3 px-10 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon className="size-4 text-primary" />
              {t(itemLabel)}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const newTabNote = (
    <span className="sr-only"> ({t("footer.externalLink")})</span>
  );

  const renderDesktopGuides = () => (
    <li className="group relative flex items-center">
      <button
        type="button"
        className={`${desktopNavItemClass} gap-1.5 group-hover:bg-foreground/5`}
        aria-haspopup="menu"
      >
        {t("nav.guides")}
        <ChevronDown
          size={14}
          className="transition-transform duration-200 group-hover:rotate-180"
          strokeWidth={2.5}
        />
      </button>
      <div className="guides-panel hidden group-hover:block group-focus-within:block absolute top-full pt-3 z-50">
        <div
          className="nav-panel-pro nav-dropdown-panel overflow-hidden w-[min(720px,calc(100vw-2rem))]"
          role="menu"
        >
          <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="p-3 border-r border-border">
              {guideTopics.map(({ Icon, label, path }) => (
                <a
                  key={label}
                  href={docsUrl(lang, path)}
                  target="_blank"
                  rel="noopener"
                  role="menuitem"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Icon className="size-4 flex-shrink-0 text-primary" />
                  {t(label)}
                  {newTabNote}
                </a>
              ))}
            </div>
            <div className="p-3 flex flex-col gap-1">
              {guideReferences.map(({ Icon, label, desc, path }) => (
                <a
                  key={label}
                  href={docsUrl(lang, path)}
                  target="_blank"
                  rel="noopener"
                  role="menuitem"
                  className="group/item flex flex-1 gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <div className="bg-accent-soft text-primary border border-primary/15 rounded-lg size-10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/15 transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <div className="text-sm flex-1 min-w-0">
                    <div className="font-semibold text-foreground leading-tight mb-0.5">
                      {t(label)}
                    </div>
                    <div className="text-muted-foreground text-[12px] leading-snug">
                      {t(desc)}
                    </div>
                  </div>
                  {newTabNote}
                </a>
              ))}
            </div>
          </div>
          <a
            href={docsUrl(lang)}
            target="_blank"
            rel="noopener"
            role="menuitem"
            className="flex items-center gap-3 px-6 py-3.5 border-t border-border text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
          >
            <BookOpenText className="size-4 flex-shrink-0 text-primary" />
            {t("nav.guides.all")}
            <ExternalLink
              className="size-3.5 ml-auto text-muted-foreground"
              aria-hidden="true"
            />
            {newTabNote}
          </a>
        </div>
      </div>
    </li>
  );

  const renderMobileGuides = () => (
    <div className="border-b border-border/50">
      <button
        onClick={() => setGuidesMobileOpen(!guidesMobileOpen)}
        aria-expanded={guidesMobileOpen}
        className="flex items-center justify-between w-full py-4 px-6 text-base font-medium text-foreground hover:bg-muted transition-colors"
      >
        <span>{t("nav.guides")}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${guidesMobileOpen ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>
      {guidesMobileOpen && (
        <div className="bg-sunken/55">
          {[...guideTopics, ...guideReferences].map(({ Icon, label, path }) => (
            <a
              key={label}
              href={docsUrl(lang, path)}
              target="_blank"
              rel="noopener"
              onClick={closeDrawer}
              className="flex items-center gap-3 py-3 px-10 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon className="size-4 text-primary" />
              {t(label)}
              {newTabNote}
            </a>
          ))}
          <a
            href={docsUrl(lang)}
            target="_blank"
            rel="noopener"
            onClick={closeDrawer}
            className="flex items-center gap-3 py-3 px-10 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <BookOpenText className="size-4 text-primary" />
            {t("nav.guides.all")}
            {newTabNote}
          </a>
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-sm border-b border-border shadow-soft"
            : "bg-transparent backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-3 sm:py-4">
          <a
            href="/"
            className="flex items-center shrink-0"
            aria-label={t("nav.homeAria")}
          >
            <Logo alt={t("footer.brand")} />
          </a>

          <ul className="hidden min-[1200px]:flex items-center gap-0 lg:gap-1 text-foreground flex-nowrap">
            {navItems.map((item) => (
              <li key={item.href} className="flex items-center">
                <a href={item.href} className={desktopNavItemClass}>
                  {item.shortLabel ? (
                    <>
                      <span className="nav-label-short">{item.shortLabel}</span>
                      <span className="nav-label-full">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </a>
              </li>
            ))}
            {renderDesktopDropdown(t("nav.useCases"), useCases)}
            {renderDesktopDropdown(t("nav.industries"), industries)}
            {renderDesktopGuides()}
          </ul>

          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div className="hidden min-[1200px]:flex items-center gap-1.5 lg:gap-2">
              <ThemeToggle {...themeToggleLabels} />
              <ColorThemeToggle {...colorThemeToggleLabels} />
            </div>
            <a
              href={downloadLink}
              data-download-link
              className="group hidden sm:inline-flex btn-pill btn-pill-sm btn-primary"
            >
              <WindowsDownloadIcon />
              {t("nav.downloadFree")}
            </a>
            {englishUrl && (
              <div className="relative group hidden min-[1200px]:flex items-center">
                <button
                  type="button"
                  className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors duration-200"
                  aria-haspopup="menu"
                  aria-label="Language"
                >
                  <Globe size={16} />
                </button>
                <div className="hidden group-hover:block absolute right-0 top-full pt-3 z-50">
                  <div
                    className="nav-panel-pro nav-dropdown-panel overflow-hidden w-44"
                    role="menu"
                  >
                    <div className="p-2">
                      <a
                        href={englishUrl}
                        hrefLang="en"
                        lang="en"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-foreground/5 transition-colors text-sm font-semibold text-foreground"
                      >
                        <span className="flags text-base leading-none">
                          {LANGUAGE_FLAGS.en}
                        </span>
                        English
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              className="min-[1200px]:hidden flex items-center justify-center w-11 h-11 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setDrawerOpen(true)}
              aria-label={t("nav.openMenu")}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] min-[1200px]:hidden transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeDrawer}
          aria-hidden="true"
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal={drawerOpen}
          aria-label={t("nav.mobileMenuLabel")}
          className={`nav-panel-pro nav-drawer-panel absolute top-0 right-0 h-full w-[85vw] max-w-[340px] flex flex-col transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <Logo className="h-7 w-[135px]" alt={t("footer.brand")} />
            <button
              onClick={closeDrawer}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("nav.closeMenu")}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  className="flex items-center py-4 px-6 text-base font-medium text-foreground hover:bg-muted transition-colors border-b border-border/50"
                >
                  {item.mobileLabel ?? item.label}
                </a>
              ))}
              {renderMobileDropdown(
                t("nav.useCases"),
                useCasesMobileOpen,
                setUseCasesMobileOpen,
                useCases,
              )}
              {renderMobileDropdown(
                t("nav.industries"),
                industriesMobileOpen,
                setIndustriesMobileOpen,
                industries,
              )}
              {renderMobileGuides()}
              {englishUrl && (
                <a
                  href={englishUrl}
                  onClick={closeDrawer}
                  hrefLang="en"
                  lang="en"
                  className="flex items-center gap-3 py-4 px-6 text-base font-medium text-foreground hover:bg-muted transition-colors border-b border-border/50"
                >
                  <span className="flags text-lg leading-none">
                    {LANGUAGE_FLAGS.en}
                  </span>
                  English
                </a>
              )}
            </nav>

            <div className="px-6 py-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {t("nav.darkMode")}
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle {...themeToggleLabels} />
                <ColorThemeToggle {...colorThemeToggleLabels} />
              </div>
            </div>
          </div>

          <div className="px-6 py-6 border-t border-border">
            <a
              href={downloadLink}
              data-download-link
              onClick={closeDrawer}
              className="group btn-pill btn-pill-sm btn-primary w-full"
            >
              <WindowsDownloadIcon />
              {t("nav.downloadFree")}
            </a>
          </div>
        </div>
      </div>

      <a
        href={downloadLink}
        data-download-link
        className={`group md:hidden fixed bottom-3 inset-x-3 z-40 btn-pill btn-pill-sm btn-primary transition-all duration-300 ${
          showStickyCta && !drawerOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-hidden={!showStickyCta || drawerOpen}
        tabIndex={showStickyCta && !drawerOpen ? 0 : -1}
      >
        <WindowsDownloadIcon />
        {t("nav.downloadFree")}
      </a>
    </>
  );
};

export default Navbar;
