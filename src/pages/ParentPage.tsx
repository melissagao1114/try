import { useState } from 'react';
import { Card } from '../components/Card';
import type { AppState, RewardCategory } from '../types';

type ParentPageProps = {
  state: AppState;
  onUpdateReward: (rewardId: string, title: string, cost: number, category: RewardCategory) => void;
  onMarkFulfilled: (redemptionId: string) => void;
  onManualAdjustEnergy: (delta: number, note: string) => void;
};

export const ParentPage = ({ state, onUpdateReward, onMarkFulfilled, onManualAdjustEnergy }: ParentPageProps) => {
  const [delta, setDelta] = useState(0);
  const [note, setNote] = useState('Parent adjustment');

  return (
    <div className="space-y-4 pb-24">
      <Card className="p-4">
        <p className="text-sm font-semibold text-quest-dark">Manual Energy Adjustment</p>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={Number.isNaN(delta) ? 0 : delta}
            onChange={(e) => setDelta(parseInt(e.target.value || '0', 10))}
            className="w-24 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-quest-blue"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-quest-blue"
            placeholder="Reason"
          />
          <button
            type="button"
            onClick={() => onManualAdjustEnergy(delta, note)}
            className="rounded-xl bg-quest-blue px-3 py-2 text-sm font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-semibold text-quest-dark">Edit Reward Catalog</p>
        <div className="mt-3 space-y-3">
          {state.rewards.map((reward) => (
            <RewardEditor
              key={reward.id}
              rewardId={reward.id}
              initialTitle={reward.title}
              initialCost={reward.cost}
              initialCategory={reward.category}
              onSave={onUpdateReward}
            />
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-semibold text-quest-dark">Redemption History</p>
        <div className="mt-3 space-y-2">
          {state.redemptions.map((redemption) => (
            <div key={redemption.id} className="rounded-2xl border border-slate-100 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{redemption.rewardTitle}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(redemption.redeemedAt).toLocaleDateString()} • {redemption.cost} ⚡
                  </p>
                </div>
                {redemption.fulfilled ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Fulfilled</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onMarkFulfilled(redemption.id)}
                    className="rounded-full bg-quest-orange px-2 py-1 text-xs font-semibold text-white"
                  >
                    Mark fulfilled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

type RewardEditorProps = {
  rewardId: string;
  initialTitle: string;
  initialCost: number;
  initialCategory: RewardCategory;
  onSave: (rewardId: string, title: string, cost: number, category: RewardCategory) => void;
};

const RewardEditor = ({ rewardId, initialTitle, initialCost, initialCategory, onSave }: RewardEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [cost, setCost] = useState(initialCost);
  const [category, setCategory] = useState<RewardCategory>(initialCategory);

  return (
    <div className="rounded-2xl bg-cream-100 p-3">
      <div className="grid grid-cols-12 gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="col-span-6 rounded-xl border border-slate-200 px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(parseInt(e.target.value || '0', 10))}
          className="col-span-3 rounded-xl border border-slate-200 px-2 py-1.5 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as RewardCategory)}
          className="col-span-3 rounded-xl border border-slate-200 px-2 py-1.5 text-sm"
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Big</option>
        </select>
      </div>
      <button
        type="button"
        onClick={() => onSave(rewardId, title.trim() || initialTitle, cost, category)}
        className="mt-2 rounded-full bg-quest-green px-3 py-1 text-xs font-semibold text-white"
      >
        Save
      </button>
    </div>
  );
};
