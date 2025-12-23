import React, { useState } from 'react';
import { getStreakMessage } from '../utils/quotes';
import '../styles/components.css';

const HabitItem = ({ habit, onComplete, onDelete, onEdit }) => {
  const [currentValue, setCurrentValue] = useState(habit.current || 0);
  const progress = Math.min((currentValue / habit.target) * 100, 100);
  const isCompleted = habit.completedToday || progress >= 100;

  const handleIncrement = () => {
    if (currentValue < habit.target) {
      const newValue = currentValue + 1;
      setCurrentValue(newValue);
      
      if (newValue >= habit.target) {
        onComplete(habit.id);
      }
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(habit.id);
      if (habit.target > 1) {
        setCurrentValue(habit.target);
      }
    }
  };

  const getDayAbbreviation = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'narrow' });
  };

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return date;
  });

  return (
    <div className="habit-item">
      <div className="habit-header">
        <div>
          <h3 className="habit-title">{habit.name}</h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {habit.category} • Target: {habit.target} {habit.target > 1 ? 'times' : 'time'} daily
          </div>
        </div>
        <div className="habit-streak">
          <span className="streak-fire">🔥</span>
          <span>{habit.streak} days</span>
        </div>
      </div>

      <div className="habit-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          <span>{habit.target > 1 ? `${currentValue}/${habit.target}` : 'Daily habit'}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
          {getStreakMessage(habit.streak)}
        </div>
      </div>

      {habit.target > 1 && !isCompleted && (
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => setCurrentValue(Math.max(0, currentValue - 1))}
            disabled={currentValue === 0}
          >
            −
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: '600' }}>
            Progress: {currentValue} / {habit.target}
          </div>
          <button
            className="btn btn-secondary btn-small"
            onClick={handleIncrement}
            disabled={currentValue >= habit.target}
          >
            +
          </button>
        </div>
      )}

      <div className="weekly-calendar">
        {weekDates.map((date, index) => {
          const dayCompleted = habit.weeklyProgress?.[index] || false;
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`day-square ${dayCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`}
              title={`${getDayAbbreviation(date)} ${date.getDate()}/${date.getMonth() + 1}`}
            >
              {getDayAbbreviation(date)}
            </div>
          );
        })}
      </div>

      <div className="habit-actions">
        <button
          className="btn-habit-complete"
          onClick={handleComplete}
          disabled={isCompleted}
        >
          {isCompleted ? '✅ Completed Today' : '🎯 Mark as Done'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onEdit(habit)}
          style={{ padding: '12px' }}
        >
          ✏️
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onDelete(habit.id)}
          style={{ padding: '12px', color: 'var(--danger)' }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default HabitItem;