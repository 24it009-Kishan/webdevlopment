// frontend/src/components/TaskForm.jsx
import React, { useState } from 'react';
import AIDescriptionField from './AIDescriptionField';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (onSubmit) {
      onSubmit({ title, description });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Prepare project report"
          required
        />
      </div>

      <AIDescriptionField
        title={title}
        value={description}
        onChange={setDescription}
      />

      <button type="submit" className="submit-btn">
        Save Task
      </button>
    </form>
  );
}

