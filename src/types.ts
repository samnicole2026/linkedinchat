export interface Task {
  id: string;
  name: string;
  date: string; // Empty string for unscheduled tasks
  time?: string; // Time of day (HH:MM format)
  isAllDay: boolean;
  importance: number;
  category: string;
  isMovable: boolean;
  isLockedIn: boolean;
  movabilityRange?: number;
  deadline?: string; // Required for movable tasks
  duration: number;
  durationType: 'hours' | 'days';
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: string; // Optional
  type: 'short-term' | 'long-term';
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ScheduleSuggestion {
  taskId: string;
  taskName: string;
  suggestedDate: string;
  suggestedTime: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIAnalysisResult {
  suggestions: ScheduleSuggestion[];
  conflicts: {
    tasks: string[];
    issue: string;
    recommendation: string;
  }[];
  priorityRecommendations: {
    taskName: string;
    reason: string;
    shouldPrioritize: boolean;
  }[];
}

export type CalendarView = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface SuggestedGoal {
  text: string;
  category: string;
  type: 'short-term' | 'long-term';
}
