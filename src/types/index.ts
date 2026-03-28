export type TabKey = 'path' | 'rewards' | 'progress' | 'parent';

export type TaskId = 'math' | 'german' | 'english' | 'physics' | 'python' | 'bonus';

export type Task = {
  id: TaskId;
  title: string;
  details: string[];
  rewardEnergy: number;
  category: 'core' | 'extension' | 'bonus';
};

export type RewardCategory = 'Small' | 'Medium' | 'Big';

export type Reward = {
  id: string;
  title: string;
  cost: number;
  category: RewardCategory;
};

export type Redemption = {
  id: string;
  rewardId: string;
  rewardTitle: string;
  cost: number;
  category: RewardCategory;
  redeemedAt: string;
  fulfilled: boolean;
};

export type DailyState = {
  date: string;
  completedTaskIds: TaskId[];
  perfectDayAwarded: boolean;
};

export type Activity = {
  id: string;
  label: string;
  date: string;
  energyDelta: number;
  kind: 'task' | 'redeem' | 'manual' | 'bonus';
};

export type AppState = {
  studentName: string;
  currentEnergy: number;
  totalEnergyEarned: number;
  streak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  rewards: Reward[];
  redemptions: Redemption[];
  daily: DailyState;
  history: Activity[];
  completedBySubject: Record<TaskId, number>;
  weeklyHistory: { date: string; completedCount: number }[];
};
