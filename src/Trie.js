class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return node.isEnd;
  }

  getAllWords(node = this.root, prefix = "", list = []) {
    if (node.isEnd) {
      list.push(prefix);
    }
    for (const ch in node.children) {
      this.getAllWords(node.children[ch], prefix + ch, list);
    }
    return list;
  }

  getAllPrefixWords(prefix, node = this.root) {
    for (const ch of prefix) {
      if (!node.children[ch]) {
        return [];
      }
      node = node.children[ch];
    }
    return this.getAllWords(node, prefix);
  }
}

export default Trie;
