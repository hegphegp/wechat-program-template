const wxLogin = function(url) {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        console.log('wx.login===>>>'+res)
        resolve(res)
      },
      fail: res => {
        wx.showToast({
          'title': '微信登录失败',
          'icon': 'none'
        })
        reject(res)
      }
    })
  })
}

module.exports = {
  wxLogin
}