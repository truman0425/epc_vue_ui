/**
 *
 */

// 获取指定日期的那一周的开始、结束日期
export function getWeekStartAndEnd(val) {
  let now
  if (val) {
    now = new Date(val)
  } else {
    now = new Date()
  }
  const nowDayOfWeek = now.getDay() // 本周的第几天
  const nowDay = now.getDate() // 当前日
  const nowMonth = now.getMonth() // 当前月
  const nowYear = now.getFullYear() // 当前年
  const weekStart = getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
  const weekEnd = getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
  console.log(weekStart + ',' + weekEnd)
  return weekStart + '~' + weekEnd
}

// 获取指定日期的那一周的开始日期
export function getWeekStartDay(val) {
  let now
  if (val) {
    now = new Date(val)
  } else {
    now = new Date()
  }
  const nowDayOfWeek = now.getDay() // 本周的第几天
  const nowDay = now.getDate() // 当前日
  const nowMonth = now.getMonth() // 当前月
  const nowYear = now.getFullYear() // 当前年
  const weekStart = getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
  const weekEnd = getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
  console.log(weekStart + ',' + weekEnd)
  return weekStart
}


// 获得某一周的开始日期
export function getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekStartDate)
}

// 获得某一周的结束日期
export function getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
  return formatDate(weekEndDate)
}

// 日期格式化
export function formatDate(date) {
  var myYear = date.getFullYear()
  var myMonth = date.getMonth() + 1
  var myWeekday = date.getDate()
  if (myMonth < 10) {
    myMonth = '0' + myMonth
  }
  if (myWeekday < 10) {
    myWeekday = '0' + myWeekday
  }
  return myYear + '-' + myMonth + '-' + myWeekday
}

/**
 *  获取某一天几天后的日期
 * @param day
 * @returns {string}
 */
export function getAfterDay(date, day) {

  var today = new Date(date);
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}


export function formatTime(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
}


/**
 *  获取某一天几天前的日期
 * @param day
 * @returns {string}
 */
export function getUpDay(date, day) {
  var today = new Date(date);
  var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

export function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getPreMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getNextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

/**
 * 获取一个月的天数
 * @param date
 * @returns {number}
 */
export function getMonthDays(date) {
  let days = date.split('-');
  let dates = new Date(days[0], days[1], 0);
  return dates.getDate();
}

/**
 * 将毫秒数转化成时分
 * @param msd
 * @returns {string}
 * @constructor
 */
export function MillisecondToDate(msd) {
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "秒";
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else {
      time = parseInt(time) + "秒";
    }
  } else {
    time = "0 时 0 分0 秒";
  }
  return time;

}

/*
 *去掉文字
 */
export function MillisecondToDates(msd) {
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + "''" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "'''";
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + "'" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "''" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "'''";
    } else {
      time = parseInt(time) + "'''";
    }
  } else {
    time = "0 ' 0 ''0 '''";
  }
  return time;

}
