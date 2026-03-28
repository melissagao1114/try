import { DAILY_TASKS } from '../data/mockData';
import type { Activity, AppState, Reward, TaskId } from '../types';
import { isYesterday, toISODate } from './date';

export const STORAGE_KEY = 'jeremy-quest-state-v1';

export const getWinStatus = (completedTaskIds: TaskId[]) => {
  const has = (id: TaskId) => completedTaskIds.includes(id);
  const basicWin = has('math') && has('german') && has('english');
  const strongDay = basicWin && (has('physics') || has('python'));
  const perfectDay = has('math') && has('german') && has('english') && has('physics') && has('python');
  return { basicWin, strongDay, perfectDay };
};

export const getCompletionRate = (completedTaskIds: TaskId[]) =>
  Math.round((completedTaskIds.length / DAILY_TASKS.length) * 100);

export const hydrateDailyState = (state: AppState, now = new Date()): AppState => {
  const todayIso = toISODate(now);
  if (state.daily.date === todayIso) {
    return state;
  }

  const preservedHistory = [...state.weeklyHistory, { date: state.daily.date, completedCount: state.daily.completedTaskIds.length }]
    .slice(-7)
    .map((entry) => ({ ...entry }));

  const newStreak =
    state.lastCompletedDate && isYesterday(todayIso, state.lastCompletedDate) ? state.streak + 1 : 1;

  return {
    ...state,
    streak: state.daily.completedTaskIds.length > 0 ? newStreak : state.streak,
    longestStreak: Math.max(state.longestStreak, state.daily.completedTaskIds.length > 0 ? newStreak : state.longestStreak),
    lastCompletedDate: state.daily.completedTaskIds.length > 0 ? state.daily.date : state.lastCompletedDate,
    weeklyHistory: preservedHistory,
    daily: {
      date: todayIso,
      completedTaskIds: [],
      perfectDayAwarded: false
    }
  };
};

export const createActivity = (label: string, energyDelta: number, kind: Activity['kind']): Activity => ({
  id: `a-${Math.random().toString(36).slice(2, 9)}`,
  label,
  date: new Date().toISOString(),
  energyDelta,
  kind
});

export const canAfford = (energy: number, reward: Reward): boolean => energy >= reward.cost;

export const loadState = (): AppState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppState) : null;
  } catch {
    return null;
  }
};

export const saveState = (state: AppState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
