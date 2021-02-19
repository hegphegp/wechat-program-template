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
    return new Promise((resolve,reject)=>{
      const params = {
        'username': 'username',
        'password': 'password'
      }
      //request.request()
      wx.request({
        data: params,
        method: 'POST',
        url:'http://192.168.1.110:8080/v1/login',
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