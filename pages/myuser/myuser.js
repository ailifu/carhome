const app = getApp()
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
  },
  //事件处理函数
  handlemycar(e) {
    wx.navigateTo({
      url: '../mycar/mycar?tab=false'
    })
  },
  //事件处理函数
  handlefeedback(e) {
    wx.showModal({
      title: '网站开发中',
      content: '',
      showCancel: false,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      
    });

    // wx.navigateTo({
    //   url: '../feedback/feedback'
    // })
  },
  handlegift(e) {
    wx.showModal({
      title: '网站开发中',
      content: '',
      showCancel: false,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
              })
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
             
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      let { gender, nickName, avatarUrl } =e.detail.userInfo;
      let openid=wx.getStorageSync('openid');
        
      wx.request({
        url: 'https://carinspect.xgyvip.cn/api/home/user/login',
        data: {
          user_nickname:nickName,
          openid: openid,
          avatar:avatarUrl,
          sex: gender,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        method: 'POST',
        success(res) {
          wx.setStorageSync('vipId', res.data.data.vipId);
        },
      }); 

      that.setData({
        isHide: false,
        userInfo: e.detail.userInfo,
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
  bindnavtoorder() {
    wx.navigateTo({
      url: '../order/order',
      
    });
      

  },handleaboutus(){
    wx.navigateTo({
      url: '../about/about',
      
    });
      

  }
   
})
