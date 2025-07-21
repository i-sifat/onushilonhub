import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function MarketingLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <LoadingSpinner size="md" />
        <p className="text-sm text-sf-text-subtle">
          Loading page content...
        </p>
      </div>
    </div>
  );
}