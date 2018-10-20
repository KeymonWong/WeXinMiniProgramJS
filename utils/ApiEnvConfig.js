/**
 * Api 网络请求接口环境区分，测试和正式切换时候 手动改一下
 * 注意：微信小程序请求必须是 HTTPS 请求
 * isDev:true —— 测试环境接口
 * isDev:false —— 正式环境接口
 */
var isDev = false

var ApiDev = {
  url_domain: 'https://www.baidu.com'
}

var ApiPro = {
  url_domain: 'https://www.baidu.com'
}

var apiEnv = isDev ? ApiDev : ApiPro

module.exports = {
  apiEnv
}