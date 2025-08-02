import React from 'react';

function FeedbackList({ feedbacks }) {
  return (
    <div>
      <h2>📋 All Feedback</h2>
      <ul>
        {feedbacks.map((fb, index) => (
          <li key={index}>{fb.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
