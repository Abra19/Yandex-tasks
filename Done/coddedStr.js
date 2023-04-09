const coder = (text, tokensMap, rules) => {
  const tokenKeys = Object.keys(tokensMap);
  const filteredKeys = tokenKeys.filter(el => el.startsWith('-'));
  const additionalKeys = filteredKeys.map(el => el.slice(1));
  additionalKeys.forEach(key => {
    if (key in rules) {
      rules[key] = tokensMap[`-${key}`];
    }
  });
  const findKeyForValue = (obj, value) => {
    const keys = Object.keys(obj);
    const found = keys.find(el => obj[el] === value);
    return found ? found : value;
  }
  let names = [];
  const newLineKey = findKeyForValue(rules, '\n')
  const lines = newLineKey ? text.split(newLineKey) : text;
  const equalty = '=';
  const changedLines = lines.map(el => {
    const params = el.split(equalty);
    const nameSubs = params.length === 2 ? params[0] : '';
    const valueSubs = params.length === 2 ? params[1] : params[0];
    const name = findKeyForValue(tokensMap, nameSubs);
    const value = [...valueSubs].map(sym => {
      let rule = sym in rules ? rules[sym] : sym;
      return rule in rules ? rules[rule] : rule;
    }).join('');
    const separator = rules[equalty] ? rules[equalty] : '=';
    const newName = names.includes(name) ?  name : `let ${name}`;
    names.push(name);
    return name ? [newName, value].join(separator) : value;
  });
  return changedLines.join(rules[newLineKey]);
 }

 const str = "lg=lv_11_lg=vl";
 const rules = {
  "l": "1",
  "v": "3",
  "_": "\n", // Перевод строки
  "=": " = ", // Символ присваивания
}

const tokensMap  = {
  "val": "lg",
}

console.log(coder(str, tokensMap, rules));
/*
let val = 13
11
val = 31

*/

const str2 = "ab=tl*cd=ls*ef=dd";

const rules2 = {
  "t": 1,
  "l": 's', // Берет правило перевода по ключу "s", если оно есть
  "s": 3,
  "d": 4,
  "k": 9,
  "*": '\n',
}

const tokensMap2 = {
  "val1": "ab",
  "val2": "cd",
  "val3": "ef",
  "-d": "k", // дополнительное правило
}

console.log(coder(str2, tokensMap2, rules2));
/*
let val1=13
let val2=33
let val3=99
*/