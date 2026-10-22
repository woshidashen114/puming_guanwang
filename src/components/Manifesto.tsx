import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/i18n';

export function Manifesto() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-t border-cyan-100/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="glass-blue relative overflow-hidden p-8 md:p-14">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <span className="font-grotesk text-[11px] tracking-[.24em] text-accent">
                {t('manifesto.label')}
              </span>
              <h2 className="mt-6 max-w-3xl font-sans text-3xl font-semibold leading-tight tracking-[-.04em] text-ink md:text-5xl">
                {t('manifesto.title')}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-ink-dim">{t('manifesto.body')}</p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-sm text-accent transition hover:text-white"
              >
                {t('manifesto.link')} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
