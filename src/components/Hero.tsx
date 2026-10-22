import { ArrowDown, ArrowUpRight, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { LineReveal } from '@/components/SplitReveal';
import { useI18n } from '@/i18n';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-28 md:px-10 lg:pt-32">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 flex items-center gap-3"><span className="h-px w-10 bg-accent" /><span className="font-grotesk text-[11px] tracking-[.24em] text-accent">{t('hero.eyebrow')}</span></div>
          <h1 className="font-sans text-[clamp(3rem,7vw,7rem)] font-bold leading-[1.08] tracking-[-.06em] text-ink"><LineReveal>{t('hero.title1')}</LineReveal><span className="mt-2 block text-accent"><LineReveal delay={.18}>{t('hero.title2')}</LineReveal></span></h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-ink-dim md:text-lg">{t('hero.description')}</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href="#solutions" className="group flex items-center gap-3 rounded-sm bg-accent px-6 py-3.5 font-semibold text-bg transition hover:bg-white">{t('hero.explore')}<ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a><a href="#contact" className="flex items-center gap-2 border border-white/15 px-6 py-3.5 text-sm text-ink transition hover:border-accent hover:text-accent">{t('hero.plan')}</a></div>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-5"><div><strong className="font-grotesk text-2xl text-ink">99.9%</strong><span className="mt-1 block text-xs text-ink-dim">{t('hero.availability')}</span></div><div><strong className="font-grotesk text-2xl text-ink">24h</strong><span className="mt-1 block text-xs text-ink-dim">{t('hero.monitoring')}</span></div><div><strong className="font-grotesk text-2xl text-ink">1.2B+</strong><span className="mt-1 block text-xs text-ink-dim">{t('hero.dailyData')}</span></div></div>
        </div>
        <HeroDashboard />
      </div>
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[10px] tracking-[.2em] text-ink-dim"><ArrowDown size={14} className="animate-bounce text-accent" />{t('hero.scroll')}</div>
    </section>
  );
}

function HeroDashboard() {
  const { t } = useI18n();

  return (
    <div className="relative mx-auto w-full max-w-[650px] animate-float lg:ml-auto">
      <div className="absolute -inset-12 bg-accent/10 blur-3xl" />
      <div className="relative aspect-[1.14] overflow-hidden border border-cyan-200/20 bg-[#071b2c] p-3 shadow-[0_28px_100px_rgba(0,0,0,.45)] md:p-5">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative flex h-full flex-col border border-cyan-200/15 p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-cyan-100/10 pb-4">
            <div><div className="font-grotesk text-[10px] tracking-[.2em] text-accent">{t('hero.digitalTwin')}</div><div className="mt-1 text-sm text-ink">{t('hero.station')}</div></div>
            <div className="flex items-center gap-2 text-[10px] text-accent"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" />{t('hero.live')}</div>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute h-[78%] w-[58%] rounded-[40%] border border-accent/40 opacity-80 [transform:rotateX(66deg)_rotateZ(-18deg)]" />
            <div className="absolute h-[58%] w-[42%] rounded-[40%] border border-accent-2/40 [transform:rotateX(66deg)_rotateZ(-18deg)]" />
            <div className="relative h-28 w-36 border border-accent/70 bg-gradient-to-br from-accent/25 to-transparent shadow-[0_0_55px_rgba(23,200,246,.35)] [transform:perspective(500px)_rotateX(58deg)_rotateZ(-18deg)] md:h-36 md:w-48">
              <div className="absolute inset-x-4 top-4 h-7 border border-accent-2/60 bg-accent-2/10" />
              <div className="absolute inset-x-4 bottom-5 h-9 border border-white/15"><span className="ml-2 font-grotesk text-[9px] text-accent">{t('hero.stationId')}</span></div>
              <div className="absolute -right-5 top-10 h-20 w-px bg-accent/60" />
            </div>
            <span className="absolute left-[10%] top-[20%] flex items-center gap-2 font-grotesk text-[9px] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{t('hero.forecast')}</span>
            <span className="absolute right-[5%] bottom-[18%] flex items-center gap-2 font-grotesk text-[9px] text-accent-2"><span className="h-1.5 w-1.5 rounded-full bg-accent-2" />{t('hero.health')}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-cyan-100/10 pt-4">
            <Metric icon={<Radio size={14} />} label={t('hero.deviceNetwork')} value="12,680" />
            <Metric icon={<Cpu size={14} />} label={t('hero.passengerFlowMetric')} value="8,420 / h" />
            <Metric icon={<ShieldCheck size={14} />} label={t('hero.secureLink')} value="98.6%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-2"><span className="text-accent">{icon}</span><div><div className="font-grotesk text-[8px] tracking-[.14em] text-ink-dim">{label}</div><div className="font-grotesk text-xs text-ink">{value}</div></div></div>;
}
