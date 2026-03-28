import { Card } from '../components/Card';
import { DAILY_TASKS } from '../data/mockData';
import type { Activity, AppState } from '../types';
import { formatHumanDate } from '../utils/date';

type ProgressPageProps = {
  state: AppState;
};

const energyText = (activity: Activity) => `${activity.energyDelta > 0 ? '+' : ''}${activity.energyDelta}`;

export const ProgressPage = ({ state }: ProgressPageProps) => (
  <div className="space-y-4 pb-24">
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-4">
        <p className="text-xs uppercase text-slate-500">Current Streak</p>
        <p className="mt-1 text-2xl font-bold text-quest-dark">🔥 {state.streak}</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs uppercase text-slate-500">Longest Streak</p>
        <p className="mt-1 text-2xl font-bold text-quest-dark">🏆 {state.longestStreak}</p>
      </Card>
      <Card className="col-span-2 p-4">
        <p className="text-xs uppercase text-slate-500">Total Energy Earned</p>
        <p className="mt-1 text-3xl font-bold text-quest-green">⚡ {state.totalEnergyEarned}</p>
      </Card>
    </div>

    <Card className="p-4">
      <p className="text-sm font-semibold text-quest-dark">Weekly Completion</p>
      <div className="mt-3 flex items-end gap-2">
        {state.weeklyHistory.map((day) => (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-quest-blue to-quest-green transition-all duration-500"
              style={{ height: `${Math.max(day.completedCount * 14, 8)}px` }}
            />
            <span className="text-[10px] text-slate-500">{new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2)}</span>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-4">
      <p className="text-sm font-semibold text-quest-dark">Subject Completion Stats</p>
      <div className="mt-3 space-y-2">
        {DAILY_TASKS.map((task) => (
          <div key={task.id} className="flex items-center justify-between rounded-2xl bg-cream-100 px-3 py-2">
            <span className="text-sm font-medium text-slate-700">{task.title}</span>
            <span className="text-sm font-semibold text-quest-dark">{state.completedBySubject[task.id]} times</span>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-4">
      <p className="text-sm font-semibold text-quest-dark">Recent Activity</p>
      <div className="mt-3 space-y-2">
        {state.history.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2">
            <div>
              <p className="text-sm font-medium text-slate-700">{activity.label}</p>
              <p className="text-xs text-slate-400">{formatHumanDate(activity.date.slice(0, 10))}</p>
            </div>
            <span className={`text-sm font-bold ${activity.energyDelta >= 0 ? 'text-quest-green' : 'text-rose-500'}`}>
              {energyText(activity)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
