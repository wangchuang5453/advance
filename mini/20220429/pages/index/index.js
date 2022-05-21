// index.js

const APP = getApp();

Page({
  data: {
    
  },
  onShow: function () {
    this.setData({
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
    })
  },
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
