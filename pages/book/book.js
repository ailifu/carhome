// pages/book/book.js
import { navigation } from '../../utils/navigation';
var util = require('../../utils/util.js');
import { request } from '../../request/index.js';
var date = new Date();
var newdate = util.formatTime(date);
var newdate2 = util.formatTime(date);
console.log();
var newindex = 0;
var datetips = '今天';
let currentTimes = date.getHours() * 1;
if (currentTimes >= 7 && currentTimes < 8) {
  newindex = 0;
 
} else if (currentTimes >= 8 && currentTimes < 9) {
  newindex = 1;
} else if (currentTimes >= 9 && currentTimes < 10) {
  newindex = 2;
} else if (currentTimes >= 10 && currentTimes < 11) {
  newindex = 3;
} else if (currentTimes >= 11 && currentTimes < 12) {
  newindex = 4;
} else if (currentTimes >= 12 && currentTimes < 13) {
  newindex = 5;
} else if (currentTimes >= 13 && currentTimes < 14) {
  newindex = 6;
} else if (currentTimes >= 14 && currentTimes < 15) {
  newindex = 7;
} else if (currentTimes >= 15 && currentTimes < 16) {
  newindex = 8;
} else if (currentTimes >= 16 && currentTimes < 17) {
  newindex = 9;
} else if (currentTimes >= 17 && currentTimes < 18) {
  newindex = 10;
} else if (currentTimes >= 18 && currentTimes < 24) {
  newindex = 0;
  currentTimes=7
} else {
  var newindex = 0;
  currentTimes=7
}
let bookdate = wx.getStorageSync('bookdate');
let bookcartype = wx.getStorageSync('bookcartype');
let booktime = wx.getStorageSync('booktime');
let bookstoreid = wx.getStorageSync('bookstoreid');
let bookcarname = wx.getStorageSync('bookcarname');
let bookcaraddress = wx.getStorageSync('bookcaraddress');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookdate: wx.getStorageSync('bookdate'),
    bookcartype: wx.getStorageSync('bookcartype'),
    booktime:  wx.getStorageSync('booktime'),
    bookstoreid: wx.getStorageSync('bookstoreid'),
    bookcarno: '',
    newindex: newindex,
    bookcaraddress:  wx.getStorageSync('bookcaraddress'),
    bookcarname:wx.getStorageSync('bookcarname'),
    booktimelist: [
      {
        id: 7,
        name: '07:00-08:00',
        tips: '上午',
      },
      {
        id: 8,
        name: '08:00-09:00',
        tips: '上午',
      },
      {
        id: 9,
        name: '09:00-10:00',
        tips: '上午',
      },
      {
        id: 10,
        name: '10:00-11:00',
        tips: '上午',
      },
      {
        id: 11,
        name: '11:00-12:00',
        tips: '上午',
      },
      {
        id: 12,
        name: '12:00-13:00',
        tips: '下午',
      },
      {
        id: 13,
        name: '13:00-14:00',
        tips: '下午',
      },
      {
        id: 14,
        name: '14:00-15:00',
        tips: '下午',
      },
      {
        id: 15,
        name: '15:00-16:00',
        tips: '上午',
      },
      {
        id: 16,
        name: '16:00-17:00',
        tips: '下午',
      },
      {
        id: 17,
        name: '17:00-18:00',
        tips: '下午',
      },
    ],
    GoodsList: [],
    index: 0,
    indexgood:0,
    if_checked: true,
    next_class: 0,
    good_price: 0.0,
    booklist: {},
    bookcarid: '',
    good_id: '',
    book_type: 1,
    bookselect:currentTimes
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.booktimelist);
    this.setData({
      bookcarno: options.car_no,
      bookcarname: bookcarname,
      bookcaraddress: bookcaraddress,
      bookdate: bookdate,
      bookcartype: bookcartype,
      booktime: booktime,
      bookstoreid: bookstoreid,
      bookcarid: options.id,
    });
    this.caletime();
    this.getGoodsList();
  },
  caletime() {
    request({
      url: 'https://carinspect.xgyvip.cn/api/home/store/getinterval',
      data: {
        storeid:  wx.getStorageSync('bookstoreid'),
        date: wx.getStorageSync('bookdate'),
      },
    }).then((result) => {
      // let booktimenum = this.data.booktimelist;
      let booklist = result.data.data;
      
      for (let index = 0; index < booklist.length; index++) {
        if (booklist[index].timer === 7) {
          booklist[index].timedetail =
            '7:00-8:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 8) {
          booklist[index].timedetail =
            '8:00-9:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 9) {
          booklist[index].timedetail =
            '9:00-10:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 10) {
          booklist[index].timedetail =
            '10:00-11:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 11) {
          booklist[index].timedetail =
            '11:00-12:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 12) {
          booklist[index].timedetail =
            '12:00-13:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 13) {
          booklist[index].timedetail =
            '13:00-14:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 14) {
          booklist[index].timedetail =
            '14:00-15:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 15) {
          booklist[index].timedetail =
            '15:00-16:00' + '  剩余' + booklist[index].booknum;
        } else if (booklist[index].timer === 16) {
          booklist[index].timedetail =
            '16:00-17:00' + '  剩余' + booklist[index].booknum;
        } else {
          booklist[index].timedetail =
            '17:00-18:00' + '  剩余' + booklist[index].booknum;
        }
      }

      let bookselect;
      let booktime= wx.getStorageSync('booktime');
      for (let mm = 0; mm < booklist.length; mm++) {
 
      
        if (booklist[mm].timer*1 === booktime*1) {
         
        bookselect=
          booktime+':00-'+(booktime*1+1)+':00' + '  剩余' + booklist[mm].booknum;
        }  
      }
      console.log(bookselect,'1111');
      this.setData({
        booklist,
        bookselect
      });
    });
  }, bindDateChange(e) { //选择日期
   
    wx.setStorageSync('bookdate', e.detail.value);
    this.setData({
      bookdate: e.detail.value,
    });
  },

  bindPickerChange: function (e) { //x选择时段
 
    let booktimeindex = e.detail.value;
   
    wx.setStorageSync('booktime', this.data.booklist[booktimeindex].timer);
    console.log(this.data.booklist);
    this.setData({
      index: e.detail.value,
      booktime: this.data.booklist[booktimeindex].timer,
      bookselect: this.data.booklist[booktimeindex].timedetail
    });
  },
  bindGoodsList(e) {
    
    let element;
    let good_id;

    for (let w = 0; w < this.data.GoodsList.length; w++) {
      if (e.detail.value * 1 === w * 1) {
        element = this.data.GoodsList[w].good_price;
        good_id = this.data.GoodsList[w].good_id;
      }
    }

    this.setData({
      good_price: element,
      good_id: good_id 
 
    });
  },

  boxcheck: function (e) {
    var flag = e.detail.value[0];
    if (flag === undefined) {
      this.data.next_class = '';
      flag = false;
    } else {
      this.data.next_class = 'text_blue';
      flag = true;
    }
    this.setData({
      if_checked: flag,
      next_class: this.data.next_class,
    });
  },
  listenerRadioGroup(e) {
    this.setData({
      book_type: e.detail.value,
    });
  },
  formSubmit: function (e) {
    console.log(e);
    var vipid = wx.getStorageSync('vipId');
    const pargrams = {
      vipid: vipid,
      ids: this.data.good_id,
      pay_type: 1,
      car_id: this.data.bookcarid,
      yue_date: this.data.bookdate,
      yue_interval: this.data.booktime,
      book_type: this.data.book_type,
    };

    request({
      url: 'https://carinspect.xgyvip.cn/api/home/check/fastbuy',
      data: pargrams,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
    }).then((result) => {
      let { code } = result.data;
      let { msg } = result.data;
      let { order_id } = result.data.data;
      let openid = wx.getStorageSync('openid');

      //这部分代码是选择线上支付执行开始
      wx.showModal({
        title: msg,
        content: '订单提交成功',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            request({
              url: 'https://carinspect.xgyvip.cn/api/pay/check/paywx',
              data: {
                order_id,
                openid,
              },
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
            }).then((result) => {
              let {
                appId,
                timeStamp,
                nonceStr,
                signType,
                paySign,
              } = result.data.data;
              // console.log(appId, timeStamp, nonceStr, signType, paySign);
              let prepay_id = result.data.data.package;
              wx.requestPayment({
                timeStamp: timeStamp, // 时间戳，必填（后台传回）
                nonceStr: nonceStr, // 随机字符串，必填（后台传回）
                package: prepay_id, // 统一下单接口返回的 prepay_id 参数值，必填（后台传回）
                signType: 'MD5', // 签名算法，非必填，（预先约定或者后台传回）
                paySign: paySign, // 签名 ，必填 （后台传回）
                success: function (res) {
                  // 成功后的回调函数
                  // do something
                  wx.showModal({
                    title: '支付成功',
                    content: '',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                      if (result.confirm) {
                        wx.navigateTo({
                          url: '../order/order',
                        });
                      }
                    },
                  });
                },
                fail: () => {
                  console.log(msg);
                  wx.showModal({
                    title: msg,
                    content: '支付失败',
                    showCancel: false,
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                  });
                },
              });
            });
          }
        },
      });
      //这部分代码是选择线上支付执行结束
    });
  },
  getGoodsList() {
    request({
      url: 'https://carinspect.xgyvip.cn/api/home/store/getGoodsList',
      data: {
        storeid: wx.getStorageSync('bookstoreid'),
      },
    }).then((result) => {
      console.log(result);
      this.setData({
        good_id: result.data.data[0].good_id,
        good_price: result.data.data[0].good_price,
        GoodsList: result.data.data,
      });
    });
  },
});
