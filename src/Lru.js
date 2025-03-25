class LRUCache {
    constructor() {
      this.capacity = 10;
      this.cache = new Map();
    }
  
    get(key) {
      if (!this.cache.has(key)) return null;
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    delete(key){
        if (!this.cache.has(key)) return null;
        this.cache.delete(key);
    }
    put(key) {
      if (this.cache.has(key)) {
        this.cache.delete(key);
      } else if (this.cache.size >= this.capacity) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
      this.cache.set(key, key);
    }
  
    getRecent() {
      return Array.from(this.cache.values()).reverse();
    }
  }
  
  export default LRUCache;