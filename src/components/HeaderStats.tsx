import { Card } from './Card';

type HeaderStatsProps = {
  dateLabel: string;
  streak: number;
  energy: number;
  completionRate: number;
};

export const HeaderStats = ({ dateLabel, streak, energy, completionRate }: HeaderStatsProps) => (
  <Card className="p-4">
    <p className="text-sm font-medium text-slate-500">{dateLabel}</p>
    <div className="mt-2 flex items-center justify-between gap-2">
      <div>
        <p className="text-xs uppercase text-slate-400">Streak</p>
        <p className="text-2xl font-bold text-quest-dark">🔥 {streak} days</p>
      </div>
      <div className="text-right">
        <p className="text-xs uppercase text-slate-400">Energy</p>
        <p className="text-2xl font-bold text-quest-green">⚡ {energy}</p>
      </div>
    </div>

    <div className="mt-4">
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>Daily Progress</span>
        <span>{completionRate}%</span>
      </div>
      <div className="h-3 rounded-full bg-cream-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-quest-green to-quest-blue transition-all duration-500 ease-out animate-pulseBar"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  </Card>
);
