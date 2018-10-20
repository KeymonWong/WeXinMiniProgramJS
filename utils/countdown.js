var interval = null //倒计时函数

/**
 * 封装的倒计时功能
 */
function countdown(that, duration) {
  var remain = duration
  var timer = setInterval(function () {
    if (remain <= 0) {
      clearInterval(timer)
      that.setData({
        time: "获取验证码",
        disabled: false
      })
    } 
    else {
      that.setData({
        time: remain + '秒后获取',
        disabled: true
      })
    }
    remain--
  }, 1000)
}

//此js模块化
module.exports = {
  countdown //也可以写成 countdown: countdown
}
