const q = {
  tail: {},
  newIndex: 1,
  oldIndex: 1,
  minEl: Infinity,
  maxEl: -Infinity,
  push(x) {
      this.tail[this.newIndex] = x;
      this.newIndex++;
      if (x < this.minEl) {
        this.minEl = x;
      }
      if (x > this.maxEl) {
        this.maxEl = x;
      }
    },
    shift () {
      if (this.oldIndex === this.newIndex) {
        return 0;
      }
      let res  = this.tail[this.oldIndex];
      delete this.tail[this.oldIndex];
      this.oldIndex++;
      if (res === this.maxEl) {
        this.maxEl = Object.values(this.tail).reduce((acc, el) => el > acc ? el : acc);
      }
      if (res === this.minEl) {
        this.minEl = Object.values(this.tail).reduce((acc, el) => el < acc ? el : acc);
      }
      
      return res;
    },
    min() {
      if (this.oldIndex === this.newIndex) {
        return 0;
      }
      return this.minEl;
    },
    max() {
      if (this.oldIndex === this.newIndex) {
        return 0;
      }
      return this.maxEl;
    }
  }

  

q.push(2);
console.log(q.min())
console.log(q.max());

q.push(4);
q.push(1);
console.log(q.tail)

console.log(q.min())
console.log(q.max());
console.log(q.shift())
console.log(q.tail)
console.log(q.shift())
console.log(q.tail)
console.log(q.minEl)
console.log(q.maxEl)
console.log(q.min())
console.log(q.max());