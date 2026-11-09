import { Fragment, useEffect, useRef, useState } from "react";
import { Check, CheckCircle2, Download } from "lucide-react";
import Modal from "./Modal";
import { AppleLogo, WindowsLogo } from "./PlatformIcons";
import type { Language, Translations } from "../i18n";
import { DOWNLOAD_URLS } from "../lib/download";
import {
  OPEN_DOWNLOAD_EVENT,
  type DownloadDialogMode,
} from "../lib/downloadFlow";
import {
  CONTACT_CATEGORIES,
  buildContactPayload,
  buildEarlyAccessPayload,
  buildSubscriptionPayload,
  currentSubmissionContext,
} from "../lib/submissionPayloads";
import type { ContactCategory } from "../lib/submissionPayloads";
import { submitJson } from "../lib/submitJson";

interface SiteModalsProps {
  lang: Language;
  translations: Translations;
  earlyAccessSubscribeUrl?: string;
  contactFormUrl?: string;
  contactEmail?: string;
  /** Where the Mac "notify me" email goes: the product updates list. */
  productUpdatesSubscribeUrl?: string;
}

type ActiveModal = "early-access" | "contact" | "download" | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The product name in a heading, drawn like the logo: semibold, "Bar" in the logo's colour. */
const withBrandName = (text: string) =>
  text.split(/(TalkBar)/).map((part, index) =>
    part === "TalkBar" ? (
      <span key={index} data-brand-name className="font-semibold">
        <span className="text-foreground">Talk</span>
        <span className="text-logo-accent">Bar</span>
      </span>
    ) : (
      part
    ),
  );

/** A heading whose words zoom in; spaces stay outside the words so they keep their width. */
const zoomInWords = (text: string) =>
  text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="zoom-word">{withBrandName(word)}</span>
    </Fragment>
  ));

const SiteModals = ({
  lang,
  translations,
  earlyAccessSubscribeUrl = "",
  contactFormUrl = "",
  productUpdatesSubscribeUrl = "",
}: SiteModalsProps) => {
  const t = (key: string) => translations[key] ?? key;

  const [active, setActive] = useState<ActiveModal>(null);

  // Download dialog state; the Mac form signs up for product updates.
  const [dlMode, setDlMode] = useState<DownloadDialogMode>("choose");
  const [macEmail, setMacEmail] = useState("");
  const [macError, setMacError] = useState("");
  const [macBusy, setMacBusy] = useState(false);
  const [macSent, setMacSent] = useState(false);
  // Changes on every thanks, so the title's zoom plays again.
  const [thanksShown, setThanksShown] = useState(0);

  // Early Access form state
  const [eaEmail, setEaEmail] = useState("");
  const [eaError, setEaError] = useState("");
  const [eaBusy, setEaBusy] = useState(false);
  const [eaSent, setEaSent] = useState(false);

  // Contact form state
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cCategory, setCCategory] = useState<ContactCategory>("question");
  const [cMessage, setCMessage] = useState("");
  const [cSubscribeUpdates, setCSubscribeUpdates] = useState(true);
  const [cError, setCError] = useState("");
  const [cBusy, setCBusy] = useState(false);
  const [cSent, setCSent] = useState(false);
  const cMessageRef = useRef<HTMLTextAreaElement>(null);

  // Grow the message textarea with its content, from 4 rows up to a 10-line
  // cap; beyond that the textarea itself scrolls.
  const autoResizeMessage = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const vertical =
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);
    const maxHeight = lineHeight * 10 + vertical;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const resetEarlyAccessForm = () => {
    setEaSent(false);
    setEaEmail("");
    setEaError("");
  };

  const resetContactForm = () => {
    setCSent(false);
    setCName("");
    setCEmail("");
    setCCategory("question");
    setCMessage("");
    setCError("");
    setCSubscribeUpdates(true);
  };

  const resetMacForm = () => {
    setMacSent(false);
    setMacEmail("");
    setMacError("");
  };

  // Latest "sent" flags, readable from the once-registered event listeners
  // without re-subscribing on every render.
  const eaSentRef = useRef(eaSent);
  const cSentRef = useRef(cSent);
  const macSentRef = useRef(macSent);
  useEffect(() => {
    eaSentRef.current = eaSent;
    cSentRef.current = cSent;
    macSentRef.current = macSent;
  }, [eaSent, cSent, macSent]);

  useEffect(() => {
    // Re-opening after a successful send starts the form fresh instead of
    // showing the previous "sent!" success state.
    const openEarlyAccess = () => {
      if (eaSentRef.current) resetEarlyAccessForm();
      setActive("early-access");
    };
    const openContact = () => {
      if (cSentRef.current) resetContactForm();
      setActive("contact");
    };

    const pendingWindow = window as unknown as {
      __talkbarPendingModal?: ActiveModal;
      __talkbarPendingDownload?: DownloadDialogMode | null;
    };
    const openDownload = (mode: DownloadDialogMode) => {
      if (macSentRef.current) resetMacForm();
      setDlMode(mode);
      setThanksShown((count) => count + 1);
      setActive("download");
    };
    const onOpenDownload = (event: Event) => {
      pendingWindow.__talkbarPendingDownload = null;
      openDownload(
        (event as CustomEvent<DownloadDialogMode>).detail ?? "choose",
      );
    };

    window.addEventListener("talkbar:open-early-access", openEarlyAccess);
    window.addEventListener("talkbar:open-contact", openContact);
    window.addEventListener(OPEN_DOWNLOAD_EVENT, onOpenDownload);

    // Drain any click that happened before this island hydrated.
    const pending = pendingWindow.__talkbarPendingModal;
    if (pending === "early-access") openEarlyAccess();
    else if (pending === "contact") openContact();
    pendingWindow.__talkbarPendingModal = null;
    const pendingDownload = pendingWindow.__talkbarPendingDownload;
    if (pendingDownload) openDownload(pendingDownload);
    pendingWindow.__talkbarPendingDownload = null;

    return () => {
      window.removeEventListener("talkbar:open-early-access", openEarlyAccess);
      window.removeEventListener("talkbar:open-contact", openContact);
      window.removeEventListener(OPEN_DOWNLOAD_EVENT, onOpenDownload);
    };
  }, []);

  const focusDownloadDialog = () =>
    document
      .querySelector('[aria-labelledby="download-title"]')
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus();

  // Switching the download dialog's view replaces the focused control; move
  // focus to the new view so keyboard users stay inside the dialog.
  const dlModeOpened = useRef(dlMode);
  useEffect(() => {
    if (dlModeOpened.current === dlMode) return;
    dlModeOpened.current = dlMode;
    if (active !== "download") return;
    focusDownloadDialog();
  }, [dlMode, active]);

  // A successful Mac signup replaces the focused field with its confirmation.
  useEffect(() => {
    if (macSent && active === "download") focusDownloadDialog();
  }, [macSent, active]);

  // Keep the message box sized to its content whenever the contact modal opens.
  useEffect(() => {
    if (active === "contact" && cMessageRef.current) {
      autoResizeMessage(cMessageRef.current);
    }
  }, [active]);

  const close = () => setActive(null);

  const submitEarlyAccess = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (eaBusy) return;
    if (!EMAIL_RE.test(eaEmail.trim())) {
      setEaError(t("earlyAccess.invalidEmail"));
      return;
    }
    setEaError("");
    setEaBusy(true);
    const { ok } = await submitJson(
      earlyAccessSubscribeUrl,
      buildEarlyAccessPayload(eaEmail, currentSubmissionContext(lang)),
    );
    setEaBusy(false);
    if (ok) setEaSent(true);
    else setEaError(t("earlyAccess.error"));
  };

  const submitMacNotify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (macBusy) return;
    if (!EMAIL_RE.test(macEmail.trim())) {
      setMacError(t("earlyAccess.invalidEmail"));
      return;
    }
    setMacError("");
    setMacBusy(true);
    const { ok } = await submitJson(
      productUpdatesSubscribeUrl,
      buildSubscriptionPayload(macEmail, currentSubmissionContext(lang)),
    );
    setMacBusy(false);
    if (ok) setMacSent(true);
    else setMacError(t("earlyAccess.error"));
  };

  // A file link in the dialog downloads through its own href; the dialog then
  // thanks the visitor, as it does for a download started by a button.
  const onFileLinkClick = (arch: "x64" | "arm64") => {
    (
      window as unknown as {
        plausible?: (
          event: string,
          options?: { props?: Record<string, string> },
        ) => void;
      }
    ).plausible?.("Download Started", {
      props: { os: "windows", arch, from: "dialog" },
    });
    setDlMode("started");
    setThanksShown((count) => count + 1);
  };

  const submitContact = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (cBusy) return;
    if (!EMAIL_RE.test(cEmail.trim()) || cMessage.trim().length < 2) {
      setCError(t("contact.invalid"));
      return;
    }
    setCError("");
    setCBusy(true);
    const { ok } = await submitJson(
      contactFormUrl,
      buildContactPayload(
        {
          name: cName,
          email: cEmail,
          message: cMessage,
          category: cCategory,
          subscribeUpdates: cSubscribeUpdates,
        },
        currentSubmissionContext(lang),
      ),
    );
    setCBusy(false);
    if (ok) setCSent(true);
    else setCError(t("contact.error"));
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const labelClass = "block text-xs font-medium text-foreground mb-1.5";
  const submitClass =
    "btn-pill btn-pill-sm btn-primary cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  // Modal layout regions: fixed header/footer, scrollable body in between.
  const headerClass = "shrink-0 px-6 pt-6 pr-14 sm:px-7 sm:pt-7";
  const bodyClass = "min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-7";
  const footerClass = "shrink-0 px-6 pb-6 pt-4 sm:px-7 sm:pb-7";

  const renderSuccess = (title: string, body: string) => (
    <div className="flex min-h-0 flex-col">
      <div className={`${bodyClass} pt-8 text-center`}>
        <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/12 text-primary">
          <CheckCircle2 size={26} />
        </div>
        <h2 className="font-display text-2xl font-light text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      <div className={footerClass}>
        <button
          type="button"
          onClick={close}
          className={`${submitClass} w-full`}
        >
          {t("modal.close")}
        </button>
      </div>
    </div>
  );

  const fileLinkClass =
    "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline";

  // Every file, by system. Without `showMac` the Mac row is left out (the Mac
  // dialog already explains it); `focusFirst` makes the first file the
  // dialog's starting focus.
  const renderDownloadChoices = (showMac: boolean, focusFirst = false) => (
    <div className="flex flex-col divide-y divide-border">
      <div className="pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <WindowsLogo className="w-4 h-4 text-primary" />
          {t("download.windows.heading")}
        </div>
        <ul className="mt-2.5 flex flex-col gap-2 pl-6">
          <li>
            <a
              href={DOWNLOAD_URLS.windowsX64}
              data-autofocus={focusFirst ? "" : undefined}
              onClick={() => onFileLinkClick("x64")}
              className={fileLinkClass}
            >
              <Download size={15} aria-hidden="true" />
              {t("download.windows.x64")}
            </a>
          </li>
          <li>
            <a
              href={DOWNLOAD_URLS.windowsArm64}
              onClick={() => onFileLinkClick("arm64")}
              className={fileLinkClass}
            >
              <Download size={15} aria-hidden="true" />
              {t("download.windows.arm")}
            </a>
            <p className="mt-0.5 pl-[23px] text-xs text-muted-foreground">
              {t("download.windows.armNote")}
            </p>
          </li>
        </ul>
      </div>
      {showMac && (
        <div className="pt-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <AppleLogo className="w-4 h-4 text-muted-foreground" />
            {t("download.mac.heading")}
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t("download.mac.soon")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDlMode("mac")}
            className="mt-2 pl-6 text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            {t("download.mac.notifyLink")}
          </button>
        </div>
      )}
    </div>
  );

  const renderDownloadDialog = () => {
    if (dlMode === "started") {
      return (
        <div className="flex min-h-0 flex-col">
          {/* Even side padding keeps the centred thanks clear of the close button. */}
          <div className="shrink-0 px-14 pt-6 text-center sm:pt-7">
            <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/12 text-primary">
              <CheckCircle2 size={26} />
            </div>
            <h2
              key={thanksShown}
              id="download-title"
              className="font-display text-2xl sm:text-[26px] font-light text-foreground"
            >
              {zoomInWords(t("download.thanks.title"))}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("download.thanks.body")}
            </p>
          </div>
          <div className={bodyClass}>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("download.notStarted")}
            </p>
            {renderDownloadChoices(true)}
          </div>
          <div className={footerClass}>
            <button
              type="button"
              data-autofocus
              onClick={close}
              className="btn-pill btn-pill-sm w-full cursor-pointer bg-muted text-secondary-foreground hover:bg-foreground/10"
            >
              {t("download.thanks.ok")}
            </button>
          </div>
        </div>
      );
    }
    if (dlMode === "mac") {
      return (
        <div className="flex min-h-0 flex-col">
          <div className={headerClass}>
            <AppleLogo className="mb-3 w-7 h-7 text-foreground" />
            <h2
              id="download-title"
              className="font-display text-2xl sm:text-[26px] font-light text-foreground"
            >
              {t("download.mac.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("download.mac.body")}
            </p>
          </div>
          <div className={bodyClass}>
            {macSent ? (
              <p
                role="status"
                tabIndex={-1}
                data-autofocus
                className="flex items-start gap-2 text-sm text-foreground focus:outline-none"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                {t("download.mac.success")}
              </p>
            ) : (
              <form onSubmit={submitMacNotify}>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    data-autofocus
                    value={macEmail}
                    onChange={(e) => setMacEmail(e.target.value)}
                    placeholder={t("earlyAccess.emailPlaceholder")}
                    aria-label={t("earlyAccess.emailPlaceholder")}
                    className={inputClass}
                  />
                  <button
                    type="submit"
                    className={submitClass}
                    disabled={macBusy}
                  >
                    {macBusy
                      ? t("earlyAccess.submitting")
                      : t("download.mac.submit")}
                  </button>
                </div>
                {macError && (
                  <p className="mt-2 text-xs text-destructive">{macError}</p>
                )}
                <p className="mt-3 label text-muted-foreground">
                  {t("download.mac.privacyNote")}
                </p>
              </form>
            )}
            <div className="mt-5 pt-4 border-t border-border">
              <p className="mb-3 text-sm text-muted-foreground">
                {t("download.mac.windowsPrompt")}
              </p>
              {renderDownloadChoices(false)}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex min-h-0 flex-col">
        <div className={headerClass}>
          <h2
            id="download-title"
            className="font-display text-2xl sm:text-[26px] font-light text-foreground"
          >
            {t("download.title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("download.subtitle")}
          </p>
        </div>
        <div className={`${bodyClass} pb-7`}>
          {renderDownloadChoices(true, true)}
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        open={active === "download"}
        onClose={close}
        labelledById="download-title"
        closeLabel={t("modal.close")}
      >
        {renderDownloadDialog()}
      </Modal>

      <Modal
        open={active === "early-access"}
        onClose={close}
        labelledById="early-access-title"
        closeLabel={t("modal.close")}
      >
        {eaSent ? (
          renderSuccess(
            t("earlyAccess.success.title"),
            t("earlyAccess.success.body"),
          )
        ) : (
          <div className="flex min-h-0 flex-col">
            <div className={headerClass}>
              <h2
                id="early-access-title"
                className="font-display text-2xl sm:text-[26px] font-light text-foreground"
              >
                {t("earlyAccess.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("earlyAccess.subtitle")}
              </p>
            </div>
            <div className={bodyClass}>
              <form onSubmit={submitEarlyAccess}>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={eaEmail}
                    onChange={(e) => setEaEmail(e.target.value)}
                    placeholder={t("earlyAccess.emailPlaceholder")}
                    aria-label={t("earlyAccess.emailPlaceholder")}
                    className={inputClass}
                  />
                  <button
                    type="submit"
                    className={submitClass}
                    disabled={eaBusy}
                  >
                    {eaBusy
                      ? t("earlyAccess.submitting")
                      : t("earlyAccess.submit")}
                  </button>
                </div>
                {eaError && (
                  <p className="mt-2 text-xs text-destructive">{eaError}</p>
                )}
                <p className="mt-3 label text-muted-foreground">
                  {t("earlyAccess.privacyNote")}
                </p>
              </form>
              <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                {t("earlyAccess.contactPrompt")}{" "}
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new Event("talkbar:open-contact"))
                  }
                  className="font-semibold text-primary hover:underline cursor-pointer"
                >
                  {t("earlyAccess.contactLink")}
                </button>
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={active === "contact"}
        onClose={close}
        labelledById="contact-title"
        closeLabel={t("modal.close")}
      >
        {cSent ? (
          renderSuccess(t("contact.success.title"), t("contact.success.body"))
        ) : (
          <form onSubmit={submitContact} className="flex min-h-0 flex-col">
            <div className={headerClass}>
              <h2
                id="contact-title"
                className="font-display text-2xl sm:text-[26px] font-light text-foreground"
              >
                {t("contact.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>
            <div className={`${bodyClass} flex flex-col gap-2.5`}>
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  {t("contact.nameLabel")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  {t("contact.emailLabel")}
                  <span className="text-destructive"> *</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {t("contact.messageLabel")}
                  <span className="text-destructive"> *</span>
                </label>
                <textarea
                  id="contact-message"
                  ref={cMessageRef}
                  required
                  minLength={2}
                  value={cMessage}
                  onChange={(e) => {
                    setCMessage(e.target.value);
                    autoResizeMessage(e.target);
                  }}
                  placeholder={t("contact.messagePlaceholder")}
                  rows={4}
                  className={`${inputClass} resize-none overflow-hidden`}
                />
              </div>
              <div className="mt-1.5">
                <label htmlFor="contact-category" className={labelClass}>
                  {t("contact.categoryLabel")}
                </label>
                <select
                  id="contact-category"
                  value={cCategory}
                  onChange={(e) =>
                    setCCategory(e.target.value as ContactCategory)
                  }
                >
                  {CONTACT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {t(`contact.category.${category}`)}
                    </option>
                  ))}
                </select>
              </div>
              <label className="group flex items-start gap-3 rounded-lg border border-border/70 bg-muted/25 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground cursor-pointer transition-colors hover:border-primary/40 hover:bg-muted/40">
                <span className="relative mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center">
                  <input
                    name="subscribeUpdates"
                    type="checkbox"
                    checked={cSubscribeUpdates}
                    onChange={(e) => setCSubscribeUpdates(e.target.checked)}
                    className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-border bg-background transition-colors checked:border-primary checked:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="pointer-events-none absolute text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
                  />
                </span>
                <span>{t("contact.subscribeUpdates")}</span>
              </label>
            </div>
            <div className={footerClass}>
              {cError && <p className="text-xs text-destructive">{cError}</p>}
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive">*</span>{" "}
                  {t("contact.requiredNote")}
                </p>
                <button type="submit" className={submitClass} disabled={cBusy}>
                  {cBusy ? t("contact.submitting") : t("contact.submit")}
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default SiteModals;
