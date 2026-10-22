import { useRef, useEffect } from 'react';

/** Props for the SplitReveal component. */
type SplitRevealProps = {
  text: string;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

type LineState = 'hidden' | 'visible';

/**
 * Splits text into words and reveals each word with a vertical translate
 * as it scrolls into view. Words are wrapped in an overflow-hidden mask so
 * the reveal reads as a curtain lift.
 */
export function SplitReveal({
  text,
  className = '',
  lineClassName = '',
  stagger = 0.045,
  delay = 0,
  once = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const masks = Array.from(el.querySelectorAll<HTMLElement>('[data-mask]'));
    let triggered = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            masks.forEach((m, i) => {
              m.style.transitionDelay = `${delay + i * stagger}s`;
              m.dataset.state = 'visible';
            });
            triggered = true;
            if (once) io.disconnect();
          } else if (!once) {
            masks.forEach((m) => {
              m.style.transitionDelay = '0s';
              m.dataset.state = 'hidden';
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stagger, delay, once, text]);

  const stateStyle = (state: LineState) => ({
    transform: state === 'visible' ? 'translateY(0)' : 'translateY(110%)',
  });

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em' }}
        >
          <span
            data-mask
            data-state="hidden"
            className={`inline-block will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${lineClassName}`}
            style={stateStyle('hidden')}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

/**
 * A single line that rises from below inside a mask. Lightweight alternative
 * to SplitReveal for short labels.
 */
export function LineReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>('[data-line-inner]');
    if (!inner) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inner.style.transitionDelay = `${delay}s`;
            inner.style.transform = 'translateY(0)';
            if (once) io.disconnect();
          } else if (!once) {
            inner.style.transitionDelay = '0s';
            inner.style.transform = 'translateY(110%)';
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        data-line-inner
        className="will-change-transform transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: 'translateY(110%)' }}
      >
        {children}
      </div>
    </div>
  );
}
