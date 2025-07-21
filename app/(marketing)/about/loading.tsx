import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AboutLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="md" />
        <div className="space-y-2">
          <h3 className="text-base font-medium text-sf-text-bold">
            Loading About Page
          </h3>
          <p className="text-sm text-sf-text-subtle">
            Preparing information about OnushilonHub...
          </p>
        </div>
      </div>
    </div>
  );
}