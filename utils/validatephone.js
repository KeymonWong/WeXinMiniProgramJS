/**
 * 正则匹配，验证手机号
 */
var regex = /^[1][3456789]\d{9}$/
function isvalid(phone_num) {
    if (phone_num.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        mask: true
      })
      return false
    }
    if (!regex.test(phone_num)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        mask: true
      })
      return false
    } else {
      return true
    }
}

module.exports = {
  isvalid
}