// pages/order/order.js
import { request } from '../../request/index.js';
import { navigation } from '../../utils/navigation';
Page({
  data: {
    orderlist: [],
    pages: 1,
    ordertips: '下拉加载更多',
  },
  totalPages: 1,
  onLoad: function (options) {
    this.getOderlist();
  },
  getOderlist() {
    let that = this;
    let vipId = wx.getStorageSync('vipId');
    request({
      url: 'https://carinspect.xgyvip.cn/api/home/order/index',
      data: {
        vipid: vipId,
        p: this.data.pages,
      },
    }).then((result) => {
      let total = result.data.paginate.total;
      that.totalPages = Math.ceil(total / 10);
      that.setData({
        orderlist: [...this.data.orderlist, ...result.data.data],
      });
    });
    wx.stopPullDownRefresh();
  },
  onReachBottom(e) {
    if (this.data.pages >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
      });
    } else {
      this.data.pages++;
      this.getOderlist();
    }
  },
  onPullDownRefresh(e) {
    console.log(e);

    this.setData({
      pages: 1,
      orderlist: [],
    });
    this.getOderlist();
  }, orderDetail(e) {
    let orderid = { orderid: e.currentTarget.dataset.orderid }
    navigation.navigateTo('/pages/orderdetail/orderdetail', orderid);
 
   }
});
