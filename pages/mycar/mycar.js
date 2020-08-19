// pages/mycar/mycar.js
import { request } from '../../request/index.js';
import { navigation } from '../../utils/navigation';
const app = getApp();
let bookstoreid = wx.getStorageSync('bookstoreid');
let bookcarname = wx.getStorageSync('bookcarname');
let bookcaraddress = wx.getStorageSync('bookcaraddress');
Page({
  data: {
    cardetail: [],
    page: 1,
    tabindex: true,
    pagesize: 10,
    vipId: 0,
    useropenid: 0,
    texts: 'ceshi',
    ceshi: '11111',
    openidceshi: 'text',
    bookstoreid: bookstoreid,
    bookcarname: bookcarname,
    bookcaraddress: bookcaraddress,
    addCarposition:'addcar'
  },
  totalPages: 1,
  onShow() { 
    this.setData({
      page: 1,
      cardetail: [],
    });
    this.getcaritems();
  },
  onLoad: function (options) {
    if (options.tab != undefined) {
      this.setData({
        tabindex: options.tab,
      });
    }

    wx.setStorageSync('bookstoreid', options.storeid);
    wx.setStorageSync('bookcarname', options.name);
    wx.setStorageSync('bookcaraddress', options.address);


    this.setData({
      bookstoreid: options.storeid,
      bookcarname: options.name,
      bookcaraddress: options.address,
    });
  },
  getcaritems() {
    let vipId = wx.getStorageSync('vipId');

    let openid = wx.getStorageSync('openid');
    let that = this;

    this.setData({
      vipId: vipId,

      useropenid: openid,
    });

    request({
      url: 'https://carinspect.xgyvip.cn/api/home/user/carList',
      data: {
        vipId: vipId,
        openid: openid,
        page: this.data.page,
        pagesize: this.data.pagesize,
      },
    }).then((result) => {
      let total = result.data.paginate.total;
      if (total >= 4) { 
        this.setData({
          addCarposition:"addcarmore",
        });
      }
      that.totalPages = Math.ceil(total / 10);
      var cardetail = result.data.data;

      this.setData({
        cardetail: [...this.data.cardetail, ...result.data.data],
      });
    });
    wx.stopPullDownRefresh();
  },
  clickedit(e) {
    let params = {
      id: e.currentTarget.dataset.careditid,
    };
    navigation.navigateTo('/pages/caredit/caredit', params);
  },
  clickone(e) {
    let params = {
      id: e.currentTarget.dataset.bookcarid,
      car_no: e.currentTarget.dataset.bookcarno,
    };

    navigation.navigateTo('/pages/book/book', params);
  },
  onReachBottom(e) {
    console.log(e);
  },
  onReachBottom(e) {
    if (this.data.page >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
      });
    } else {
      this.data.page++;
      this.getcaritems();
    }
  },
  onPullDownRefresh(e) {
    this.setData({
      page: 1,
      cardetail: [],
    });
    this.getcaritems();
  },
});
