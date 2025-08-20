import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ progress, className, showPercentage = false }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Progress</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-secondary rounded-full h-2 shadow-soft overflow-hidden">
        <div
          className="bg-gradient-primary h-full rounded-full transition-all duration-500 ease-smooth"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}