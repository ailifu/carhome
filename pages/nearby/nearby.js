import { request } from "../../request/index.js"
let selflatitude = wx.getStorageSync('latitude');
let selflongitude = wx.getStorageSync('longitude');
Page({
  data: {
    page:1,
    selflatitude: selflatitude,
    selflongitude: selflongitude,
    markers: [{
      iconPath: "../../images/localtion.png",
      id: 0,
      latitude:37.19397,
      longitude:122.0581,
      width: 50,
      height: 50
    },{
      iconPath: "../../images/localtion.png",
      id: 2,
      latitude:37.18,
      longitude:122.07,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        latitude:37.19397,
        longitude:122.0581,
      }, {
        latitude:37.19397,
        longitude:122.0581,
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../images/myicon.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },datalist:[],
  onLoad: function (options) {
    console.log(this.data);
    this.getcatitems();
  }
  ,getcatitems() {
    request({
      url: "https://carinspect.xgyvip.cn/api/home/store/lists?page=" + this.data.page + "&pagesize=10"
    }).then((result) => {    
     this.datalist = result.data;
    //  console.log(result.data.data,'888');
     var obj = {};
     var arr=[];
     for (var i = 0; i <result.data.data.length; i++) {
      var obj = {};
      obj.id = i;
       obj.iconPath= "../../images/localtion.png";
      obj.width =50;
      obj.height =50;
      obj.latitude=result.data.data[i].lat;
      obj.longitude= result.data.data[i].lng;
     
      arr.push(obj);
      } 
      console.log(arr);
      this.setData({
        markers:arr
 
      })
     // console.log(this.data.markers,'-----------');
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  }
})