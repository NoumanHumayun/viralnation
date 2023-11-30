class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null);
  }

  createHash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue % this.size;
  }

  setValue(key, value) {
    const index = this.createHash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = new Node(key, value);
    } else {
      let currentNode = this.buckets[index];

      while (currentNode.next) {
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        }
        currentNode = currentNode.next;
      }

      currentNode.next = new Node(key, value);
    }
  }

  getValueByKey(key) {
    const index = this.createHash(key);

    let currentNode = this.buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }

    return undefined;
  }

  removeByKey(key) {
    const index = this.createHash(key);

    if (!this.buckets[index]) {
      return;
    }

    if (this.buckets[index].key === key) {
      this.buckets[index] = this.buckets[index].next;
      return;
    }

    let currentNode = this.buckets[index];
    let prevNode = null;

    while (currentNode) {
      if (currentNode.key === key) {
        prevNode.next = currentNode.next;
        return;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
  }
}

// Example usage:
const hash = new HashTable();

hash.setValue("name", "Nouman");
hash.setValue("age", 31);
hash.setValue("city", "Toronto");

console.log(hash.getValueByKey("name")); // Output: Nouman
console.log(hash.getValueByKey("age"));  // Output: 31
console.log(hash.getValueByKey("city")); // Output: Toronto

hash.removeByKey("age");
console.log(hash.getValueByKey("age"));  // Output: undefined
