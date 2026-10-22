import { Nav, ScrollRail } from '@/components/Nav';
import { PersistentScene } from '@/components/PersistentScene';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Specs } from '@/components/Specs';
import { Process } from '@/components/Process';
import { Manifesto } from '@/components/Manifesto';
import { Contact } from '@/components/Contact';
import { useScrollProgress } from '@/hooks/useScroll';
import { LanguageProvider } from '@/i18n';

function App() {
  const progress = useScrollProgress();
  return <LanguageProvider><div className="relative min-h-screen bg-bg text-ink"><PersistentScene /><Nav /><ScrollRail progress={progress} /><main className="relative z-10"><Hero /><Studio /><Specs /><Process /><Manifesto /><Contact /></main></div></LanguageProvider>;
}

export default App;
