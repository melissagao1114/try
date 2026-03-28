import { DAILY_TASKS } from '../data/mockData';
import type { TaskId } from '../types';
import { HeaderStats } from '../components/HeaderStats';
import { Card } from '../components/Card';
import { TaskNode } from '../components/TaskNode';

type PathPageProps = {
  dateLabel: string;
  streak: number;
  currentEnergy: number;
  completionRate: number;
  completedTaskIds: TaskId[];
  floatingEnergy: { id: TaskId; amount: number } | null;
  onCompleteTask: (taskId: TaskId, title: string, energy: number) => void;
  winStatus: { basicWin: boolean; strongDay: boolean; perfectDay: boolean };
};

export const PathPage = ({
  dateLabel,
  streak,
  currentEnergy,
  completionRate,
  completedTaskIds,
  floatingEnergy,
  onCompleteTask,
  winStatus
}: PathPageProps) => {
  const nextTaskId = DAILY_TASKS.find((task) => !completedTaskIds.includes(task.id))?.id;

  return (
    <div className="space-y-4 pb-24">
      <HeaderStats dateLabel={dateLabel} streak={streak} energy={currentEnergy} completionRate={completionRate} />

      <Card className="p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Today&apos;s status</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
          <span className={`rounded-full px-3 py-1 ${winStatus.basicWin ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
            Basic Win
          </span>
          <span className={`rounded-full px-3 py-1 ${winStatus.strongDay ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
            Strong Day
          </span>
          <span className={`rounded-full px-3 py-1 ${winStatus.perfectDay ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
            Perfect Day (+40)
          </span>
        </div>
      </Card>

      <div className="relative space-y-4 before:absolute before:bottom-6 before:left-4 before:top-6 before:w-1 before:rounded-full before:bg-cream-200">
        {DAILY_TASKS.map((task, index) => {
          const isCompleted = completedTaskIds.includes(task.id);
          return (
            <div key={task.id} className="relative pl-8">
              <span
                className={`absolute left-1.5 top-6 h-5 w-5 rounded-full border-4 border-cream-50 ${
                  isCompleted ? 'bg-quest-green' : index % 2 ? 'bg-quest-blue' : 'bg-quest-orange'
                }`}
              />

              <TaskNode
                task={task}
                isCompleted={isCompleted}
                isActive={!isCompleted && task.id === nextTaskId}
                showFloat={floatingEnergy?.id === task.id}
                floatAmount={floatingEnergy?.amount ?? 0}
                onComplete={() => onCompleteTask(task.id, task.title, task.rewardEnergy)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
