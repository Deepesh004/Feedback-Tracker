import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AskAI from './components/AskAI';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const response = await fetch('http://localhost:8000/feedback');
    const data = await response.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleNewFeedback = () => {
    fetchFeedbacks(); // Refresh after new feedback
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>📝 Feedback Tracker</h1>
      <FeedbackForm onSubmit={handleNewFeedback} />
      <FeedbackList feedbacks={feedbacks} />
      <hr />
      <AskAI />
    </div>
  );
}

export default App;
