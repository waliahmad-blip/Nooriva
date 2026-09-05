export default function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-ink/10 rounded-full mb-3" />
      <div className="h-4 bg-ink/10 rounded-full mb-3 w-3/4" />
      <div className="h-4 bg-ink/10 rounded-full w-1/2" />
    </div>
  );
}
