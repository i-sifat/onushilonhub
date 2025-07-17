'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface TimerState {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  totalTime: number;
  elapsedTime: number;
}

export interface UseTimerOptions {
  initialTime: number; // in seconds
  onTick?: (timeRemaining: number) => void;
  onFinish?: () => void;
  onWarning?: (timeRemaining: number) => void;
  warningThreshold?: number; // seconds before warning
  autoStart?: boolean;
}

export function useTimer({
  initialTime,
  onTick,
  onFinish,
  onWarning,
  warningThreshold = 60, // 1 minute warning by default
  autoStart = false
}: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasWarned, setHasWarned] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  const totalTime = initialTime;
  const elapsedTime = totalTime - timeRemaining;

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start timer
  const start = useCallback(() => {
    if (isFinished) return;
    
    setIsRunning(true);
    setIsPaused(false);
    
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [isFinished]);

  // Pause timer
  const pause = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
    clearTimer();
  }, [clearTimer]);

  // Resume timer
  const resume = useCallback(() => {
    if (isFinished) return;
    
    setIsRunning(true);
    setIsPaused(false);
  }, [isFinished]);

  // Stop timer
  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(true);
    clearTimer();
  }, [clearTimer]);

  // Reset timer
  const reset = useCallback(() => {
    clearTimer();
    setTimeRemaining(initialTime);
    setIsRunning(autoStart);
    setIsPaused(false);
    setIsFinished(false);
    setHasWarned(false);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  }, [initialTime, autoStart, clearTimer]);

  // Add time to timer
  const addTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds));
  }, []);

  // Set specific time
  const setTime = useCallback((seconds: number) => {
    setTimeRemaining(Math.max(0, seconds));
    if (seconds <= 0) {
      setIsFinished(true);
      setIsRunning(false);
    }
  }, []);

  // Main timer effect
  useEffect(() => {
    if (isRunning && !isFinished && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Call onTick callback
          if (onTick) {
            onTick(newTime);
          }
          
          // Check for warning threshold
          if (!hasWarned && newTime <= warningThreshold && newTime > 0) {
            setHasWarned(true);
            if (onWarning) {
              onWarning(newTime);
            }
          }
          
          // Check if timer finished
          if (newTime <= 0) {
            setIsFinished(true);
            setIsRunning(false);
            if (onFinish) {
              onFinish();
            }
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isRunning, isFinished, isPaused, onTick, onFinish, onWarning, warningThreshold, hasWarned, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  // Format time helper
  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Get progress percentage
  const getProgress = useCallback((): number => {
    return ((totalTime - timeRemaining) / totalTime) * 100;
  }, [totalTime, timeRemaining]);

  // Check if timer is in warning state
  const isWarning = timeRemaining <= warningThreshold && timeRemaining > 0;

  const timerState: TimerState = {
    timeRemaining,
    isRunning,
    isPaused,
    isFinished,
    totalTime,
    elapsedTime
  };

  return {
    ...timerState,
    start,
    pause,
    resume,
    stop,
    reset,
    addTime,
    setTime,
    formatTime: (time?: number) => formatTime(time ?? timeRemaining),
    getProgress,
    isWarning,
    // Convenience methods
    toggle: isRunning ? pause : resume,
    timeString: formatTime(timeRemaining),
    progressPercentage: getProgress()
  };
}

// Hook for question-specific timer
export function useQuestionTimer(timeLimit: number, onTimeUp?: () => void) {
  return useTimer({
    initialTime: timeLimit,
    onFinish: onTimeUp,
    warningThreshold: Math.min(30, timeLimit * 0.2), // 20% of time or 30 seconds
    autoStart: true
  });
}

// Hook for test session timer
export function useTestTimer(
  totalTimeMinutes: number, 
  onTimeUp?: () => void,
  onWarning?: () => void
) {
  return useTimer({
    initialTime: totalTimeMinutes * 60,
    onFinish: onTimeUp,
    onWarning: onWarning,
    warningThreshold: 300, // 5 minutes warning
    autoStart: false
  });
}