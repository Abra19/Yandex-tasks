function salary(timesheet, hourRate) {
  const logins = [];
  const logouts = [];

  for (let i = 0; i < timesheet.length; i += 1) {
    const [name, time] = timesheet[i];
    const date = new Date(time);
    const utcTime = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    }
    if (name === 'login') {
      logins.push(utcTime);
    } else {
      logouts.push(utcTime);
    }
  }
  const res = logins.reduce((acc, { year, month, day, hours, minutes, seconds }, i) => {
    let onceTime = 0;
    let middleTime = 0;
    let twiceTime = 0;
    const logs = logouts[i];
    if (hours >= 8 && hours <= 18 && logs.hours <= 18 ) {
      onceTime += logs.hours - hours + logs.minutes - minutes + logs.seconds - seconds;
    }
    if (hours >= 8 && hours <= 18 && logs.hours > 18  && logs.hours <= 23) {
      onceTime += 18 - hours - minutes - seconds;
      middleTime += logs.hours - 18 + logs.minutes + logs.seconds;
    }
    if (hours >= 8 && hours <= 18 && logs.hours > 23) {
      onceTime += 18 - hours - minutes - seconds;
      middleTime += 23 - 18;
      twiceTime = logs.hours - 23 + logs.minutes + logs.seconds;
    }
    if (hours >= 8 && hours <= 18 && logs.hours < 8 && day !== logs.day) {
      onceTime += 18 - hours - minutes - seconds;
      middleTime += 23 - 18;
      twiceTime = 24 - 23 + logs.hours  + logs.minutes + logs.seconds;
    }

    acc += (onceTime + middleTime * 1.5 + twiceTime * 2) * hourRate;
    return acc;
  }, 0);

return res.toFixed(2);
}

const timesheet = [['login', 1669914900000], ['logout', 1669914567]];
const hourRate = 2;

console.log(salary(timesheet, hourRate));