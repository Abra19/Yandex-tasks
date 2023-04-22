const fs = require('fs');

const example = require('./src/example');
const solution = require(`./src/solution`);

const { changeConfig, configValue } = require('./src/configs')

const newFns = solution(configValue);

const { makeDynamicConfig, dynamicConfigValue } = newFns;

const options = makeDynamicConfig({
  key1: dynamicConfigValue('key1'),
  key2: dynamicConfigValue('key2'),
  key3: dynamicConfigValue('key3'),
});

console.log(options) // Выводит 'first:key1',

changeConfig('second');

console.log(options) // Выводит 'second:key1'

changeConfig('ru'); 

console.log(options) // Выводит 'ru:key1'



/*
const result = example(newFns, changeConfig);


fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));
*/