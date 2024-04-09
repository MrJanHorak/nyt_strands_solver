class CoordinateTrieNode {
  constructor() {
    this.children = new Map();
    this.wordEnd = false;
  }
}

class CoordinateTrie {
  constructor() {
    this.root = new CoordinateTrieNode();
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
  }

  hasOverlap(coords) {
    let node = this.root;
    for (const coord of coords) {
      if (!node.children.has(coord)) {
        return false;
      }
      node = node.children.get(coord);
    }
    return true;
  }
}

export default CoordinateTrie;
