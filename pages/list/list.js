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
    district: district,


  }, datalist: [],
  onLoad: function (options) {
   
    wx.setStorageSync('bookdate', options.date);
    wx.setStorageSync('bookcartype', options.cartype);
    wx.setStorageSync('booktime', options.time);

    qqmapsdk = new QQMapWX({
      key: 'YYSBZ-HEZR6-WA5S2-E7YF4-N6HKV-VQFTG' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    })

    this.getcatitems();

  }, getcatitems() {
    request({
      url: "https://carinspect.xgyvip.cn/api/home/store/lists?page=" + this.data.page + "&pagesize=10" + "&lat=" + this.data.selflatitude + "&lng=" + this.data.selflongitude
    }).then((result) => {
      //console.log(result.data);
      this.datalist = result.data
      let newadata = this.datalist.data.map((v, index) => {
        let range = this.calculateDistance(this.data.selflatitude, this.data.selflongitude, v.lat, v.lng)
        v.range = range * 1
        return v
      })
      //console.log(newadata);
      this.setData({
        data: newadata
      })
      // console.log(this.data.data, '-----------');
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

  }
})