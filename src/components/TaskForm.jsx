import React, { useState } from 'react';
import '../styles/components.css';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    notes: '',
    priority: 'medium',
    category: 'Personal',
    completed: false
  });

  const categories = ['Work', 'Personal', 'Study', 'Health', 'Other'];
  const priorities = [
    { value: 'low', label: 'Low', color: '#16a34a' },
    { value: 'medium', label: 'Medium', color: '#d97706' },
    { value: 'high', label: 'High', color: '#dc2626' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || Date.now(),
      createdAt: initialData?.createdAt || new Date().toISOString()
    });
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">
          {initialData ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="What needs to be done?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <div className="radio-group">
              {categories.map(category => (
                <div
                  key={category}
                  className="radio-option"
                  onClick={() => setFormData({...formData, category})}
                >
                  <div className={`radio-circle ${formData.category === category ? 'selected' : ''}`} />
                  <span className="radio-label">{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <div className="radio-group">
              {priorities.map(({ value, label, color }) => (
                <div
                  key={value}
                  className="radio-option"
                  onClick={() => setFormData({...formData, priority: value})}
                  style={{ borderColor: color }}
                >
                  <div className={`radio-circle ${formData.priority === value ? 'selected' : ''}`} />
                  <span className="radio-label" style={{ color }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea
              className="form-textarea"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Add any additional details..."
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {initialData ? 'Update Task' : 'Add Task'}
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

export default TaskForm;