import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function LearningLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h3 className="text-base font-medium text-sf-text-bold">
            Loading Learning Content
          </h3>
          <p className="text-sm text-sf-text-subtle">
            Preparing grammar rules and questions...
          </p>
        </div>
      </div>
    </div>
  );
}