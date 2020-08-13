Page({
  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName
              })
              wx.login({
                timeout: 10000,
                success: (result) => {
                    let that=this;
                    wx.setStorageSync('openidceshi', '测是我是否能缓存成功');
                    wx.setStorageSync('vipcode', result.code);
                    wx.request({
                        url: 'https://carinspect.xgyvip.cn/api/home/public/getOpenid',
                        data: {
                            code: result.code
                        }, header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        method: "POST",
                        success(res) {
                            wx.setStorageSync('user', res.data.data.user);
                            wx.setStorageSync('openid', res.data.data.user.openid);
                            
                            wx.request({
                                url: 'https://carinspect.xgyvip.cn/api/home/user/login',
                                data: {
                                    user_nickname: 'xxxx',
                                    openid:res.data.data.user.openid,
                                    avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVMLKa5NXlevpaD1JOatHHqg4XRlMO6ysHoTvc8s1q33xe51sSBZKSqvAYwwAJ4JyXWURBtyZX9Q/132',
                                    mobile: '13888888888',
                                    sex: '0'
                                }, header: {
                                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                                },
                                method: "POST",
                                success(res) {
                                    wx.setStorageSync('vipId', res.data.data.vipId);
                                   wx.switchTab({
                                     url: '/pages/index/index',
                                     
                                   });
                                     
                                      
                                }
                            })
                        }
                    })
              }
            });


            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },

  // 打开权限设置页提示框
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
})