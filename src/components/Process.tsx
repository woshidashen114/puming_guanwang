import { CheckCircle2, LockKeyhole, Radar, ServerCog } from 'lucide-react';
import { SplitReveal } from '@/components/SplitReveal';
import { useI18n } from '@/i18n';

const items = [
  { icon: Radar, title: 'security.item1', body: 'security.body1' },
  { icon: ServerCog, title: 'security.item2', body: 'security.body2' },
  { icon: LockKeyhole, title: 'security.item3', body: 'security.body3' },
  { icon: CheckCircle2, title: 'security.item4', body: 'security.body4' },
] as const;

export function Process() {
  const { t } = useI18n();

  return (
    <section id="security" className="relative overflow-hidden border-t border-cyan-100/10 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><span className="font-grotesk text-[11px] tracking-[.24em] text-accent">{t('security.label')}</span></div>
            <h2 className="font-sans text-4xl font-bold leading-tight tracking-[-.04em] text-ink md:text-6xl"><SplitReveal text={t('security.title1')} /><span className="block text-accent"><SplitReveal text={t('security.title2')} delay={.18} /></span></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-ink-dim">{t('security.intro')}</p>
            <div className="mt-9 flex items-center gap-3 border border-accent/20 bg-accent/5 p-4"><span className="font-grotesk text-2xl text-accent">A+</span><div><div className="text-sm text-ink">{t('security.level')}</div><div className="text-xs text-ink-dim">{t('security.pillars')}</div></div></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">{items.map(({ icon: Icon, title, body }, index) => <div key={title} className="glass-blue p-6"><div className="flex items-center justify-between"><Icon className="text-accent" size={24} /><span className="font-grotesk text-xs text-accent/50">0{index + 1}</span></div><h3 className="mt-10 text-lg font-semibold text-ink">{t(title)}</h3><p className="mt-3 text-sm leading-7 text-ink-dim">{t(body)}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}
