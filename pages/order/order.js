// pages/order/order.js
import { request } from "../../request/index.js"
import { navigation } from '../../utils/navigation'
Page({
 
  data: {
    orderlist:[],
    pages:1,
    
  },
  onLoad: function (options) {
    this.getOderlist()
  }, getOderlist() {
    let vipId = wx.getStorageSync('vipId');

    request({
      url: 'https://carinspect.xgyvip.cn/api/home/order/index',
      data:{
        vipid:vipId,
        p:this.data.pages
      }
    }).then((result) => {
       let orderlist=result.data.data;
       this.setData({
        orderlist
      })
    })


  },onReachBottom(){},



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