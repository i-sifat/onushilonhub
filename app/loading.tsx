import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sf-bg">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-sf-text-bold">
            Loading OnushilonHub
          </h2>
          <p className="text-sm text-sf-text-subtle">
            Preparing your learning experience...
          </p>
        </div>
      </div>
    </div>
  );
}