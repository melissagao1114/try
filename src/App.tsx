import { useState } from 'react';
import { TabBar } from './components/TabBar';
import { Toast } from './components/Toast';
import { useJeremyQuest } from './hooks/useJeremyQuest';
import { ParentPage } from './pages/ParentPage';
import { PathPage } from './pages/PathPage';
import { ProgressPage } from './pages/ProgressPage';
import { RewardsPage } from './pages/RewardsPage';
import type { TabKey } from './types';

export const App = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('path');
  const { state, completionRate, winStatus, groupedRewards, todayLabel, toast, floatingEnergy, actions } = useJeremyQuest();

  return (
    <div className="mx-auto min-h-screen max-w-xl bg-cream-50 px-3 pb-28 pt-4 text-slate-800">
      <header className="mb-4 rounded-3xl bg-gradient-to-r from-quest-blue to-quest-green p-4 text-white shadow-soft">
        <p className="text-sm opacity-90">Jeremy Quest</p>
        <h1 className="text-2xl font-bold">Level up your day, Jeremy 🚀</h1>
      </header>

      {activeTab === 'path' && (
        <PathPage
          dateLabel={todayLabel}
          streak={state.streak}
          currentEnergy={state.currentEnergy}
          completionRate={completionRate}
          completedTaskIds={state.daily.completedTaskIds}
          floatingEnergy={floatingEnergy}
          onCompleteTask={actions.completeTask}
          winStatus={winStatus}
        />
      )}

      {activeTab === 'rewards' && (
        <RewardsPage currentEnergy={state.currentEnergy} groupedRewards={groupedRewards} onRedeem={actions.redeemReward} />
      )}

      {activeTab === 'progress' && <ProgressPage state={state} />}

      {activeTab === 'parent' && (
        <ParentPage
          state={state}
          onUpdateReward={actions.updateReward}
          onMarkFulfilled={actions.markRedemptionFulfilled}
          onManualAdjustEnergy={actions.manualAdjustEnergy}
        />
      )}

      <Toast message={toast} />
      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
};
