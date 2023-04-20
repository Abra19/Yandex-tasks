const getI18nText = ({ stringTokens, variables, translations, locale }) => {
  const plural = (key, number) => {
    const pluralKey = new Intl.PluralRules(locale, key).select(number);
    return `${number}${key[pluralKey]}`;
  };

  const number = (value, currency) => {
    const options = { style: 'currency', currency };
    return new Intl.NumberFormat(locale, options).format(value);
  };

  const date = (timestamp) => {
    const options = { dateStyle: 'long', timeStyle: 'long' };
    const numTimestamp = Number(timestamp);
    const date =  isNaN(numTimestamp)  ? Date.parse(timestamp) : numTimestamp;
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  const list = (...args) => {
    return args.reduce((acc, el, i) => {
      if (i < args.length - 2) {
        acc += `${el}, `
      } else if (i === args.length - 2) {
        acc += `${el} and `
      } else {
        acc += el
      }
      return acc;
    }, '');
  };

  const relativeTime = (value, unit) => new Intl.RelativeTimeFormat(locale).format(value, unit);

  const actions = {
    '@plural': (args) => plural(...args),
    '@number': (args) => number(...args),
    '@date': (args) => date(...args),
    '@list': (args) => list(...args),
    '@relativeTime': (args) => relativeTime(...args),
  }
  
  const transLocale = translations[locale] || locale;
  const i18nText = stringTokens.reduce((acc, el) => {
    if (!Array.isArray(el)) {
      if (el.startsWith('#')) {
        acc += transLocale[el.slice(1)]
      } else if (el.startsWith('$')) {
        acc += variables[el.slice(1)];
      } else {
        acc += el;
      }
    } else {
      const [funcName, ...params] = el;
      const func = actions[funcName];
      const args = params.map((item) => {
        const el = item.toString();
        if (el.startsWith('#')) {
          return transLocale[el.slice(1)];
        }
        if (el.startsWith('$')) {
          return variables[el.slice(1)];
        }
        return el;
      });
      acc += func(args);
    }
    return acc;
  }, '');
  return i18nText;
}

const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
} 


const stringTokens = [  
  "#price",  
  " ",  
  ["@plural", "#day", "$tripDays"],  
  " - ",  
  ["@number", "$tripPrice", "USD"]  
];

const translations = {  
  "ru-RU" : {             // локаль  
    price: "Цена",        // обычный перевод для ключа price  
    day: {                // перевод для ключа day c учетом плюральных форм  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
      },
    hours: {
      zero: " часов",  
      one: " час",  
      few: " часа",  
      many: " часов",  
      other: " часов",  
      }
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
        },
      hours: {  
          one: " hour",  
          other: " hours",  
        }      
  },  
  //...  
};


console.log(getI18nText({stringTokens, variables, translations, locale: "ru-RU"})); //  "Цена 10 дней - 56 789,01 $"
console.log(getI18nText({stringTokens, variables, translations, locale: "en-US"})); //  "Price 10 days - $56,789.01"
console.log(getI18nText({ stringTokens: [['@date', 'Sun, 19 Feb 2023 09:57:14 GMT']], variables: {}, translations: {}, locale: "ru-RU"  })); // четверг, 16 февраля 2023 г., 15:38:04 UTC
console.log(getI18nText({ stringTokens: [['@date', 1676561884561]], variables: {}, translations: {}, locale: "ru-RU"  })); // четверг, 16 февраля 2023 г., 15:38:04 UTC
console.log(getI18nText({ stringTokens: ["key", " ", "$var", " ", "#translation"], variables: { var: 100 },  translations: { "ru-RU": { translation: "тест" }, "en-US": { translation: "test" }, "de-DE": { translation: "prüfen" }, "hi-IN": { translation: "परीक्षा" }, "ar-AA": { translation: "امتحان" }, }, locale: "hi-IN"}));
console.log(getI18nText({  
  stringTokens: [["@list", "Motorcycle", "$item", "#bus"]],  
  variables: { item: "Car" },  
  translations: {  
    "en-US": {  
        bus: "Bus",  
    },  
    // ...  
  },  
  locale: "en-US",  
})); // "Motorcycle, Car, and Bus"

console.log(getI18nText({  
  stringTokens: [["@relativeTime", -5, "hours"]],
  variables: {},
  translations,  
  locale: "ru-RU",  
})); // 5 часов назад