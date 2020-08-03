
// //app.js

App({
    globalData: {
        appid: 'wxa4092916d5f0d057',//appid需自己提供，此处的appid我随机编写
        secret: '8d916f278dbc77e0a02514bc987ffabd',//secret需自己提供，此处的secret我随机编写

    },
    onLaunch: function () {
        var that = this
        var user = wx.getStorageSync('user') || {};
        var userInfo = wx.getStorageSync('userInfo') || {};
        if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.getUserInfo({
                            success: function (res) {
                                var objz = {};
                                objz.avatarUrl = res.userInfo.avatarUrl;
                                objz.nickName = res.userInfo.nickName;
                                //console.log(objz);
                                wx.setStorageSync('userInfo', objz);//存储userInfo
                            }
                        });
                        var d = that.globalData;//这里存储了appid、secret、token串  
                        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                        wx.request({
                            url: l,
                            data: {},
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                            // header: {}, // 设置请求的 header  
                            success: function (res) {
                                console.log(res.data);
                                var obj = {};
                                obj.openid = res.data.openid;
                                obj.expires_in = Date.now() + res.data.expires_in;
                                //console.log(obj);
                                wx.setStorageSync('user', obj);//存储openid  

                                if (1) {

                                    wx.login({
                                        success: function (res) {

                                            if (res.code) {
                                                //发起网络请求
                                                wx.request({
                                                    url: 'http://carinspect.xgyvip.cn/api/home/user/login',
                                                    data: {
                                                        user_nickname: 'person_good',
                                                        openid: 'o4ecO5E6odaLuOXGeduV18sDDIi4',
                                                        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVMLKa5NXlevpaD1JOatHHqg4XRlMO6ysHoTvc8s1q33xe51sSBZKSqvAYwwAJ4JyXWURBtyZX9Q/132',
                                                        mobile: '15010194097',
                                                        sex: '0'
                                                    }, header: {
                                                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                                                    },
                                                    method: "POST",
                                                    success(res) {
                                                       
                                                         
                                                        wx.setStorageSync('vipId', res.data.data.vipId);
                                                          
                                                    }
                                                })
                                            } else {
                                                console.log('获取用户登录态失败！' + res.errMsg)
                                            }
                                        }
                                    });

                                }


                            }
                        });
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            });
        }
    },
})


