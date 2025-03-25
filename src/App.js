import React, { useState, useEffect } from "react";
import "./App.css";
import Trie from "./Trie";
import data from "./data.json";
import LRUCache from "./Lru";
const lruCache = new LRUCache();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [recentWords, setRecentWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const newTrie = new Trie();
    data.forEach((item) => newTrie.insert(item.word.toLowerCase()));
    setTrie(newTrie);
    setIsLoading(false);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSubmitted(false);
    setSelectedIndex(-1);

    if (!trie || query === "") {
      setFilteredWords([]);
      setSuggestions([]);
      return;
    }

    const matchedWords = trie.getAllPrefixWords(query).slice(0, 8);
    setSuggestions(matchedWords);
  };

  const submitSearch = (word = searchTerm) => {
    if (!word) return;

    lruCache.put(word);
    setRecentWords(lruCache.getRecent());

    setSubmitted(true);
    setSuggestions([]);

    const matchingWords = data.filter(
      (item) => item.word.toLowerCase() === word.toLowerCase()
    );

    if (matchingWords.length === 0 && trie) {
      const allMatches = trie.getAllPrefixWords(word);
      setFilteredWords(
        data.filter((item) => allMatches.includes(item.word.toLowerCase()))
      );
    } else {
      setFilteredWords(matchingWords);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        submitSearch();
      }
    }
  };

  const handleSuggestionClick = (word) => {
    setSearchTerm(word);
    submitSearch(word);
  };

  const handleFocus = () => {
    setRecentWords(lruCache.getRecent());
  };

  const handleDeleteRecent = (word) => {
    lruCache.delete(word);
    setRecentWords(lruCache.getRecent());
  };
const clearSearch = () => {
    setSearchTerm("");
    setFilteredWords([]);
    setSuggestions([]);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-container">
          <div className="search-bar-container">
            {/* <span className="search-icon">🔍</span> */}
            <input
              type="text"
              placeholder="🔍Search words..."
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              className="search-bar fixed-icon"
              // autoFocus
            />
             {searchTerm && (
              <button className="clear-button" onClick={clearSearch}>✕</button>
            )}
          </div>

          {isLoading ? (
            <div className="loading">Loading dictionary...</div>
          ) : (
            <>
              {/* Recent Words Dropdown */}
              {!submitted && searchTerm === "" && recentWords.length > 0 && (
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
              )}

              {/* Suggestions Dropdown */}
              {!submitted && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((word, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(word)}
                      className={index === selectedIndex ? "selected" : ""}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              )}

              {submitted && (
                <>
                  {filteredWords.length > 0 ? (
                    <div className="grid-container">
                      {filteredWords.map((item, index) => (
                        <div key={index} className="grid-item">
                          <h3>{item.word}</h3>
                          <p>{item.meaning}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      No results found for "{searchTerm}"
                    </div>
                  )}
                </>
              )}

              {!searchTerm && !isLoading && (
                <div className="initial-message">
                  Type to search for words and press Enter
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;