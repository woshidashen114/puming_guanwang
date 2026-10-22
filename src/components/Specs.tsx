import { BarChart3, CloudCog, Gauge, Map, ShieldCheck, Sparkles } from 'lucide-react';
import { SplitReveal } from '@/components/SplitReveal';
import { useI18n } from '@/i18n';

const strengths = [
  { icon: Map, title: 'platform.strength1', body: 'platform.body1' },
  { icon: Gauge, title: 'platform.strength2', body: 'platform.body2' },
  { icon: CloudCog, title: 'platform.strength3', body: 'platform.body3' },
  { icon: ShieldCheck, title: 'platform.strength4', body: 'platform.body4' },
] as const;

export function Specs() {
  const { t, language } = useI18n();
  const tiles = [
    { label: t('platform.devices'), value: '12,680', suffix: '+', icon: <NetworkIcon /> },
    { label: t('platform.events'), value: '1.2', suffix: 'B', icon: <BarChart3 size={18} /> },
    { label: t('platform.accuracy'), value: '98.6', suffix: '%', icon: <Sparkles size={18} /> },
    { label: t('platform.cities'), value: '36', suffix: language === 'zh-CN' ? '座' : '' , icon: <Map size={18} /> },
  ];

  return (
    <section id="platform" className="relative overflow-hidden border-t border-cyan-100/10 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><span className="font-grotesk text-[11px] tracking-[.24em] text-accent">{t('platform.label')}</span></div>
            <h2 className="font-sans text-4xl font-bold leading-tight tracking-[-.04em] text-ink md:text-6xl"><SplitReveal text={t('platform.title1')} /><span className="block text-accent"><SplitReveal text={t('platform.title2')} delay={.18} /></span></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-ink-dim">{t('platform.intro')}</p>
          </div>
          <div className="grid gap-px border border-cyan-100/15 bg-cyan-100/10 sm:grid-cols-2">
            {strengths.map(({ icon: Icon, title, body }) => <div key={title} className="bg-bg/90 p-6 transition hover:bg-bg-soft md:p-8"><Icon className="text-accent" size={23} /><h3 className="mt-8 text-lg font-semibold text-ink">{t(title)}</h3><p className="mt-3 text-sm leading-7 text-ink-dim">{t(body)}</p></div>)}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">{tiles.map((tile) => <DataTile key={tile.label} {...tile} />)}</div>
      </div>
    </section>
  );
}

function DataTile({ label, value, suffix, icon }: { label: string; value: string; suffix: string; icon: React.ReactNode }) {
  return <div className="glass-blue p-5 md:p-6"><div className="flex items-center justify-between text-accent"><span className="text-xs text-ink-dim">{label}</span>{icon}</div><div className="mt-5 font-grotesk text-3xl font-medium text-ink md:text-4xl">{value}<small className="ml-1 text-base text-accent">{suffix}</small></div></div>;
}

function NetworkIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="4" r="2.5" stroke="currentColor" /><circle cx="4" cy="14" r="2.5" stroke="currentColor" /><circle cx="14" cy="14" r="2.5" stroke="currentColor" /><path d="M7.8 6.1 5.2 11.7M10.2 6.1l2.6 5.6M6.5 14h5" stroke="currentColor" /></svg>;
}
