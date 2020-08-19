// pages/caredit/caredit.js
var util = require('../../utils/util.js');
import { request } from '../../request/index.js';
import WxValidate from '../../utils/WxValidate';
Page({
  data: {
    car_cate: '',
    car_linkname: '',
    car_mobile: '',
    car_no: '',
    car_regtime: '',
    car_vin: '',
    caiId: '',
    codename: '发送验证码',
    disabled: false,
    currentTime: 60,
    vehicle_type_array: [
      '小型轿车',
      '中型轿车',
      '大型轿车',
      '小型普通客车',
      '小型越野客车',
      '小型专用客车',
      '微型普通客车',
      '微型越野客车',
      '其他年辆',
    ],
    index: 0,
  },
  onLoad: function (options) {
    this.setData({
      caiId: options.id,
    });
    this.getCarDetail();
    this.initValidate(); //验证规则函数
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    });
  }, //验证函数
  initValidate() {
    const rules = {
      car_linkname: {
        required: true,
        minlength: 2,
      },
      car_no: {
        required: true,
        minlength: 6,
      },
      car_vin: {
        required: true,
        rangelength: [6, 17],
      },
      car_regtime: {
        required: true,
        dateISO: true,
      },
      car_cate: {
        required: true,
      },
      car_mobile: {
        required: true,
        tel: true,
      },
      code: {
        required: true,
        minlength: 4,
      },
    };
    const messages = {
      car_linkname: {
        required: '请填写姓名',
      },
      car_no: {
        required: '请填写车牌号',
      },
      car_mobile: {
        required: '请填写手机号',
        tel: '请填写正确的手机号',
      },
      car_regtime: {
        tel: '请填写正确的日期',
      },
      car_vin: {
        required: '请填写识别码',
        tel: '请填写正确的识别码',
      },
      code: {
        required: '请填写验证码',
      },
    };
    this.WxValidate = new WxValidate(rules, messages);
  },
  getCarDetail() {
    request({
      url: 'https://carinspect.xgyvip.cn/api/home/user/carinfo',
      data: {
        id: this.data.caiId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      method: 'POST',
    }).then((result) => {
      let {
        car_cate,
        car_linkname,
        car_mobile,
        car_no,
        car_regtime,
        car_vin,
      } = result.data.data;
      this.setData({
        car_cate,
        car_linkname,
        car_mobile,
        car_no,
        car_regtime,
        car_vin,
      });
    });
  },
  getPhone(e) {
    /**保存手机号获取验证码 */
    let car_mobile = e.detail.value;
    this.setData({
      car_mobile,
    });
  },
  getyzmfun() {
    var _this = this;
    if (_this.data.car_mobile === '') {
      wx.showToast({
        title: '请输入手机号',
        mask: true,
        icon: 'none',
      });
    } else if (!/^1[3456789]\d{9}$/.test(_this.data.car_mobile)) {
      wx.showToast({
        title: '请输入正确手机号',
        mask: true,
        icon: 'none',
      });
    } else {
      request({
        url: 'https://carinspect.xgyvip.cn/api/home/user/getCode',
        method: 'GET',
        data: {
          mobile: _this.data.car_mobile,
        },
      }).then((result) => {
        _this.setData({
          disabled: true,
        });
        var num = 61;
        var timer = setInterval(function () {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            _this.setData({
              codename: '重新发送',
              disabled: false,
            });
          } else {
            _this.setData({
              codename: num + 's'
            });
          }
        }, 1000);
      
      });
    }
  },
  formSubmit: function (e) {
    let thatis = this;
    const params = e.detail.value;

    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      console.log(this.WxValidate);
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    } else {
      let vipId = wx.getStorageSync('vipId');
      let openid = wx.getStorageSync('openid');
      console.log(thatis.data.car_cate);
      request({
        url: 'https://carinspect.xgyvip.cn/api/home/user/modifyCar',
        method: 'POST',
        data: {
          id:thatis.data.caiId,
          vipId: vipId,
          openid: openid,
          car_no: e.detail.value.car_no,
          car_vin: e.detail.value.car_vin,
          car_cate: thatis.data.car_cate,
          car_regtime: e.detail.value.car_regtime,
          car_linkname: e.detail.value.car_linkname,
          car_mobile: e.detail.value.car_mobile,
          code: e.detail.value.code,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        method: 'POST',
      }).then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          wx.showToast({
            title:result.data.msg,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            
          });
            
        } else {
          wx.showModal({
            title: '修改成功',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.navigateBack({
                  delta: 1,
                });
              }
            },
          });
        }
      });

     /// console.log('form发生了submit事件，携带的数据为：', e.detail.value);
    }
  },
  bindPickerCartype(e) {
    let carType = this.data.vehicle_type_array;
    this.setData({
      car_cate: carType[e.detail.value],
    });
  },
  bindDateChange(e) {
    this.setData({
      car_regtime: e.detail.value,
    });
  },
});
