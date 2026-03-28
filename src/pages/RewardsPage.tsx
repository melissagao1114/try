import { Card } from '../components/Card';
import type { Reward } from '../types';

type RewardsPageProps = {
  currentEnergy: number;
  groupedRewards: Record<'Small' | 'Medium' | 'Big', Reward[]>;
  onRedeem: (reward: Reward) => void;
};

const categoryColor: Record<'Small' | 'Medium' | 'Big', string> = {
  Small: 'text-emerald-700 bg-emerald-50',
  Medium: 'text-blue-700 bg-blue-50',
  Big: 'text-orange-700 bg-orange-50'
};

export const RewardsPage = ({ currentEnergy, groupedRewards, onRedeem }: RewardsPageProps) => (
  <div className="space-y-4 pb-24">
    <Card className="p-4">
      <p className="text-xs uppercase text-slate-500">Energy Balance</p>
      <p className="mt-1 text-3xl font-bold text-quest-green">⚡ {currentEnergy}</p>
    </Card>

    {(['Small', 'Medium', 'Big'] as const).map((category) => (
      <section key={category} className="space-y-2">
        <h2 className="px-1 text-sm font-semibold text-slate-700">{category} Rewards</h2>
        {groupedRewards[category].map((reward) => {
          const affordable = currentEnergy >= reward.cost;
          return (
            <Card key={reward.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-quest-dark">{reward.title}</p>
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor[category]}`}>
                    {reward.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-quest-orange">{reward.cost} ⚡</p>
                  <button
                    type="button"
                    disabled={!affordable}
                    onClick={() => onRedeem(reward)}
                    className="mt-2 rounded-full bg-quest-blue px-3 py-1.5 text-xs font-semibold text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {affordable ? 'Redeem' : 'Need more'}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    ))}
  </div>
);
