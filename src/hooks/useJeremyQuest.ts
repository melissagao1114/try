import { useEffect, useMemo, useState } from 'react';
import { getInitialState } from '../data/mockData';
import type { AppState, Reward, RewardCategory, TaskId } from '../types';
import { formatHumanDate } from '../utils/date';
import {
  canAfford,
  createActivity,
  getCompletionRate,
  getWinStatus,
  hydrateDailyState,
  loadState,
  saveState
} from '../utils/logic';

export const useJeremyQuest = () => {
  const [state, setState] = useState<AppState>(() => {
    const persisted = loadState();
    return hydrateDailyState(persisted ?? getInitialState());
  });

  const [toast, setToast] = useState<string | null>(null);
  const [floatingEnergy, setFloatingEnergy] = useState<{ id: TaskId; amount: number } | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const completionRate = getCompletionRate(state.daily.completedTaskIds);
  const winStatus = getWinStatus(state.daily.completedTaskIds);

  const completeTask = (taskId: TaskId, taskTitle: string, energy: number) => {
    if (state.daily.completedTaskIds.includes(taskId)) {
      return;
    }

    const nextCompleted = [...state.daily.completedTaskIds, taskId];
    const nextWin = getWinStatus(nextCompleted);
    const perfectAward = nextWin.perfectDay && !state.daily.perfectDayAwarded ? 40 : 0;
    const gained = energy + perfectAward;

    setState((prev) => ({
      ...prev,
      currentEnergy: prev.currentEnergy + gained,
      totalEnergyEarned: prev.totalEnergyEarned + gained,
      daily: {
        ...prev.daily,
        completedTaskIds: nextCompleted,
        perfectDayAwarded: prev.daily.perfectDayAwarded || nextWin.perfectDay
      },
      completedBySubject: {
        ...prev.completedBySubject,
        [taskId]: prev.completedBySubject[taskId] + 1
      },
      history: [
        createActivity(
          `Completed ${taskTitle}${perfectAward ? ' + Perfect Day Bonus' : ''}`,
          gained,
          perfectAward ? 'bonus' : 'task'
        ),
        ...prev.history
      ].slice(0, 30)
    }));

    setFloatingEnergy({ id: taskId, amount: gained });
    setTimeout(() => setFloatingEnergy(null), 900);
    setToast(perfectAward ? `Perfect Day! +${gained} energy` : `Great work! +${energy} energy`);
  };

  const redeemReward = (reward: Reward) => {
    if (!canAfford(state.currentEnergy, reward)) {
      setToast('Not enough energy yet—keep going!');
      return;
    }

    setState((prev) => ({
      ...prev,
      currentEnergy: prev.currentEnergy - reward.cost,
      redemptions: [
        {
          id: `rd-${Math.random().toString(36).slice(2, 9)}`,
          rewardId: reward.id,
          rewardTitle: reward.title,
          cost: reward.cost,
          category: reward.category,
          redeemedAt: new Date().toISOString(),
          fulfilled: false
        },
        ...prev.redemptions
      ],
      history: [createActivity(`Redeemed: ${reward.title}`, -reward.cost, 'redeem'), ...prev.history].slice(0, 30)
    }));

    setToast(`Redeemed: ${reward.title}`);
  };

  const updateReward = (rewardId: string, title: string, cost: number, category: RewardCategory) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((reward) =>
        reward.id === rewardId ? { ...reward, title, cost: Math.max(1, cost), category } : reward
      )
    }));
    setToast('Reward updated');
  };

  const markRedemptionFulfilled = (redemptionId: string) => {
    setState((prev) => ({
      ...prev,
      redemptions: prev.redemptions.map((redemption) =>
        redemption.id === redemptionId ? { ...redemption, fulfilled: true } : redemption
      )
    }));
    setToast('Marked as fulfilled ✅');
  };

  const manualAdjustEnergy = (delta: number, note: string) => {
    if (!delta) {
      return;
    }

    setState((prev) => ({
      ...prev,
      currentEnergy: Math.max(0, prev.currentEnergy + delta),
      totalEnergyEarned: delta > 0 ? prev.totalEnergyEarned + delta : prev.totalEnergyEarned,
      history: [createActivity(note || 'Manual adjustment', delta, 'manual'), ...prev.history].slice(0, 30)
    }));

    setToast(`${delta > 0 ? '+' : ''}${delta} energy applied`);
  };

  const groupedRewards = useMemo(
    () => ({
      Small: state.rewards.filter((r) => r.category === 'Small'),
      Medium: state.rewards.filter((r) => r.category === 'Medium'),
      Big: state.rewards.filter((r) => r.category === 'Big')
    }),
    [state.rewards]
  );

  return {
    state,
    completionRate,
    winStatus,
    todayLabel: formatHumanDate(state.daily.date),
    groupedRewards,
    toast,
    floatingEnergy,
    actions: {
      completeTask,
      redeemReward,
      updateReward,
      markRedemptionFulfilled,
      manualAdjustEnergy
    }
  };
};
