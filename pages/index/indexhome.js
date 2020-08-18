const app = getApp();
var util = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '自主预约',
        active: true,
      },
      {
        id: 1,
        name: '上门代办',
        active: false,
      },
    ],
    province: '',
    city: '',
    district: '',
    latitude: '',
    longitude: '',
    //-----------模拟banner图-----------
    imgUrls: ['/images/banner1.png', '/images/banner2.png'],
    circular: true,
    //是否显示画板指示点
    indicatorDots: false,
    //选中点的颜色
    //是否竖直
    vertical: false,
    //是否自动切换
    autoplay: true,
    //自动切换的间隔
    interval: 5000,
    //滑动动画时长毫秒
    duration: 1000,
    //所有图片的高度
    imgheights: [],
    //图片宽度
    imgwidth: 750,
    //默认
    current: 0,
    time: '',
    vipcode: '',
    isHide: false,
    openid: '',
    isPageHide:true,
  },
  onLoad: function (options) {
    this.getopenid();
    let vipcode = wx.getStorageSync('vipcode');
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 2000,
    });
    var TIME = util.formatTime(new Date());
    // console.log(TIME);
    this.setData({ time: TIME });
    qqmapsdk = new QQMapWX({
      key: 'YYSBZ-HEZR6-WA5S2-E7YF4-N6HKV-VQFTG', //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
  },
  newselecttabs(e) {
    let newactive = e.detail;
    let { tabs } = this.data; //let tabs= this.data.tabs意思是一样
    tabs.forEach((v, i) => {
      i === newactive ? (v.active = true) : (v.active = false);
    });
    this.setData({ tabs });
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (
          res.authSetting['scope.userLocation'] != undefined &&
          res.authSetting['scope.userLocation'] != true
        ) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000,
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000,
                      });
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000,
                      });
                    }
                  },
                });
              }
            },
          });
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      },
    });
  },
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude;
    
        var longitude = res.longitude;
        wx.setStorageSync('latitude', latitude);
        wx.setStorageSync('longitude', longitude);
        var speed = res.speed;
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude);
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res));
      },
    });
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      success: function (res) {
        //  console.log(JSON.stringify(res));
        let province = res.result.ad_info.province;
        let city = res.result.ad_info.city;
        let district = res.result.ad_info.district;
        wx.setStorageSync('latitude', latitude);
        wx.setStorageSync('longitude', longitude);
        wx.setStorageSync('province', province);
        wx.setStorageSync('city', city);
        wx.setStorageSync('district', district);
        vm.setData({
          province: province,
          city: city,
          district: district,
          latitude: latitude,
          longitude: longitude,
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      },
    });
  },

  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;

    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights,
    });
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current });
  },
  getopenid() {
    let that = this;
    wx.login({
      timeout: 10000,
      success: (result) => {
        let that = this;
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
    
            wx.setStorageSync('user', res.data.data.user);
            wx.setStorageSync('openid', res.data.data.openid);
            let openid = res.data.data.openid;
            that.setData({
              openid: openid,
            });
            wx.request({
              url: 'https://carinspect.xgyvip.cn/api/home/user/login',
              data: {
               
                openid: res.data.data.openid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
              },
              method: 'POST',
              success(res) {
                wx.setStorageSync('vipId', res.data.data.vipId);
              },
            });
          },
        });
      },
    });
  },
});
