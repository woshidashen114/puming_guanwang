import { useMemo, useRef } from 'react';
import { useSmoothScrollProgress, remap } from '@/hooks/useScroll';
import { useI18n } from '@/i18n';

const DEPTH = 135;
const BOX_WIDTH = 270;
const BOX_HEIGHT = 340;

export function PersistentScene() {
  const progress = useSmoothScrollProgress();
  const stageRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => Array.from({ length: 24 }, (_, index) => ({ id: index, left: (index * 47) % 100, top: (index * 73) % 100, depth: .2 + ((index * 31) % 80) / 100 })), []);
  const phase = progress;
  const rotateY = remap(phase, 0, 1, 0, -720) + Math.sin(phase * Math.PI * 2) * 4;
  const topTilt = Math.sin(remap(phase, .34, .56, 0, 1) * Math.PI) * -26;
  const endTilt = Math.sin(remap(phase, .82, 1, 0, 1) * Math.PI) * 22;
  const rotateX = topTilt + endTilt;
  const scale = remap(phase, 0, .12, .72, .92) * remap(phase, .92, 1, 1, .82);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const x = (event.clientX / window.innerWidth - .5) * 6;
    const y = (event.clientY / window.innerHeight - .5) * -6;
    stageRef.current.style.setProperty('--mx', `${x}deg`);
    stageRef.current.style.setProperty('--my', `${y}deg`);
  };

  return <div ref={stageRef} onMouseMove={handleMove} className="pointer-events-none fixed inset-0 z-0 overflow-hidden [perspective:1800px]" aria-hidden="true">
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${50 + Math.sin(phase * Math.PI * 2) * 16}% 42%, hsl(${remap(phase, 0, 1, 197, 190)}, 70%, 13%) 0%, #06131f 66%)` }} />
    <div className="absolute inset-0 opacity-70 blueprint-grid" />
    {particles.map((particle) => <span key={particle.id} className="absolute rounded-full bg-accent/50" style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.depth * 3, height: particle.depth * 3, opacity: .18 + particle.depth * .3, transform: `translateZ(${particle.depth * 180}px) translateY(${progress * -220 * particle.depth}px)` }} />)}
    <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"><div className="absolute h-[45vw] w-[45vw] max-h-[520px] max-w-[520px] rounded-full bg-accent/10 blur-[120px]" /><div className="[transform-style:preserve-3d]" style={{ transform: `rotateX(calc(${rotateX}deg + var(--my, 0deg))) rotateY(calc(${rotateY}deg + var(--mx, 0deg))) scale(${scale})`, transition: 'transform .06s linear' }}><ProductBox /></div></div>
    <div className="absolute inset-x-0 bottom-0 h-[42vh] opacity-60 [transform:perspective(700px)_rotateX(68deg)_translateY(42%)]"><div className="h-[180vh] w-full fine-grid [mask-image:linear-gradient(to_top,transparent,black_40%,transparent)]" /></div>
  </div>;
}

function Face({ children, style, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return <div className={`absolute inset-0 overflow-hidden border border-cyan-100/25 bg-gradient-to-br from-[#123d59]/90 via-[#082339]/90 to-[#04131f]/95 shadow-[inset_0_0_50px_rgba(23,200,246,.06)] ${className}`} style={style}>{children}</div>;
}

function ProductBox() {
  return <div className="relative [transform-style:preserve-3d]" style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}>
    <Face style={{ transform: `translateZ(${DEPTH}px)` }}><Front /></Face>
    <Face style={{ width: BOX_HEIGHT, height: BOX_WIDTH, left: (BOX_WIDTH - BOX_HEIGHT) / 2, top: (BOX_HEIGHT - BOX_WIDTH) / 2, transform: `rotateY(90deg) translateZ(${DEPTH}px)` }}><Side /></Face>
    <Face style={{ transform: `rotateY(180deg) translateZ(${DEPTH}px)` }}><Back /></Face>
    <Face style={{ width: BOX_WIDTH, height: BOX_HEIGHT, transform: `rotateX(90deg) translateZ(${DEPTH}px)`, transformOrigin: 'top center', top: 'auto', bottom: 0 }}><Top /></Face>
    <Face style={{ width: BOX_HEIGHT, height: BOX_WIDTH, left: (BOX_WIDTH - BOX_HEIGHT) / 2, top: (BOX_HEIGHT - BOX_WIDTH) / 2, transform: `rotateY(-90deg) translateZ(${DEPTH}px)` }}><Side /></Face>
    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
  </div>;
}

function FaceHeader({ index, label }: { index: string; label: string }) {
  return <div className="flex items-center justify-between border-b border-cyan-100/15 pb-4"><span className="font-grotesk text-[9px] tracking-[.18em] text-accent">{index} / {label}</span><span className="h-1.5 w-1.5 rounded-full bg-accent" /></div>;
}

function Front() {
  const { t } = useI18n();
  return <div className="flex h-full flex-col justify-between p-6"><FaceHeader index="01" label={t('scene.aiTransit')} /><div><div className="mb-6 flex items-center gap-3"><div className="flex h-16 w-16 items-center justify-center border border-accent/70 bg-accent/10"><div className="h-8 w-8 rotate-45 border border-accent" /></div><div><div className="text-2xl font-bold tracking-[.08em] text-ink">{t('brand.name')}</div><div className="font-grotesk text-[9px] tracking-[.18em] text-accent">{t('brand.descriptor')}</div></div></div><div className="text-xs leading-6 text-ink-dim">{t('scene.transitServices')}<br />{t('scene.cityHub')}</div></div><div className="flex items-center justify-between font-grotesk text-[8px] tracking-[.14em] text-ink-dim"><span>{t('scene.liveSystem')}</span><span>2026 / 01</span></div></div>;
}

function Side() {
  const { t } = useI18n();
  return <div className="flex h-full flex-col justify-between p-6"><FaceHeader index="02" label={t('scene.platform')} /><div><div className="font-grotesk text-[9px] tracking-[.18em] text-accent">{t('scene.digitalTwin')}</div><div className="mt-3 text-2xl font-semibold leading-tight text-ink">{t('scene.globalView')}</div></div><div className="space-y-3 text-[10px] leading-5 text-ink-dim"><div className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />{t('scene.deviceData')}</div><div className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-2" />{t('scene.operationData')}</div><div className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />{t('scene.networkData')}</div></div></div>;
}

function Back() {
  const { t } = useI18n();
  const securityItems = ['scene.deviceAccess', 'scene.encryption', 'scene.audit', 'scene.contentSafety'] as const;
  return <div className="flex h-full flex-col justify-between p-6"><FaceHeader index="04" label={t('scene.security')} /><div><div className="font-grotesk text-[9px] tracking-[.18em] text-accent">{t('scene.trusted')}</div><div className="mt-4 text-xl font-semibold leading-relaxed text-ink">{t('security.title1')}<br />{t('security.title2')}</div></div><div className="grid grid-cols-2 gap-2">{securityItems.map((key) => <div key={key} className="border border-cyan-100/15 px-2 py-2 text-center text-[9px] text-ink-dim">{t(key)}</div>)}</div><div className="font-grotesk text-[8px] tracking-[.14em] text-ink-dim">{t('scene.securityLevel')} / A+</div></div>;
}

function Top() {
  const { t } = useI18n();
  return <div className="flex h-full flex-col justify-between p-6"><FaceHeader index="03" label={t('scene.aiEngine')} /><div><div className="text-3xl font-bold text-ink">98.6<span className="text-base text-accent">%</span></div><div className="mt-1 text-[10px] text-ink-dim">{t('scene.detectionAccuracy')}</div></div><div className="space-y-2"><div className="flex items-end gap-1">{[24, 36, 20, 48, 42, 60, 52, 72, 66, 84, 76].map((height, index) => <span key={index} className="flex-1 bg-accent/60" style={{ height }} />)}</div><div className="flex justify-between font-grotesk text-[8px] text-ink-dim"><span>00:00</span><span>{t('scene.realTime')}</span><span>24:00</span></div></div><div className="font-grotesk text-[8px] tracking-[.14em] text-accent">{t('scene.modelHealthy')}</div></div>;
}
