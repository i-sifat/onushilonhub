'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTestTimer } from '@/hooks/useTimer';
import { Clock, AlertTriangle } from 'lucide-react';

interface TestTimerProps {
  totalTimeMinutes: number;
  onTimeUp: () => void;
  onWarning?: () => void;
  isActive: boolean;
}

export default function TestTimer({ 
  totalTimeMinutes, 
  onTimeUp, 
  onWarning,
  isActive 
}: TestTimerProps) {
  const timer = useTestTimer(totalTimeMinutes, onTimeUp, onWarning);

  useEffect(() => {
    if (isActive && !timer.isRunning && !timer.isFinished) {
      timer.start();
    } else if (!isActive && timer.isRunning) {
      timer.pause();
    }
  }, [isActive, timer]);

  const getTimerColor = () => {
    if (timer.isWarning) return 'text-red-500';
    if (timer.timeRemaining < 300) return 'text-yellow-500'; // 5 minutes
    return 'text-sf-text-bold';
  };

  const getProgressColor = () => {
    if (timer.isWarning) return 'bg-red-500';
    if (timer.timeRemaining < 300) return 'bg-yellow-500';
    return 'bg-sf-button';
  };

  return (
    <Card className={`border-sf-text-muted/20 ${timer.isWarning ? 'border-red-300 bg-red-50/10' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {timer.isWarning ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <Clock className="h-5 w-5 text-sf-button" />
            )}
            <span className="text-sm font-medium text-sf-text-subtle">
              Time Remaining
            </span>
          </div>
          <div className={`text-lg font-bold ${getTimerColor()}`}>
            {timer.timeString}
          </div>
        </div>

        <div className="space-y-2">
          <Progress 
            value={timer.progressPercentage} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-sf-text-muted">
            <span>Elapsed: {timer.formatTime(timer.elapsedTime)}</span>
            <span>Total: {timer.formatTime(timer.totalTime)}</span>
          </div>
        </div>

        {timer.isWarning && (
          <div className="mt-3 p-2 bg-red-100/20 border border-red-300/30 rounded text-center">
            <p className="text-xs text-red-600 font-medium">
              ⚠️ Time is running out!
            </p>
          </div>
        )}

        {timer.isPaused && (
          <div className="mt-3 p-2 bg-yellow-100/20 border border-yellow-300/30 rounded text-center">
            <p className="text-xs text-yellow-600 font-medium">
              ⏸️ Timer Paused
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}