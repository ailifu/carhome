import { request } from "../../request/index.js"
let selflatitude = wx.getStorageSync('latitude');
let selflongitude = wx.getStorageSync('longitude');
let province = wx.getStorageSync('province');
let city = wx.getStorageSync('city');
let district = wx.getStorageSync('district');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    data: '',
    page: 1,
    location: '',
    selflatitude: selflatitude,
    selflongitude: selflongitude,
    province: province,
    city: city,
    district: district 
     

  }, datalist: [],
  onLoad: function (options) {

    wx.setStorageSync('bookdate', options.date);
    wx.setStorageSync('bookcartype', options.cartype);
    wx.setStorageSync('booktime', options.time);

    qqmapsdk = new QQMapWX({
      key: 'YYSBZ-HEZR6-WA5S2-E7YF4-N6HKV-VQFTG' //自己的key秘钥 https://lbs.qq.com/console/mykey.html 在这个网址申请
    })
    this.getcatitems()
     
  }, getcatitems() {
    let vm1=this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude

        vm1.getLocal(latitude, longitude)
        request({
          url: "https://carinspect.xgyvip.cn/api/home/store/lists?page=" + vm1.data.page + "&pagesize=20" + "&lat=" + res.latitude + "&lng=" +  res.longitude
        }).then((result) => {
          //console.log(result.data);
          vm1.datalist = result.data
          let newadata = vm1.datalist.data.map((v, index) => {
            let range = vm1.calculateDistance( res.latitude,  res.longitude, v.lat, v.lng)
            v.range = range * 1
            return v
          })
          vm1.setData({
            data: newadata
          })
        
        })
      }
     })
   
  }, calculateDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 * 1;
    lng1 = lng1 * 1;
    lat2 = lat2 * 1;
    lng2 = lng2 * 1;
    lat1, lng1, lat2, lng2
    var f = ((lat1 + lat2) / 2) * Math.PI / 180.0;
    var g = ((lat1 - lat2) / 2) * Math.PI / 180.0;
    var l = ((lng1 - lng2) / 2) * Math.PI / 180.0;
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s, c, w, r, d, h1, h2;
    var a = 6378137.0;//地球的直
    var fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    var num = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000
    return num.toFixed(0);//返回单位:米

  }, getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        //  console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
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
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }









})