class CoordinateTrieNode {
  constructor() {
    this.children = new Map();
    this.wordEnd = false;
    this.words = new Set();
  }
}

class CoordinateTrie {
  constructor() {
    this.root = new CoordinateTrieNode();
    this.trie = new Map();  // Move this line to here
  }

  insert(word, coords) {
    let node = this.root;
    for (const coord of coords) {
      if (!node.children.has(coord)) {
        node.children.set(coord, new CoordinateTrieNode());
      }
      node = node.children.get(coord);
    }
    node.wordEnd = true;
    node.words.add(word);
  }

  hasOverlap(word, coords) {
    if (!coords || typeof coords[Symbol.iterator] !== 'function') {
      throw new Error('coords must be an iterable');
    }
    let node = this.root;
    for (const coord of coords) {
      if (!node.children.has(coord)) {
        return false;
      }
      node = node.children.get(coord);
    }
    node.words.delete(word);
    return true;
  }

  delete(word, coords) {
    // Convert the coordinates to a string to use as a key
    const key = coords.map((coord) => coord.join(',')).join(';');

    // Remove the word from the trie
    const wordsAtKey = this.trie.get(key);
    if (wordsAtKey) {
      const index = wordsAtKey.indexOf(word);
      if (index !== -1) {
        wordsAtKey.splice(index, 1);
      }
      if (wordsAtKey.length === 0) {
        this.trie.delete(key);
      }
    }
  }
}

export default CoordinateTrie;
