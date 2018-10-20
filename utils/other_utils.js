//注意：后台返回的时间格式字符串是 "2018-05-17 00:00:00"，小程序在 iPHone 手机上会解析失败（为 NaN）
//所以要转换为 "2018/05/17 00:00:00"

/**
 * 格式化时间
 * @param  {Datetime} source 时间对象
 * @param  {String} format 格式
 * @return {String}        格式化过后的时间
 */
function formatDate(source, format) {
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

/**
 * 用于判断空，Undefined String、Array、Object
 */
function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  //alert(parttern);
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()
    //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
Date.parseFromText = function (text, parttern) {
  parttern = parttern.toString();
  text = text.toString();
  var yearOffset = parttern.indexOf("yyyy");
  var year = null;
  if (yearOffset != -1) {
    year = parseInt(text.substring(yearOffset, yearOffset + 4));
  }
  var monthOffset = parttern.indexOf("MM");
  var month = null;
  if (monthOffset != -1) {
    month = parseInt(text.substring(monthOffset, monthOffset + 2));
  }
  var dayOffset = parttern.indexOf("dd");
  var day = null;
  if (dayOffset != -1) {
    day = parseInt(text.substring(dayOffset, dayOffset + 2));
  }
  var hourOffset = parttern.indexOf("HH");
  var hour = null;
  if (hourOffset != -1) {
    hour = parseInt(text.substring(hourOffset, hourOffset + 2));
  }
  var minuteOffset = parttern.indexOf("mm");
  var minute = null;
  if (minute != -1) {
    minute = parseInt(text.substring(minuteOffset, minuteOffset + 2));
  }

  var secondOffset = parttern.indexOf("ss");
  var second = null;
  if (secondOffset != -1) {
    second = parseInt(text.substring(secondOffset, secondOffset + 2));
  }

  var msecondOffset = parttern.indexOf("S");
  var msecond = null;
  if (msecondOffset != -1) {
    msecond = parseInt(text.substring(msecondOffset, msecondOffset + 1));
  }
  var date = new Date();
  if (year) {
    date.setYear(year);
  }
  if (month) {
    date.setMonth(month);
  }
  if (day) {
    date.setDate(day);
  }
  if (hour) {
    date.setHours(hour);
  }
  if (minute) {
    date.setMinutes(minute);
  }
  if (second) {
    date.setSeconds(second);
  }
  if (msecond) {
    date.setMilliseconds(msecond);
  }
  return date;
};

/***
 *将yyyyMMddHHmmss格式转换为yyyy年MM月dd日 HH:mm:ss
 * @param text
 */
Date.convertTxtFormat = function (text) {
  return Date.parseFromText(text, "yyyyMMddHHmmss").format("yyyy年MM月dd日 HH:mm:ss");
};

module.exports = {
  formatTime: formatTime,
  formatDate,
  String: {
    isBlank: isBlank
  }
}