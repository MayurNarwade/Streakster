import React from 'react';
import '../styles/components.css';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completion-animation' : ''}`}>
      <div className="task-header">
        <div className="task-content">
          <div className="task-title">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              style={{ marginRight: '8px' }}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.title}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="task-category">{task.category}</span>
            <span className={`task-priority ${getPriorityClass(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          {task.notes && (
            <div className="task-notes">
              📝 {task.notes}
            </div>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          className="btn btn-secondary btn-small"
          onClick={() => onEdit(task)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-secondary btn-small"
          onClick={() => onDelete(task.id)}
          style={{ color: 'var(--danger)' }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;