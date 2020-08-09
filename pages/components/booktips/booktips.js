// pages/components/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabsselect(e){
      console.log(e);
      
      let active=e.target.dataset.tabsid;
      this.setData({
        active
      })
    }
  }
})
