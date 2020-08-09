// pages/book/book.js
import { navigation } from '../../utils/navigation';
var util = require('../../utils/util.js')
import { request } from "../../request/index.js"
var date = new Date();
var newdate = util.formatTime(date);
var newdate2 = util.formatTime(date);
console.log();
var newindex = 0
var datetips = '今天'
let currentTimes = date.getHours() * 1
if (currentTimes >= 7 && currentTimes < 8) {
  newindex = 0
} else if (currentTimes >= 8 && currentTimes < 9) {
  newindex = 1
} else if (currentTimes >= 9 && currentTimes < 10) {
  newindex = 2
} else if (currentTimes >= 10 && currentTimes < 11) {
  newindex = 3
} else if (currentTimes >= 11 && currentTimes < 12) {
  newindex = 4
} else if (currentTimes >= 12 && currentTimes < 13) {
  newindex = 5
} else if (currentTimes >= 13 && currentTimes < 14) {
  newindex = 6
} else if (currentTimes >= 14 && currentTimes < 15) {
  newindex = 7
} else if (currentTimes >= 15 && currentTimes < 16) {
  newindex = 8
} else if (currentTimes >= 16 && currentTimes < 17) {
  newindex = 9
} else if (currentTimes >= 17 && currentTimes < 18) {
  newindex = 10
} else if (currentTimes >= 18 && currentTimes < 24) {
  newindex = 0
} else {
  var newindex = 0
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookdate: '',
    bookcartype: '',
    booktime: '',
    bookstoreid: '',
    bookcarno: '',
    newindex: newindex,
    bookcaraddress: '',
    bookcarname: '',
    booktimelist: [
      {
        id: 7,
        name: '07:00-08:00',
        tips: '上午'
      },
      {
        id: 8,
        name: '08:00-09:00',
        tips: '上午'
      },
      {
        id: 9,
        name: '09:00-10:00',
        tips: '上午'
      },
      {
        id: 10,
        name: '10:00-11:00',
        tips: '上午'
      },
      {
        id: 11,
        name: '11:00-12:00',
        tips: '上午'
      },
      {
        id: 12,
        name: '12:00-13:00',
        tips: '下午'
      },
      {
        id: 13,
        name: '13:00-14:00',
        tips: '下午'
      },
      {
        id: 14,
        name: '14:00-15:00',
        tips: '下午'
      },
      {
        id: 15,
        name: '15:00-16:00',
        tips: '上午'
      },
      {
        id: 16,
        name: '16:00-17:00',
        tips: '下午'
      },
      {
        id: 17,
        name: '17:00-18:00',
        tips: '下午'
      }
    ],
    GoodsList: [],
    index: 0,
    if_checked: true,
    next_class: 0,
    good_price: 0.00,
    booklist: {},
    bookcarid: '',
    good_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookdate = wx.getStorageSync('bookdate');
    let bookcartype = wx.getStorageSync('bookcartype');
    let booktime = wx.getStorageSync('booktime');
    let bookstoreid = wx.getStorageSync('bookstoreid');
    let bookcarname = wx.getStorageSync('bookcarname');
    let bookcaraddress = wx.getStorageSync('bookcaraddress');
    // console.log(this.data.booktimelist);
    this.setData({
      bookcarno: options.car_no,
      bookcarname: bookcarname,
      bookcaraddress: bookcaraddress,
      bookdate: bookdate,
      bookcartype: bookcartype,
      booktime: booktime,
      bookstoreid: bookstoreid,
      bookcarid: options.id
    })
    this.caletime()
    this.getGoodsList()
  },
  caletime() {
    request({
      url: "http://carinspect.xgyvip.cn/api/home/store/getinterval",
      data: {
        storeid: this.data.bookstoreid,
        date: this.data.bookdate
      }
    }).then((result) => {
      // let booktimenum = this.data.booktimelist;
      let booklist = result.data.data;
      for (let index = 0; index < booklist.length; index++) {
        if (booklist[index].timer === 7) {
          booklist[index].timedetail = '7:00-8:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 8) {
          booklist[index].timedetail = '8:00-9:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 9) {
          booklist[index].timedetail = '9:00-10:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 10) {
          booklist[index].timedetail = '10:00-11:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 11) {
          booklist[index].timedetail = '11:00-12:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 12) {
          booklist[index].timedetail = '12:00-13:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 13) {
          booklist[index].timedetail = '13:00-14:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 14) {
          booklist[index].timedetail = '14:00-15:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 15) {
          booklist[index].timedetail = '15:00-16:00' + '  剩余' + booklist[index].booknum
        } else if (booklist[index].timer === 16) {
          booklist[index].timedetail = '16:00-17:00' + '  剩余' + booklist[index].booknum
        } else {
          booklist[index].timedetail = '17:00-18:00' + '  剩余' + booklist[index].booknum
        }
      }
      this.setData({
        booklist
      })
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail)
    let element;
    for (let index = 0; index < this.data.GoodsList.length; index++) {
      if (e.detail.value * 1 === index * 1) {
        element = this.data.GoodsList[index].good_price;
        good_id = this.data.GoodsList[index].good_id;
      }
    }
    this.setData({
      good_price: element,
      good_id,
      index: e.detail.value
    })
  },
  boxcheck: function (e) {
    var flag = e.detail.value[0];
    if (flag === undefined) {
      this.data.next_class = '';
      flag = false;
    } else {
      this.data.next_class = "text_blue";
      flag = true;
    }
    this.setData({
      if_checked: flag,
      next_class: this.data.next_class
    })
  },
  formSubmit: function (e) {
    var vipid = wx.getStorageSync('vipId')


    const pargrams = {
      vipid: vipid,
      ids: this.data.good_id,
      pay_type: 1,
      car_id: this.data.bookcarid,
      yue_date: '2020-08-06',
      yue_interval: 10,
      book_type: this.data.bookcarid
    }

    request({
      url: "http://carinspect.xgyvip.cn/api/home/check/fastbuy",
      data: pargrams,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((result) => {
      let { code } = result.data;
      let { msg } = result.data;
      let { order_id } = result.data.data;
      let { openid } = wx.getStorageSync('user');
      console.log(msg);
      wx.showModal({
        title: msg,
        content: '订单已提交',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            request({
              url: "http://carinspect.xgyvip.cn/api/pay/check/paywx",
              data: {
                order_id,
                openid
              },
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then((result) => {
           
               let { appId,timeStamp,nonceStr,signType,paySign }=result.data.data;
                console.log(appId,timeStamp,nonceStr,signType,paySign);
              let prepay_id=result.data.data.package;

                wx.requestPayment({
                  timeStamp : timeStamp, // 时间戳，必填（后台传回）
                  nonceStr : nonceStr, // 随机字符串，必填（后台传回）
                  package : prepay_id, // 统一下单接口返回的 prepay_id 参数值，必填（后台传回）
                  signType : 'MD5', // 签名算法，非必填，（预先约定或者后台传回）
                  paySign  : paySign, // 签名 ，必填 （后台传回）
                  success:function(res){ // 成功后的回调函数
                      // do something
                      console.log(res);
                    
                     // {errMsg: "requestPayment:ok"}
 
                  }
              })




                

            });
          } }
      });


    })
  },
  getGoodsList() {
    request({
      url: "http://carinspect.xgyvip.cn/api/home/store/getGoodsList",
      data: {
        storeid: this.data.bookstoreid,
      }
    }).then((result) => {
      this.setData({
        good_id: result.data.data[0].good_id,
        good_price: result.data.data[0].good_price,
        GoodsList: result.data.data
      })
    })
  }
})

