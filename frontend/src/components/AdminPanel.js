import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ question: '', answer: '', keywords: '' });

  const loadKnowledgeBase = async () => {
    // Load from your API or directly from file
    const response = await fetch('/knowledgebase.json');
    const data = await response.json();
    setEntries(data.entries);
  };

  const addEntry = () => {
    const entry = {
      ...newEntry,
      keywords: newEntry.keywords.split(',').map(k => k.trim()),
      id: Date.now().toString()
    };
    setEntries(prev => [...prev, entry]);
    setNewEntry({ question: '', answer: '', keywords: '' });
  };

  useEffect(() => {
    loadKnowledgeBase();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Knowledge Base Management</h2>
      {/* Add entry form */}
      <div className="add-entry">
        <input
          placeholder="Question"
          value={newEntry.question}
          onChange={(e) => setNewEntry({...newEntry, question: e.target.value})}
        />
        <textarea
          placeholder="Answer"
          value={newEntry.answer}
          onChange={(e) => setNewEntry({...newEntry, answer: e.target.value})}
        />
        <input
          placeholder="Keywords (comma separated)"
          value={newEntry.keywords}
          onChange={(e) => setNewEntry({...newEntry, keywords: e.target.value})}
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      {/* List entries */}
      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry.id} className="entry-item">
            <h4>{entry.question}</h4>
            <p>{entry.answer}</p>
            <span>Keywords: {entry.keywords.join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;