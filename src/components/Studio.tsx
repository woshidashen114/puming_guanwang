import { ArrowUpRight, BrainCircuit, Eye, Network, Waves } from 'lucide-react';
import { SplitReveal } from '@/components/SplitReveal';
import { useI18n } from '@/i18n';

const services = [
  { icon: BrainCircuit, title: 'studio.service1', body: 'studio.body1', en: 'studio.category1' },
  { icon: Eye, title: 'studio.service2', body: 'studio.body2', en: 'studio.category2' },
  { icon: Network, title: 'studio.service3', body: 'studio.body3', en: 'studio.category3' },
  { icon: Waves, title: 'studio.service4', body: 'studio.body4', en: 'studio.category4' },
] as const;

export function Studio() {
  const { t } = useI18n();

  return (
    <section id="solutions" className="relative overflow-hidden border-t border-cyan-100/10 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><span className="font-grotesk text-[11px] tracking-[.24em] text-accent">{t('studio.label')}</span></div>
            <h2 className="max-w-2xl font-sans text-4xl font-bold leading-tight tracking-[-.04em] text-ink md:text-6xl"><SplitReveal text={t('studio.title1')} /><span className="block text-accent"><SplitReveal text={t('studio.title2')} delay={.18} /></span></h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-7 text-ink-dim md:block">{t('studio.intro')}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {services.map(({ icon: Icon, title, en, body }, index) => (
            <article key={title} className="glass-blue group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-accent/50 md:p-8">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
              <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center border border-accent/30 bg-accent/10 text-accent"><Icon size={22} /></span><span className="font-grotesk text-xs text-accent/60">0{index + 1}</span></div>
              <h3 className="mt-9 text-xl font-semibold text-ink">{t(title)}</h3><div className="mt-1 font-grotesk text-[10px] tracking-[.18em] text-accent">{t(en)}</div>
              <p className="mt-5 max-w-md text-sm leading-7 text-ink-dim">{t(body)}</p>
              <div className="mt-8 flex items-center gap-2 text-xs text-accent opacity-0 transition group-hover:opacity-100">{t('studio.action')}<ArrowUpRight size={14} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
