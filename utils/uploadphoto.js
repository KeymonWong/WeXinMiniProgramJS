const apiEnv = require('./ApiEnvConfig')

/**
 * 封装上传图片函数，单张图片
 */
function uploadPhoto(paths, picType) {
  wx.showToast({
    title: '正在上传...',
    icon: 'loading',
    mask: true,
    duration: 5000
  })

  const globalUserInfo = wx.getStorageSync('userInfo')
  // const phoneNum = globalUserInfo.phoneNum
  const userId = globalUserInfo.appUser.userId
  const token = globalUserInfo.token

  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: apiEnv.apiEnv.url_domain + '/app/picture/singleUp',
      filePath: paths[0],
      // PS 必须和服务端的字段一样
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        'userId': userId,
        'token': token,
        'picType': picType
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data)
        if (jsonData.code != '0000') {
          wx.showModal({
            title: '提示',
            content: jsonData.messageCn,
            showCancel: false,
            confirmColor: '#ef5a54',
          })

          reject(res)

          return
        }
        wx.showModal({
          title: '提示',
          content: '上传成功',
          showCancel: false,
          confirmColor: '#ef5a54',
        })

        resolve(jsonData)

        // page.setData({  //上传成功修改显示头像
        //   // imgsrc: paths[0]
        //   imgsrc: jsonData.data.picUrl
        // })
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '网络连接失败',
          showCancel: false,
          confirmColor: '#ef5a54',
        })
        reject(res)
      },
      complete: function () {
        wx.hideToast();
      }
    })
  })
}

module.exports = {
  uploadPhoto: uploadPhoto
}