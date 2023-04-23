function antifraud(originalFunction, timeInterval, maxRequests) {
  let counter = {};
  let start = {};
  
  return (ip, timestamp, ...args) => {
    start[ip] = start[ip] ?? timestamp;
    
    if (timestamp - start[ip] <= timeInterval) {
      counter[ip] = counter[ip] + 1 || 1;
    }
    const ban = counter[ip] > maxRequests;
    
    if (!ban) {
      return originalFunction(...args);
    }
  };
}



function sendSMS(phoneNumber, message) {
  // код отправки SMS
  console.log(`Отправлено SMS "${message}"`)
}

const protectedFunction = antifraud(sendSMS, 10, 2);


console.log(protectedFunction('128.0.0.1', 0, '+7 000 000 00-00', 'Первое сообщение'));
// console.log('Отправлено SMS "Первое сообщение"')

console.log(protectedFunction('128.0.0.1', 5, '+7 000 000 00-00', 'Второе сообщение'));
// console.log('Отправлено SMS "Второе сообщение"')

console.log(protectedFunction('128.0.0.1', 10, '+7 000 000 00-00', 'Третье сообщение'));
// ничего не произошло, IP 128.0.0.1 отправился в бан

console.log(protectedFunction('128.0.0.1', 15, '+7 000 000 00-00', 'Третье сообщение'));
// ничего не произошло, IP 128.0.0.1 отправился в бан

console.log(protectedFunction('192.168.0.1', 20, '+7 000 000 00-00', 'Вызов 1 со второго IP'));
// console.log('Отправлено SMS "Вызов 1 со второго ip"')

console.log(protectedFunction('192.168.0.1', 30, '+7 000 000 00-00', 'Вызов 2 со второго IP'));
// console.log('Отправлено SMS "Вызов 2 со второго IP"')
// IP не отправился в бан, потому что было сделано ровно 2 вызова в течение 10 секунд

console.log(protectedFunction('192.168.0.1', 40, '+7 000 000 00-00', 'Вызов 3 со второго IP'));
// console.log('Отправлено SMS "Вызов 3 со второго IP"')