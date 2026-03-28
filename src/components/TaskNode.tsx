import type { Task } from '../types';
import { Card } from './Card';

type TaskNodeProps = {
  task: Task;
  isCompleted: boolean;
  isActive: boolean;
  showFloat: boolean;
  floatAmount: number;
  onComplete: () => void;
};

export const TaskNode = ({ task, isCompleted, isActive, showFloat, floatAmount, onComplete }: TaskNodeProps) => (
  <div className="relative">
    <Card
      className={`relative overflow-hidden p-4 transition-all duration-300 ${
        isCompleted
          ? 'border-2 border-quest-green bg-emerald-50 animate-pop'
          : isActive
            ? 'border-2 border-quest-blue ring-2 ring-blue-100'
            : 'border border-slate-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-quest-dark">{task.title}</p>
          <ul className="mt-1 list-disc pl-4 text-sm text-slate-600">
            {task.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm font-semibold text-quest-orange">+{task.rewardEnergy} energy</p>
        </div>
        {isCompleted ? (
          <span className="rounded-full bg-quest-green px-3 py-1 text-sm font-semibold text-white">✓ Done</span>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="rounded-full bg-quest-blue px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Complete
          </button>
        )}
      </div>
    </Card>

    {showFloat && <span className="absolute right-3 top-2 text-sm font-bold text-quest-green animate-float">+{floatAmount}</span>}
  </div>
);
