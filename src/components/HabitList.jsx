import React from 'react';
import HabitItem from './HabitItem';
import '../styles/components.css';

const HabitList = ({ habits, onComplete, onEdit, onDelete, filter }) => {
  const filteredHabits = habits.filter(habit => {
    if (filter === 'all') return true;
    if (filter === 'completed') return habit.completedToday;
    if (filter === 'pending') return !habit.completedToday;
    return habit.category === filter;
  });

  if (filteredHabits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔥</div>
        <h3>No habits found</h3>
        <p>{filter !== 'all' ? 'Try a different filter' : 'Add your first habit to build consistency!'}</p>
      </div>
    );
  }

  return (
    <div className="habits-container">
      {filteredHabits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;