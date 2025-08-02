import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ onSubmit }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) return;
    await axios.post('http://localhost:8000/feedback', { message: feedback });
    setFeedback('');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;
