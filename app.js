// app.js
var http = require("request/request.js");

App({
  onLaunch:async function() {
    const test = await http.get('/test-test/v1/test/test-get')
    console.log(test)
    const a = await this.login();
    console.log('0989999999999999999999999')
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
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  login() {
   wx.login({
      success: res => {
        console.log('000')
        console.log(res)

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  }
})

