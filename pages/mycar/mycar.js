// pages/mycar/mycar.js
import { request } from "../../request/index.js"
import { navigation } from '../../utils/navigation'
const app = getApp();
let bookstoreid = wx.getStorageSync('bookstoreid');
let bookcarname = wx.getStorageSync('bookcarname');
let bookcaraddress = wx.getStorageSync('bookcaraddress');
Page({
  data: {
    cardetail: [],
    page: 1,
    tabindex: true,
    pagesize: 20,
    vipId: 0,
    useropenid: 0,
    texts: 'ceshi',
    ceshi: '11111',
    openidceshi: 'text',
    bookstoreid: bookstoreid,
      bookcarname: bookcarname,
      bookcaraddress: bookcaraddress,
  },
  onLoad: function (options) {
    if (options.tab != undefined) {
      this.setData({
        tabindex: options.tab
      })
    }

    wx.setStorageSync('ceshi', 'mycar的数据缓存');

    wx.setStorageSync('bookstoreid', options.storeid);
    wx.setStorageSync('bookcarname', options.name);
    wx.setStorageSync('bookcaraddress', options.address);
    this.getcaritems();

    this.setData({
      bookstoreid: options.storeid,
      bookcarname: options.name,
      bookcaraddress:  options.address,
      
    })
   
  }, getcaritems() {
    let vipId = wx.getStorageSync('vipId');
    let ceshi = wx.getStorageSync('ceshi');
    let openid = wx.getStorageSync('openid');
    let openidceshi = wx.getStorageSync('openidceshi');
    let failtext = wx.getStorageSync('failtext');

    this.setData({
      vipId: vipId,
      failtext: failtext,
      useropenid: openid,
      ceshi: ceshi,
      openidceshi: openidceshi
    })
   
     
    request({
      url: "https://carinspect.xgyvip.cn/api/home/user/carList",
      data: {
        vipId: vipId,
        openid: openid,
        page: this.data.page,
        pagesize: this.data.pagesize
      }
    }).then((result) => {
      var cardetail = result.data.data;
      this.setData({
        cardetail
      })
    })
  }, clickedit(e) {
    let params = {
      id: e.currentTarget.dataset.careditid
    };
    navigation.navigateTo("/pages/caredit/caredit", params);
  }, clickone(e) {
    let params = {
      id: e.currentTarget.dataset.bookcarid,
      car_no: e.currentTarget.dataset.bookcarno
    };

    navigation.navigateTo("/pages/book/book", params);
  }
})