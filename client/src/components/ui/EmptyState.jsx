import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'Nothing here yet', description = 'Check back later for new content.' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Inbox className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-4" />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
