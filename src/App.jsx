import React, { useState, useEffect } from 'react';
import { useLocalStorage, useResetDaily } from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import Filters from './components/Filters';
import './styles/App.css';
import './styles/components.css';

function App() {
  // Tasks state
  const [tasks, setTasks] = useLocalStorage('resotrack_tasks', []);
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskSearch, setTaskSearch] = useState('');
  
  // Habits state
  const [habits, setHabits] = useResetDaily('resotrack_habits', []);
  const [habitFilter, setHabitFilter] = useState('all');
  
  // Form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingHabit, setEditingHabit] = useState(null);
  
  // Initialize with demo data if empty
  useEffect(() => {
    if (tasks.length === 0 && habits.length === 0) {
      
      
      setTasks([
        {
          id: 1,
          title: 'Plan your New Year resolutions',
          notes: 'Break down big goals into actionable steps',
          priority: 'high',
          category: 'Personal',
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Setup workout routine',
          notes: '30 minutes cardio + strength training',
          priority: 'medium',
          category: 'Health',
          completed: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Read Atomic Habits book',
          notes: 'Chapter 1-2',
          priority: 'low',
          category: 'Study',
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]);
      
      setHabits([
        {
          id: 1,
          name: 'Morning Meditation',
          category: 'Mindfulness',
          target: 1,
          completedToday: false,
          streak: 0,
          longestStreak: 0,
          weeklyProgress: [true, true, false, true, false, true, false]
        },
        {
          id: 2,
          name: 'Drink 8 glasses of water',
          category: 'Health',
          target: 8,
          current: 4,
          completedToday: false,
          streak: 3,
          longestStreak: 5,
          weeklyProgress: [true, true, true, false, false, false, false]
        }
      ]);
    }
  }, [tasks.length, habits.length, setTasks, setHabits]);
  
  // Task handlers
  const handleAddTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
    setShowTaskForm(false);
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };
  
  const handleToggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Habit handlers
  const handleAddHabit = (habit) => {
    if (editingHabit) {
      setHabits(habits.map(h => h.id === habit.id ? habit : h));
      setEditingHabit(null);
    } else {
      setHabits([...habits, habit]);
    }
    setShowHabitForm(false);
  };
  
  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setShowHabitForm(true);
  };
  
  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };
  
  const handleCompleteHabit = (habitId) => {
    const today = new Date().getDay();
    
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newWeeklyProgress = [...(habit.weeklyProgress || Array(7).fill(false))];
        newWeeklyProgress[today] = true;
        
        const newStreak = habit.completedToday ? habit.streak : habit.streak + 1;
        const newLongestStreak = Math.max(newStreak, habit.longestStreak);
        
        return {
          ...habit,
          completedToday: true,
          current: habit.target,
          streak: newStreak,
          longestStreak: newLongestStreak,
          weeklyProgress: newWeeklyProgress
        };
      }
      return habit;
    }));
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">ResoTrack</h1>
        <p className="app-subtitle">
          Your personal New Year resolution tracker • Build better habits, one day at a time
        </p>
      </header>
      
      <Dashboard tasks={tasks} habits={habits} />
      
      <main className="app-main">
        {/* Tasks Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Tasks & Goals</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowTaskForm(true)}
            >
              + Add Task
            </button>
          </div>
          
          <Filters
            activeFilter={taskFilter}
            onFilterChange={setTaskFilter}
            filterType="tasks"
            searchQuery={taskSearch}
            onSearchChange={setTaskSearch}
          />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleTaskComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            filter={taskFilter}
            searchQuery={taskSearch}
          />
        </section>
        
        {/* Habits Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Daily Habits</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowHabitForm(true)}
            >
              + Add Habit
            </button>
          </div>
          
          <Filters
            activeFilter={habitFilter}
            onFilterChange={setHabitFilter}
            filterType="habits"
          />
          
          <HabitList
            habits={habits}
            onComplete={handleCompleteHabit}
            onEdit={handleEditHabit}
            onDelete={handleDeleteHabit}
            filter={habitFilter}
          />
          
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: 'linear-gradient(135deg, #f0f9ff, #fef7ff)', 
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            💡 <strong>Tip:</strong> Mark habits as done daily to build streaks. 
            Consistency beats intensity in the long run!
          </div>
        </section>
      </main>
      
      {/* Forms */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          initialData={editingTask}
        />
      )}
      
      {showHabitForm && (
        <HabitForm
          onSubmit={handleAddHabit}
          onCancel={() => {
            setShowHabitForm(false);
            setEditingHabit(null);
          }}
          initialData={editingHabit}
        />
      )}
    </div>
  );
}

export default App;