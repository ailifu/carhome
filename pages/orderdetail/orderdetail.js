// pages/order/order.js
import { request } from '../../request/index.js';
import { navigation } from '../../utils/navigation';
Page({
  data: {
    orderlist: [],
    pages: 1,
    id:1,
  },
  totalPages: 1,
  onLoad: function (options) {
  
    this.getOderlist(options.orderid);
  },
  getOderlist(value) {
    let that = this;
 
    request({
      url: 'https://carinspect.xgyvip.cn/api/home/order/index_detail',
      data: {
        id: value
      },
    }).then((result) => {
       console.log();
      that.setData({
        orderlist:result.data.data,
      });
    });
  
  } 
});
