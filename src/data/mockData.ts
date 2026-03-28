import type { AppState, Reward, Task } from '../types';

export const DAILY_TASKS: Task[] = [
  {
    id: 'math',
    title: 'Math',
    details: ['Anton 0.5 or 1 block'],
    rewardEnergy: 40,
    category: 'core'
  },
  {
    id: 'german',
    title: 'German',
    details: ['Anton 0.5 or 1 block'],
    rewardEnergy: 30,
    category: 'core'
  },
  {
    id: 'english',
    title: 'English',
    details: ['30 vocabulary words', '20 minutes New Oriental'],
    rewardEnergy: 30,
    category: 'core'
  },
  {
    id: 'physics',
    title: 'Physics',
    details: ['1 Khan Academy lesson'],
    rewardEnergy: 20,
    category: 'extension'
  },
  {
    id: 'python',
    title: 'Python',
    details: ['1 small exercise', 'XiaoJiaYu practice'],
    rewardEnergy: 20,
    category: 'extension'
  },
  {
    id: 'bonus',
    title: 'Bonus',
    details: ['Reading 10 min / tidying / one-sentence reflection'],
    rewardEnergy: 15,
    category: 'bonus'
  }
];

export const DEFAULT_REWARDS: Reward[] = [
  { id: 'rw-1', title: 'Snack', cost: 120, category: 'Small' },
  { id: 'rw-2', title: 'Dessert / Bubble Tea', cost: 180, category: 'Small' },
  { id: 'rw-3', title: 'Extra 30 min Screen Time', cost: 220, category: 'Small' },
  { id: 'rw-4', title: 'Buy One Small Thing', cost: 450, category: 'Medium' },
  { id: 'rw-5', title: 'Shopping Outing', cost: 600, category: 'Medium' },
  { id: 'rw-6', title: 'Favorite Restaurant', cost: 750, category: 'Medium' },
  { id: 'rw-7', title: 'Special Outing', cost: 1200, category: 'Big' },
  { id: 'rw-8', title: 'Bigger Gift Budget', cost: 1800, category: 'Big' }
];

const toISODate = (date: Date): string => date.toISOString().slice(0, 10);

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

export const getInitialState = (): AppState => ({
  studentName: 'Jeremy',
  currentEnergy: 260,
  totalEnergyEarned: 1240,
  streak: 4,
  longestStreak: 9,
  lastCompletedDate: toISODate(yesterday),
  rewards: DEFAULT_REWARDS,
  redemptions: [
    {
      id: 'rd-1',
      rewardId: 'rw-1',
      rewardTitle: 'Snack',
      cost: 120,
      category: 'Small',
      redeemedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      fulfilled: true
    },
    {
      id: 'rd-2',
      rewardId: 'rw-3',
      rewardTitle: 'Extra 30 min Screen Time',
      cost: 220,
      category: 'Small',
      redeemedAt: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      fulfilled: false
    }
  ],
  daily: {
    date: toISODate(today),
    completedTaskIds: [],
    perfectDayAwarded: false
  },
  history: [
    {
      id: 'a-1',
      label: 'Completed English',
      date: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      energyDelta: 30,
      kind: 'task'
    },
    {
      id: 'a-2',
      label: 'Redeemed: Extra 30 min Screen Time',
      date: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      energyDelta: -220,
      kind: 'redeem'
    }
  ],
  completedBySubject: {
    math: 11,
    german: 10,
    english: 13,
    physics: 8,
    python: 7,
    bonus: 6
  },
  weeklyHistory: Array.from({ length: 7 }).map((_, idx) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - idx));
    return {
      date: toISODate(day),
      completedCount: [4, 5, 3, 6, 4, 5, 2][idx]
    };
  })
});
