import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { SplitReveal } from '@/components/SplitReveal';
import { useI18n } from '@/i18n';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-cyan-100/10 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><span className="font-grotesk text-[11px] tracking-[.24em] text-accent">{t('contact.label')}</span></div>
            <h2 className="font-sans text-4xl font-bold leading-tight tracking-[-.05em] text-ink md:text-7xl"><SplitReveal text={t('contact.title1')} /><span className="block text-accent"><SplitReveal text={t('contact.title2')} delay={.18} /></span></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-ink-dim">{t('contact.body')}</p>
            <a href="mailto:hello@zhituyuntu.com" className="group mt-9 inline-flex items-center gap-3 bg-accent px-6 py-4 font-semibold text-bg transition hover:bg-white">{t('contact.cta')}<ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </div>
          <div className="grid gap-px border border-cyan-100/15 bg-cyan-100/10">
            <ContactItem icon={<Mail size={18} />} label={t('contact.business')} value="hello@zhituyuntu.com" />
            <ContactItem icon={<Phone size={18} />} label={t('contact.phone')} value="400-888-2026" />
            <ContactItem icon={<MapPin size={18} />} label={t('contact.address')} value={t('contact.addressValue')} />
          </div>
        </div>
        <footer className="mt-24 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 text-xs text-ink-dim md:flex-row">
          <span>© 2026 {t('brand.name')} {t('brand.descriptor')}</span>
          <nav aria-label={t('nav.overview')} className="flex gap-6"><a href="#solutions" className="hover:text-accent">{t('footer.solutions')}</a><a href="#platform" className="hover:text-accent">{t('footer.platform')}</a><a href="#security" className="hover:text-accent">{t('footer.security')}</a></nav>
          <span className="font-grotesk tracking-[.14em]">{t('footer.tagline')}</span>
        </footer>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-4 bg-bg/90 p-5 md:p-6"><span className="text-accent">{icon}</span><div><div className="text-xs text-ink-dim">{label}</div><div className="mt-1 text-sm text-ink">{value}</div></div></div>;
}
