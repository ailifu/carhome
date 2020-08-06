// pages/book/book.js
import { navigation } from '../../utils/navigation';

var util = require('../../utils/util.js')
import { request } from "../../request/index.js"
var date = new Date();
var newdate = util.formatTime(date);
var newdate2 = util.formatTime(date);
console.log();
var newindex=0
var datetips='今天'
let  currentTimes=date.getHours()*1
if(currentTimes>=7 && currentTimes<8){
   newindex=0
}else if(currentTimes>=8 && currentTimes<9){
     newindex=1
}else if(currentTimes>=9 && currentTimes<10){
    newindex=2
}else if(currentTimes>=10 && currentTimes<11){ 
    newindex=3
}else if(currentTimes>=11 && currentTimes<12){
   newindex=4
}else if(currentTimes>=12 && currentTimes<13){
   newindex=5
}else if(currentTimes>=13 && currentTimes<14){
   newindex=6
}else if(currentTimes>=14 && currentTimes<15){
   newindex=7
}else if(currentTimes>=15 && currentTimes<16){
   newindex=8
}else if(currentTimes>=16 && currentTimes<17){
   newindex=9
}else if(currentTimes>=17 && currentTimes<18){
   newindex=10
}else if(currentTimes>=18 && currentTimes<24){
   newindex=0
 
}else{
  var newindex=0
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
    newindex:newindex,
    bookcaraddress:'',
    bookcarname:'',
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
    console.log(this.data.booktimelist);
    this.setData({
      bookcarno: options.car_no,
      bookcarname: bookcarname,
      bookcaraddress: bookcaraddress,
      bookdate: bookdate,
      bookcartype: bookcartype,
      booktime: booktime,
      bookstoreid: bookstoreid
    })
    this.caletime()
  },
  caletime(){
    
 
      request({
        url: "http://carinspect.xgyvip.cn/api/home/store/getinterval",
        data:{
          storeid:this.data.bookstoreid,
          date:this.data.bookdate
        }
      }).then((result) => {

        let booktimenum= this.data.booktimelist;
        let booktimenumrelust= result.data;
        
        for (let index = 0; index < booktimenum.length; index++) {
          
        

        }


        console.log(booktimenum);
      console.log(result.data);
      })
   
  
    
  }
})







    //   request({
    //     url: "http://carinspect.xgyvip.cn/api/home/user/carList",
    //     data:{
    //       vipId: vipId,
    //       openid: user.openid
    //     }
    //   }).then((result) => {
    //    var cardetail=result.data.data;
    //      this.setData({
    //        cardetail
    //      })

    //   })

    //  console.log(options.id);