const app = getApp();
var util = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    isPageHide: true,
    openid: 0,
 
  },
  getPhoneNumber(e) {
    var ivObj = e.detail.iv;
    var telObj = e.detail.encryptedData;
    let that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请授权获取手机号',
        success: function (res) {},
      });
    } else {
      wx.login({
        timeout: 10000,
        success: (result) => {
          wx.setStorageSync('vipcode', result.code);
          wx.request({
            url: 'https://carinspect.xgyvip.cn/api/home/public/getOpenid',
            data: {
              code: result.code,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
            },
            method: 'POST',
            success(res) {
              wx.setStorageSync('openid', res.data.data.openid);
              console.log(res.data.data);
              let openid = res.data.data.openid;
              that.setData({
                openid: openid,
              });
              wx.request({
                url: 'https://carinspect.xgyvip.cn/api/home/public/getPhoneNumber',
                data: {
                  sessionKey:res.data.data.sessionKey,
                  encrypted_data:telObj,
                  iv:ivObj
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                },
                method: 'POST',
                success(res) {
                  wx.showToast({
                    title: '',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {
                      
                    },
                    fail: () => {},
                    complete: () => {}
                  });
                    
                    
                    
                 
                 
                },
              });
            },
          });
        },
      });
    }
  },
});
