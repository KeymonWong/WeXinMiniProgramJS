/**
 * 一系列网络请求管理，把所有的接口请求写在这里
 */
var req = require('./network')
var app = getApp()


/**
 * 是否新人的判断接口
 */
function callNewUserJude() {

  var req_handler = {
    show_loading: true,
    url_path: '/miniwx/user/newUserJude',
    params: {
    	//to do
    	//add post 请求参数，json方式
    }
  }

  return req.POST(req_handler)
    .then(res => res)
}

/**
 * 领取新人礼包
 */
function callGetNewUserCoupon() {

  var req_handler = {
    show_loading: true,
    url_path: '/miniwx/coupon/getNewUserCoupon',
    params: {
    	//to do
    	//add post 请求参数，json方式
    }
  }

  return req.POST(req_handler)
    .then(res => res.data)
}



//此js模块化
module.exports = {
  callNewUserJude,
  callGetNewUserCoupon,
  
  //to do add above function
}