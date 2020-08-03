// pages/mycar/mycar.js
import { request } from "../../request/index.js"
import { navigation } from '../../utils/navigation'
Page({

  data: {
    plate_num:'鲁k 58245',
    register_date:'2015-02-02',
    carvin:'11212121',
    vehicle_type:'小型轿车',
    owner:'王娇'
  }, getcatitems() {
    request({
      url: "http://carinspect.xgyvip.cn/api/home/store/lists?page=" + this.data.page + "&pagesize=10"
    }).then((result) => {
      this.setData({
        data: newadata
      })

    })
  },

  onLoad: function (options) {

  }, clicktwo(){
    console.log('2');
  },clickone(){
    var params = {
        params1 :"1",
        params2 : "20"
    };
    console.log(params); 
    navigation.navigateTo("/pages/book/book", params);
  }


})