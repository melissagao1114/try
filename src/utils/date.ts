export const toISODate = (date: Date): string => date.toISOString().slice(0, 10);

export const formatHumanDate = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

export const isYesterday = (currentIso: string, previousIso: string): boolean => {
  const current = new Date(`${currentIso}T00:00:00`);
  const previous = new Date(`${previousIso}T00:00:00`);
  const diff = (current.getTime() - previous.getTime()) / (24 * 60 * 60 * 1000);
  return diff === 1;
};
