import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { EventForm } from './components/EventForm';
import { UnscheduledTasks } from './components/UnscheduledTasks';
import { Goals } from './components/Goals';
import { AIAnalysis } from './components/AIAnalysis';
import { Task, Goal, AIAnalysisResult, Category } from './types';
import { CalendarDays } from 'lucide-react';
import { defaultCategories } from './data/categories';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [showEventForm, setShowEventForm] = useState(false);

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    setShowEventForm(false);
    setSelectedDate(undefined);
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleAddGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const handleAddCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const handleAcceptSchedule = (result: AIAnalysisResult) => {
    const updatedTasks = [...tasks];
    
    result.suggestions.forEach(suggestion => {
      const taskIndex = updatedTasks.findIndex(t => t.id === suggestion.taskId);
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          date: suggestion.suggestedDate,
          time: suggestion.suggestedTime,
        };
      }
    });

    setTasks(updatedTasks);
  };

  const handleOpenEventForm = (date: string) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const scheduledTasks = tasks.filter(t => t.date);
  const unscheduledTasks = tasks.filter(t => !t.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarDays className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Adaptive Life Planner</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Smart scheduling for university students with AI-powered optimization
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Calendar
              scheduledTasks={scheduledTasks}
              onAddTask={handleOpenEventForm}
              onRemoveTask={handleRemoveTask}
              categories={categories}
            />

            <AIAnalysis
              tasks={tasks}
              goals={goals}
              onAcceptSchedule={handleAcceptSchedule}
            />
          </div>

          <div className="space-y-6">
            <UnscheduledTasks
              tasks={unscheduledTasks}
              onScheduleTask={(taskId, date) => {
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                  setTasks(tasks.map(t => 
                    t.id === taskId ? { ...t, date } : t
                  ));
                }
              }}
              onRemoveTask={handleRemoveTask}
              categories={categories}
            />

            <Goals
              goals={goals}
              onAddGoal={handleAddGoal}
              onDeleteGoal={handleDeleteGoal}
            />
          </div>
        </div>
      </div>

      {showEventForm && selectedDate && (
        <EventForm
          onAddEvent={handleAddTask}
          onClose={() => {
            setShowEventForm(false);
            setSelectedDate(undefined);
          }}
          preselectedDate={selectedDate}
          categories={categories}
          onAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
}

export default App;
