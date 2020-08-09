// pages/mycar/mycar.js
import { request } from "../../request/index.js"
import { navigation } from '../../utils/navigation'
Page({

  data: {
    cardetail: [],
    page: 1
  },

  onLoad: function (options) {
    wx.setStorageSync('bookstoreid', options.storeid);
    wx.setStorageSync('bookcarname', options.name);
    wx.setStorageSync('bookcaraddress', options.address);
    this.getcaritems()
  }, getcaritems() {
    let vipId = wx.getStorageSync('vipId');
    let user = wx.getStorageSync('user');
    request({
      url: "http://carinspect.xgyvip.cn/api/home/user/carList",
      data: {
        vipId: vipId,
        openid: user.openid
      }
    }).then((result) => {
      var cardetail = result.data.data;
      this.setData({
        cardetail
      })

    })
  }, clickedit() {
    // let params = {
    //   id: e.currentTarget.dataset.bookcarid,
    //   car_no: e.currentTarget.dataset.bookcarno
    // };

    // navigation.navigateTo("/pages/book/book", params);
    //}

  }, clickone(e) {
    let params = {
      id: e.currentTarget.dataset.bookcarid,
      car_no: e.currentTarget.dataset.bookcarno
    };

    navigation.navigateTo("/pages/book/book", params);
  }


})