import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ className = '', children }: CardProps) => (
  <section className={`rounded-3xl bg-white shadow-soft ${className}`}>{children}</section>
);
