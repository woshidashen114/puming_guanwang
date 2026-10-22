import { useEffect, useState } from 'react';
import { Activity, ChevronDown, Menu, X } from 'lucide-react';
import { useI18n, type Language } from '@/i18n';

const LINKS = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.solutions', href: '#solutions' },
  { key: 'nav.platform', href: '#platform' },
  { key: 'nav.security', href: '#security' },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-cyan-200/10 bg-bg/85 py-3 backdrop-blur-xl' : 'py-5'}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#hero" className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center border border-accent/70 bg-accent/10">
              <span className="h-3 w-3 rotate-45 border border-accent" />
              <span className="absolute h-px w-5 bg-accent" />
              <span className="absolute w-px h-5 bg-accent" />
            </span>
            <span>
              <strong className="block font-sans text-base tracking-[.12em] text-ink">{t('brand.name')}</strong>
              <span className="font-grotesk text-[9px] tracking-[.28em] text-accent">{t('brand.descriptor')}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => <a key={link.href} href={link.href} className="font-sans text-sm text-ink-dim transition-colors hover:text-accent">{t(link.key)}</a>)}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitch language={language} setLanguage={setLanguage} label={t('language.label')} />
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <Activity size={14} className="text-accent" />
              <span className="font-grotesk text-[10px] tracking-[.16em] text-ink-dim">{t('nav.online')}</span>
            </div>
            <a href="#contact" className="flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-bg transition hover:bg-white"><span>{t('nav.demo')}</span><ChevronDown size={14} className="-rotate-90" /></a>
          </div>

          <button className="text-ink lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 flex flex-col items-start justify-center gap-7 bg-bg px-8 transition-opacity duration-300 lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        {LINKS.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-sans text-3xl text-ink"><span className="mr-3 font-grotesk text-sm text-accent">0{index + 1}</span>{t(link.key)}</a>)}
        <LanguageSwitch language={language} setLanguage={setLanguage} label={t('language.label')} />
      </div>
    </>
  );
}

export function ScrollRail({ progress }: { progress: number }) {
  const { t } = useI18n();
  const labels = [t('nav.overview'), t('nav.solutions'), t('nav.platform'), t('nav.security'), t('nav.contact')];
  const active = Math.min(labels.length - 1, Math.floor(progress * labels.length));
  return <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"><div className="flex flex-col items-end gap-2">{labels.map((label, index) => <div key={label} className="flex items-center gap-2"><span className={`font-sans text-[10px] transition ${index === active ? 'text-accent' : 'text-ink-dim/35'}`}>{label}</span><span className={`h-1.5 w-1.5 rotate-45 ${index === active ? 'bg-accent' : 'bg-white/20'}`} /></div>)}</div><div className="h-28 w-px bg-white/10"><div className="w-px bg-accent transition-all" style={{ height: `${progress * 100}%` }} /></div><span className="font-grotesk text-[10px] text-ink-dim">{String(Math.round(progress * 100)).padStart(3, '0')}</span></div>;
}

function LanguageSwitch({ language, setLanguage, label }: { language: Language; setLanguage: (language: Language) => void; label: string }) {
  const options: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'zh-CN', label: '简体中文' },
  ];

  return (
    <label className="relative inline-flex min-h-9 items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="min-h-9 appearance-none border border-white/15 bg-bg px-3 pr-8 text-xs text-ink outline-none transition hover:border-accent focus:border-accent"
      >
        {options.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
      </select>
      <ChevronDown size={13} aria-hidden="true" className="pointer-events-none absolute right-2 text-ink-dim" />
    </label>
  );
}
