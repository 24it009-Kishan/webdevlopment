import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AIDescriptionField({ title, value, onChange }) {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [aiFilled, setAiFilled] = useState(false);

  const generate = async () => {
    if (!title || !title.trim()) {
      setNotice('Enter a task title first.');
      return;
    }
    setLoading(true);
    setNotice('');
    try {
      const res = await fetch(`${API}/api/ai/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.description) {
        onChange(data.description); // editable suggestion, not final
        setAiFilled(true);
      } else {
        setNotice(data.message || 'AI suggestion unavailable. Please type it manually.');
      }
    } catch {
      setNotice('Could not reach the server. You can still write the description manually.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-field">
      <div className="ai-field-head">
        <label htmlFor="description">Description</label>
        <button type="button" onClick={generate} disabled={loading} className="ai-btn">
          {loading ? 'Generating…' : '✨ Generate description'}
        </button>
      </div>
      <textarea
        id="description"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the task, or let AI suggest one…"
      />
      {loading && <p className="ai-info">Asking AI for a suggestion…</p>}
      {notice && <p className="ai-warn">{notice}</p>}
      {aiFilled && !loading && (
        <p className="ai-disclaimer">
          ⚠ AI-generated suggestion. Please review and edit before saving.
        </p>
      )}
    </div>
  );
}

