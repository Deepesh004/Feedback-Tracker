import React, { useState } from 'react';
import axios from 'axios';

function AskAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await axios.post('http://localhost:8000/ask', { question });
      if (res.data.answer) {
        setAnswer(res.data.answer);
      } else if (res.data.error) {
        setError(res.data.error);
      } else {
        setError("Unknown error from backend.");
      }
    } catch (err) {
      setError("Failed to fetch response from server.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🤖 Ask AI</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
      />
      <button onClick={handleAsk}>Ask</button>

      {loading && <p>⏳ Thinking...</p>}

      {answer && (
        <div style={{ marginTop: '1rem', background: '#e6f3ff', padding: '1rem', borderRadius: '5px' }}>
          <strong>AI:</strong> {answer}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', background: '#ffe6e6', padding: '1rem', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default AskAI;
