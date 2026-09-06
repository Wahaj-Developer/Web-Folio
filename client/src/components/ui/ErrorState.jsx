import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong', retry = null }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
