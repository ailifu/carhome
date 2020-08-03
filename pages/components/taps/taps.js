// pages/components/taps.js

var util = require('../../../utils/util.js')
 
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
  const year1 = date.getFullYear()
const month1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
const day1 = date.getDate()+1
var newdate=year1+'-'+month1+'-'+day1
var newdate2=year1+'-'+month1+'-'+day1
 var datetips='明天'
}else{
  var newindex=0
}
 
Component({
  /**
   * 组件的属性列表
   */


  /**
   * 组件的初始数据
   */
  data: {
    objectArray: [
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
        id:12,
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
    index: newindex,
    dates: newdate,
    dates2: newdate2,
    datetips: datetips,
    cartype:0,
  },
  properties: {
    //选项卡传值切换，接受父组件的值
    tabs: { type: Array, value: '' },
  
  },onReady: function () {
    //  页面初次渲染完成后，使用选择器选择组件实例节点，返回匹配到组件实例对象  
 
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabsselect(e) {
      
      let tabsnew = e.currentTarget.dataset.tabsid;
      this.setData({
        cartype: tabsnew 
      })
      this.triggerEvent("tabsselect", tabsnew)

    }, appointmentfunc() {
    //  console.log(newdate,'---------------',this.data.dates);
      if(newdate===this.data.dates){
        
      let info = encodeURIComponent(this.data.dates);
           wx.navigateTo({
        url: '../list/list'+'?date='+info+'&time='+this.data.index+'&cartype='+this.data.cartype,
      })
        
        //console.log('选择日期比当前时期一样');
           
      }else if(newdate>this.data.dates){
          console.log('选择日期比当前时期小');
      }
  
    },

    //  点击日期组件确定事件  
    bindDateChange: function (e) {
        // console.log(e.detail.value, newdate, '222')
      let start_date = new Date(newdate.replace(/-/g, "/")); //格式化今日世界
      let end_date = new Date(e.detail.value.replace(/-/g, "/"));//格式化选择时间
      //   var end_date = new Date(endTime.replace(/-/g, "/"));

      let ms = end_date.getTime() - start_date.getTime(); //俩个时间相减
      //转换成天数
      let day = parseInt(ms / (1000 * 60 * 60 * 24));//将ms计算成天数
      // 
    
      if (day === 0) {
        day = "今天"
      } else if (day === 1 || newdate) {
        day = "明天"
      } else {
        day = day + '天后'
      }
    
    // console.log("day = ", day);
    
      this.setData({
        dates: e.detail.value,
        datetips: day
      })
      // console.log(newdate,'---------------',this.data.dates);
    },
    //  点击时间确定事件  
    bindPickerChange: function (e) {
    //  if(newdate===this.data.dates){}
      //console.log(e.detail.value, '111')
      this.setData({
        index: e.detail.value
      })
    },

  }
})
