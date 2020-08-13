
// App({

//     globalData: {
//         appid: 'wxa4092916d5f0d057',//appid需自己提供，此处的appid我随机编写
//         secret: '8d916f278dbc77e0a02514bc987ffabd',//secret需自己提供，此处的secret我随机编写
//         openid: ''
//     },
//     getOpenid: function () {
//         var that = this;
//         return new Promise(function (resolve, reject) {
//             wx.login({
//                 success: function (res) {
//                     //code 获取用户信息的凭证
//                     if (res.code) {
//                         //请求获取用户openid
//                         wx.request({
//                             url: "http://carinspect.xgyvip.cn/api/home/public/getOpenid",
//                             data: { "code": res.code },
//                             method: 'POST',
//                             header: {
//                                 'Content-type': 'application/x-www-form-urlencoded'
//                             },
//                             success: function (res) {
//                                 wx.setStorageSync('openid', res.data.data.user.openid);//存储openid
//                                 wx.setStorageSync('useropenid', res.data.data.user.openid);//存储openid

//                                 var res = {
//                                     status: 200,
//                                     data: res.data.data.user.openid
//                                 }
//                                 resolve(res);
//                             }
//                         });
//                     } else {
//                         console.log('获取用户登录态失败！' + res.errMsg)
//                         reject('error');
//                     }
//                 }
//             })
//         });
//     }
// })

 
App({

    globalData: {
        appid: 'wxa4092916d5f0d057',//appid需自己提供，此处的appid我随机编写
        secret: '8d916f278dbc77e0a02514bc987ffabd',//secret需自己提供，此处的secret我随机编写
        openid: ''
    }, onLaunch: function () {
 
        wx.login({
            timeout: 10000,
            success: (result) => {
                let that = this;
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
                                openid: res.data.data.user.openid,
                                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVMLKa5NXlevpaD1JOatHHqg4XRlMO6ysHoTvc8s1q33xe51sSBZKSqvAYwwAJ4JyXWURBtyZX9Q/132',
                                mobile: '13888888888',
                                sex: '0'
                            }, header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            method: "POST",
                            success(res) {
                                wx.setStorageSync('vipId', res.data.data.vipId);

                            }
                        })
                    }, fail: (res) => {
                        wx.setStorageSync('failtext', '失败1111111');
                    }
                })
            }
        });
    }


})
// // //app.js

// App({
//     globalData: {
//         appid: 'wxa4092916d5f0d057',//appid需自己提供，此处的appid我随机编写
//         secret: '8d916f278dbc77e0a02514bc987ffabd',//secret需自己提供，此处的secret我随机编写
//     },
//     onLaunch: function () {
//         var that = this
//         var user = wx.getStorageSync('user') || {};
//         var userInfo = wx.getStorageSync('userInfo') || {};
//         console.log(user);
//         if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
//             console.log('appjs');
//             wx.login({
//                 success: function (res) {
//                     console.log(res,'appjs');
//                     if (res.code) {
//                         wx.getUserInfo({
//                             success: function (res) {
//                                 var objz = {};
//                                 objz.avatarUrl = res.userInfo.avatarUrl;
//                                 objz.nickName = res.userInfo.nickName;
//                                 //console.log(objz);
//                                 wx.setStorageSync('userInfo', objz);//存储userInfo
//                             }
//                         });
//                         var d = that.globalData;//这里存储了appid、secret、token串  
//                         var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa4092916d5f0d057&secret=8d916f278dbc77e0a02514bc987ffabd&js_code=' 11'&grant_type=authorization_code';
//                         wx.request({
//                             url: l,
//                             data: {},
//                             method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
//                             success: function (res) {
//                              //   console.log(res.data);  //openid: "o4ecO5E6odaLuOXGeduV18sDDIi4"session_key: "yTZsu9IW2uFoLZqMeGX+zQ=="

//                                 var obj = {};
//                                 obj.openid = res.data.openid;
//                                 obj.expires_in = Date.now() + res.data.expires_in;

//                                 wx.setStorageSync('user', obj);//存储openid  

//                                 if (1) {

//                                     wx.login({
//                                         success: function (res) {
//                                             let objz= wx.getStorageSync('objz');
//                                               console.log(objz);
//                                             if (res.code) {
//                                                 //发起网络请求
//                                                 wx.request({
//                                                     url: 'http://carinspect.xgyvip.cn/api/home/user/login',
//                                                     data: {
//                                                         user_nickname: objz.nickName,
//                                                         openid:  obj.openid,
//                                                         avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVMLKa5NXlevpaD1JOatHHqg4XRlMO6ysHoTvc8s1q33xe51sSBZKSqvAYwwAJ4JyXWURBtyZX9Q/132',
//                                                         mobile: '13888888888',
//                                                         sex: '0'
//                                                     }, header: {
//                                                         'content-type': 'application/x-www-form-urlencoded' // 默认值
//                                                     },
//                                                     method: "POST",
//                                                     success(res) {
//                                                         wx.setStorageSync('vipId', res.data.data.vipId);
//                                                     }
//                                                 })
//                                             } else {
//                                                 console.log('获取用户登录态失败！' + res.errMsg)
//                                             }
//                                         }
//                                     });

//                                 }


//                             }
//                         });
//                     } else {
//                         console.log('获取用户登录态失败！' + res.errMsg)
//                     }
//                 }
//             });
//         }else{

//             console.log('wo lai l ')
//         }
//     },
// })


