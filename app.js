// app.js
var http = require("request/request.js");
var user = require("utils/user.js");
var storage = require("utils/storageUtils.js");

App({
  onLaunch:async function() {
    storage.setStorage('00', '000')
    const test = await http.get('/test-test/v1/test/test-get')
    
    // const b = await user.wxLogin();
    // console.log(b.code)
    // 登录
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

