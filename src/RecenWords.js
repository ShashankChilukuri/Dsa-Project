import React from "react";
import "./App.css";

const RecentWords = ({ recentWords, handleSuggestionClick, handleDeleteRecent }) => {
  if (recentWords.length === 0) return null;

  return (
    <ul className="suggestions-list">
      {recentWords.map((word, index) => (
        <li key={index} className="recent-item">
          <span onClick={() => handleSuggestionClick(word)}>{word}</span>
          <button className="delete-button" onClick={() => handleDeleteRecent(word)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecentWords;
