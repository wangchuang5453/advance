// start.js
const CONFIG = require('../../config.js');
Page({
  data: {
    imgUrls: [],
    swiperCurrent: 0,
    swiperMaxNumber: 4,
  },
  onLoad: function() {
    const app_show_pic_version = wx.getStorageSync('app_show_pic_version');
    if (app_show_pic_version && app_show_pic_version == CONFIG.version) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    } else {
      this.setData({
        imgUrls: [
          '/images/banner/1.jpeg',
          '/images/banner/2.jpeg',
          '/images/banner/3.jpeg',
          '/images/banner/4.jpeg',
        ],
      });
    }
  },
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
    });
  },
  goToIndex: function() {
    wx.setStorage({
      key: 'app_show_pic_version',
      data: CONFIG.version,
    })
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
})