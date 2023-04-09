const decoder = (numbers) => {
  const rules = /0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz /.source;
  let newNumbers = [];
  
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== 0 && !numbers[i]) {
     newNumbers.push(-1);
    } else {
      newNumbers.push(numbers[i]);
    }
  }
 
  return newNumbers.map((el) => {
    if (el >= 0 && el <= 62 && Number.isInteger(el)) {
      return rules[el];
    }
    return /_/.source;
  }
).join([]);

}




const numbers1 = [14,12,22,10,28,38,53,44,51,55,62,2,0,1,5];

console.log(decoder(numbers1),'ECMAScript 2015');


const numbers2 = [17,40,47,47,50,62,18,49,55,40,53,49,62,22,40,40,55,56,51,62,2,0,2,3];

console.log(decoder(numbers2),'Hello Intern Meetup 2023');

const numbers3 = [17,40,47,47,50,62,32,50,53,47,39,-1];

console.log(decoder(numbers3),'Hello World_');

console.log(decoder([, -1, -2, 0, 0, -3]));
console.log(decoder([, , , 0, 0, -3]));
console.log(decoder([1.23, null, Infinity, 0, 0, -3]));

