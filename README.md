# DSA-Based Word Search and Auto-Completion

This project is a word search and auto-completion system built using **React.js** with **LRU Cache** and **Trie Data Structure** for efficient searching and suggestions. The project uses a **JSON dataset** of English words for fast, local retrieval without relying on external APIs.

## Features

- 🔍 **Word Search:** Quickly search for words using a highly optimized Trie data structure.
- ⚡ **Auto-Completion:** Get instant word suggestions as you type.
- 🧠 **LRU Cache:** Caches recently searched words for faster access.
- 📦 **JSON Dataset:** Uses a local JSON file containing English words.
- 🏗 **React Frontend:** Built with Create React App for a smooth UI experience.

## Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Data Structures:** Trie, LRU Cache
- **Data:** JSON-based word list

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShashankChilukuri/Dsa-Project/
   cd Dsa-Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── Trie.js
│   ├── LRUCache.js
│   ├── data.json
│   ├── index.js
└── package.json
```

## Usage

1. Type a word into the search bar.
2. Get instant suggestions as you type.
3. Click on any suggested word to view its details.
4. Recently searched words are cached for quick access.

## Future Improvements

- Integrate a larger word dataset.
- Add word definitions and examples.
- Implement dark mode.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## License

This project is licensed under the MIT License.

## Author

**C. Shashank**\
GitHub: [ShashankChilukuri](https://github.com/ShashankChilukuri)

---

Happy coding! 🚀


