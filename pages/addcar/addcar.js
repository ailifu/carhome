// pages/addcar/addcar.js
var util = require('../../utils/util.js')
import { request } from "../../request/index.js"
import  WxValidate from "../../utils/WxValidate"
var date = new Date();
var newdate = util.formatTime(date);

const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    plate_num: '',
    register_date:newdate,
    carvin: '',
    vehicle_type: '小型轿车',
    car_linkname: '',
    ownerphone: '',
    image_path: '../../images/cartips.png',
    vehicle_type_array: ['小型轿车', '中型轿车', '大型轿车', '小型普通客车', '小型越野客车', '小型专用客车', '微型普通客车', '微型越野客车', '其他年辆']
  }, onLoad(){
  
    this.initValidate()//验证规则函数
    },
    showModal(error) {
        wx.showModal({
          content: error.msg,
          showCancel: false,
        })
      },
    //验证函数
    initValidate() {
        const rules = {
          car_linkname: {
            required: true,
            minlength:4
          },  plate_num: {
            required: true,
            minlength:6
          },carvin:{
            required:true,
            rangelength: [6, 17]
          },register_date:{
            required:true,
            dateISO:true
          },
          vehicle_type:{
            required:true,
          },ownerphone:{
            required:true,
            tel:true
          }
        }
        const messages = {
          car_linkname: {
            required: '请填写姓名',
            
          },
          plate_num: {
            required: '请填写车牌号',
            
          },
          ownerphone:{
            required:'请填写手机号',
            tel:'请填写正确的手机号'
          },
          register_date:{
            tel:'请填写正确的日期'
          },
          carvin:{
            required:'请填写识别码',
            tel:'请填写正确的识别码'
          }
        }
        this.WxValidate = new WxValidate(rules, messages)
      },
    //调用验证函数
     formSubmit: function(e) {
        console.log('form发生了submit事件，携带的数据为：', e.detail.value)
        const params = e.detail.value;
        var that=this;
        //校验表单
        if (!this.WxValidate.checkForm(params)) {
          const error = this.WxValidate.errorList[0]
          this.showModal(error)
          return false
        }else{
          let vipId=wx.getStorageSync('vipId');
          let user=wx.getStorageSync('user');
          // console.log(user.openid)
      
          request({
            url: "http://carinspect.xgyvip.cn/api/home/user/addcar",
            method: "POST",
            data: {
              vipId: vipId,
              openid: user.openid,
              car_no: this.data.plate_num,
              car_vin: this.data.carvin,
              car_cate: this.data.vehicle_type,
              car_regtime: this.data.register_date,
              car_linkname:this.data.car_linkname,
              car_mobile: this.data.ownerphone
    
            },
          }).then((result) => {
            console.log(result.data);
            if(result.data.code===1){
              wx.showToast({
                title: '操作成功！', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
            }else if(result.data.code===0){
              wx.showToast({
                title: '车牌重复！', // 标题
                icon: 'none',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
            }else{
              wx.showToast({
                title: '提交失败！', // 标题
                icon: 'none',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
            }
    
          })
    
        }
       
      },
    driverSuccess: function (e) {
      this.setData({
        plate_num: e.detail.plate_num.text,
        register_date: e.detail.register_date.text,
        carvin: e.detail.vin.text,
        car_linkname: e.detail.vin.text,
        vehicle_type: e.detail.vehicle_type.text,
        image_path: e.detail.image_path,
        owner: e.detail.owner.text,
      })

    }, simmitcar() {
    
    }, handlecarnum(e) {
      console.log(e);
      // let reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
      // const careg = reg.test(that.data.carNum);
      // if (!careg) {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '请输入正确车牌号',
      //   })
      //   return;
      // }
    }
  })