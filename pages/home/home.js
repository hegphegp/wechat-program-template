// pages/home/home.js
const request = require('../../request/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.test()
  },

  async test () {
    const result = await this.test1()
    console.log('先知行')
  },
  test1() {
//    interface RequestOption {
//      url: string
//      complete?: RequestCompleteCallback   /** 接口调用结束的回调函数（调用成功、失败都会执行） */
//      data?: string | IAnyObject | ArrayBuffer
//      dataType?: 'json' | '其他' /** 返回的数据格式 取值json: 会对返回的数据进行一次 JSON.parse; 取值 其他: 不对返回的内容进行 JSON.parse;*/
//      enableHttp2?: boolean /* 开启 http2 最低基础库： `2.10.4` */
//      enableQuic?: boolean  /* 开启 quic最低基础库： `2.10.4` */
//      fail?: RequestFailCallback  /** 接口调用失败的回调函数 */
//      header?: IAnyObject  /* 设置请求的 header，header 中不能设置 Referer。`content-type` 默认为 `application/json` */
//      method?: 'GET'
//      success?: RequestSuccessCallback /** 接口调用成功的回调函数 */
//      timeout?: number /* 超时时间，单位为毫秒。最低基础库： `2.10.0` */
//  }
    return new Promise((resolve,reject)=>{
      const params = {
        'username': 'username',
        'password': 'password',
        'id': ['aaa','bbb']
      }
      //request.request()
      wx.request({
        data: params,
        method: 'GET',
        url:'http://192.168.1.110:8080/v1/login?000=000',
        success:(result)=>{
          console.log(result.data)
          resolve(result.data);
        },
        fail:(err)=>{
          console.log(err)
          reject(err)
        },
      });
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})