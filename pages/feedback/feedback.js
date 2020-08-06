// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemList: [],
    files: [],
    activeIndex: [],
    picture: [],
    catalogSelect: 0,
    string: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    commonFun.reqApi("/home/feedback/type", {}, "POST", function (res) {
      that.setData({
        problemList: res.data
      });
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
    manInput: function (e) {
      if (this.picture.length == 0) {
        commonFun.msg("请请等待图片上传完成");
      }

      var contact_man = e.detail.value;

      if (contact_man.length < 2) {
        commonFun.msg("请输入您的姓名");
      }
    },
    //form提交
    formSubmit: function (e) {
      var content = e.detail.value.post_content;
      var people = e.detail.value.contact_man;
      var phone = e.detail.value.contact_phone;
      var picture = this.picture;
      var types = this.activeIndex;

      if (types == "") {
        commonFun.msg("请选择类型");
        return false;
      }

      if (content == "") {
        commonFun.msg("请输入问题描述");
        return false;
      }

      if (picture == "") {
        commonFun.msg("请上传凭证");
        return false;
      }

      if (people == "" || people < 2) {
        commonFun.msg("请输入您的姓名");
        return false;
      }

      if (phone == "") {
        commonFun.msg("请输入联系电话");
        return false;
      }

      if (!/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(phone)) {
        commonFun.msg("手机号格式不正确");
        return false;
      } // 数组去重


      function distinct(arr) {
        var hash = [];

        for (var i = 0; i < arr.length; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
              ++i;
            }
          }

          hash.push(arr[i]);
        }

        return hash;
      } // 获取去重后的数组


      types = distinct(types);
      var data = {
        'post_content': content,
        'contact_man': people,
        'contact_phone': phone,
        'more': picture,
        "post_type": types
      };
      var that = this;
      commonFun.reqApi("/home/feedback/feedback", data, "POST", function (res) {
        if (res.code) {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '/pages/aboutus/aboutus'
              });
            }
          });
        } else {
          commonFun.msg(res.msg);
        }
      });
    },
    //上传图片
    chooseImage: function (e) {
      var that = this;

      if (that.files.length >= 3) {
        wx.showToast({
          title: '最多上传三张图片',
          duration: 2000
        });
        return;
      }

      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.files.concat(res.tempFilePaths)
          });

          if (res.tempFilePaths) {
            wx.showLoading({
              title: '上传中'
            });
            var level = 0;

            for (var i = 0, length = res.tempFilePaths.length; i < length; i++) {
              wx.uploadFile({
                url: commonFun.hostDomain + '/api/home/feedback/upload',
                filePath: res.tempFilePaths[i],
                name: 'file',
                success: function (res) {
                  res = JSON.parse(res.data);

                  if (res.code == 0) {
                    wx.hideLoading();
                    commonFun.msg(res.msg);
                    return;
                  }

                  if (that.picture.length == 0) {
                    that.setData({
                      picture: [res.data]
                    });
                  } else {
                    that.setData({
                      picture: that.picture.concat(res.data)
                    });
                  }

                  level++;

                  if (level == length) {
                    wx.hideLoading();
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success',
                      duration: 2000
                    });
                  }
                },
                fail: function (res) {
                  wx.hideLoading();
                  commonFun.msg('上传失败');
                }
              });
            }
          }
        }
      });
    },
    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id,
        // 当前显示图片的https链接
        urls: this.files // 需要预览的图片https链接列表

      });
    },
    // 删除图片
    deleteImage: function (e) {
      var files = this.files;
      var index = e.currentTarget.dataset.index;
      files.splice(index, 1);
      this.setData({
        files: files
      });
    },

    // 多选
    checkboxChange(e) {
      let string = "problemList[" + e.target.dataset.index + "].selected";
      this.setData({
        [string]: !this.problemList[e.target.dataset.index].selected
      });
      let detailValue = this.problemList.filter(it => it.selected).map(it => it.id);
      this.setData({
        activeIndex: detailValue
      });
    }

   
})