import React, { useState } from 'react';
import { defaultHabits } from '../utils/quotes';
import '../styles/components.css';

const HabitForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: 'Health',
    target: 1,
    completedToday: false,
    streak: 0,
    longestStreak: 0,
    weeklyProgress: Array(7).fill(false)
  });

  const categories = ['Health', 'Fitness', 'Mindfulness', 'Learning', 'Productivity', 'Personal'];
  const quickHabits = defaultHabits.filter(h => !initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || Date.now(),
      current: 0
    });
  };

  const handleQuickSelect = (habit) => {
    setFormData({
      ...formData,
      name: habit.name,
      category: habit.category,
      target: habit.target
    });
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">
          {initialData ? 'Edit Habit' : 'Add New Habit'}
        </h2>
        
        {!initialData && quickHabits.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              Quick Add Popular Habits:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickHabits.map(habit => (
                <button
                  key={habit.id}
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={() => handleQuickSelect(habit)}
                  style={{ fontSize: '0.75rem' }}
                >
                  {habit.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Habit Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="What habit do you want to build?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Daily Target: {formData.target} {formData.target === 1 ? 'time' : 'times'}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: parseInt(e.target.value)})}
                style={{ flex: 1 }}
              />
              <span style={{ fontWeight: '600', minWidth: '40px' }}>{formData.target}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              {formData.target === 1 ? 'Mark once per day' : `Complete ${formData.target} times daily`}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {initialData ? 'Update Habit' : 'Add Habit'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;