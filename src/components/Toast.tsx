type ToastProps = {
  message: string | null;
};

export const Toast = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed left-1/2 top-4 z-30 w-[92%] max-w-sm -translate-x-1/2 rounded-2xl bg-quest-dark px-4 py-3 text-center text-sm font-medium text-white shadow-soft animate-pop">
      {message}
    </div>
  );
};
