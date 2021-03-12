const wxLogin = function() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        // console.log(res)
        resolve(res)
      },
      fail: res => {
        wx.showToast({
          'title': '微信登录失败',
          'icon': 'none'
        })
      }
    })
  })
}

module.exports = {
  wxLogin
}