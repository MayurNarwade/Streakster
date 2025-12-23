import React from 'react';
import '../styles/components.css';

const Filters = ({ activeFilter, onFilterChange, filterType = 'tasks', searchQuery, onSearchChange }) => {
  const taskFilters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  const habitFilters = [
    { key: 'all', label: 'All Habits' },
    { key: 'pending', label: 'Pending Today' },
    { key: 'completed', label: 'Completed Today' },
    { key: 'Health', label: 'Health' },
    { key: 'Fitness', label: 'Fitness' },
    { key: 'Mindfulness', label: 'Mindfulness' }
  ];

  const filters = filterType === 'tasks' ? taskFilters : habitFilters;

  return (
    <div>
      <div className="filter-bar">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {filterType === 'tasks' && (
        <div style={{ marginTop: '16px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ fontSize: '0.875rem' }}
          />
        </div>
      )}
    </div>
  );
};

export default Filters;