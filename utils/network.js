
const apiEnv = require('./ApiEnvConfig')
// /**
//  * Api 接口环境区分，测试和正式切换时候 手动改一下
//  * isDev:true —— 测试环境接口
//  * isDev:false —— 正式环境接口
//  */
// var isDev = true

// //开发
// var ApiDev = {
//   url_domain: 'http://dev.services.xiaoban.mobi'
// }
// //正式
// var ApiPro = {
//   url_domain: 'http://services.xiaoban.mobi'
// }
// var apiEnv = isDev ? ApiDev : ApiPro

var request_handler = {
  show_loading: false,
  url_path: '',
  params: {},
}

//GET请求
function GET(request_handler) {
  return request('GET', request_handler)
}

//POST请求
function POST(request_handler) {
  return request('POST', request_handler)
}

function request(method, request_handler) {
  var url_path = request_handler.url_path;
  var params = request_handler.params;

  if (request_handler.show_loading == true) {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
  }

  return new Promise(function (resolve, reject) {
    wx.request({
      url: apiEnv.apiEnv.url_domain + url_path,
      data: Object.assign({}, params),
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success: function (res) {
        // console.log('network返回数据：' + JSON.stringify(res.data));
        // 处理服务器返回的错误码，非 http 状态码(status code)
        // 需要开发者根据自己需求更改
        const jsonData = res.data
        if (jsonData.code == '0000') {
          resolve(jsonData)
        }
        else {
          //会话失效，请重新登录，0011
          if (jsonData.code == '0011') {
            getApp().globalData.hasLogined = false
            // wx.removeStorageSync('loginedMethod')
            wx.clearStorageSync()
          } 
          else {

            // reject(res)
          }
          console.log('返回错误码：' + JSON.stringify(res))

          reject(res)
        }

        if (request_handler.show_loading == true) {
          wx.hideLoading()
        }
      },
      fail: function (res) {
        console.log('网络访问失败：' + JSON.stringify(res))
        
        reject(res)

        wx.showToast({
          icon: 'none',
          title: res.errMsg,
        })
      },
      complete: function (res) {
      }
    })
  }) 
}

module.exports = {
  GET: GET,
  POST: POST
}