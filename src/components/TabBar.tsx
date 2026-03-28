import type { TabKey } from '../types';

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'path', label: 'Path', icon: '🧭' },
  { key: 'rewards', label: 'Rewards', icon: '🎁' },
  { key: 'progress', label: 'Progress', icon: '📈' },
  { key: 'parent', label: 'Parent', icon: '🛠️' }
];

type TabBarProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

export const TabBar = ({ active, onChange }: TabBarProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-xl border-t border-slate-100 bg-white/95 px-2 pb-4 pt-2 backdrop-blur">
    <ul className="grid grid-cols-4 gap-2">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <button
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex w-full flex-col items-center gap-1 rounded-2xl px-1 py-2 text-xs font-semibold transition ${
              active === tab.key ? 'bg-quest-blue text-white shadow-soft' : 'text-slate-600 hover:bg-cream-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
);
