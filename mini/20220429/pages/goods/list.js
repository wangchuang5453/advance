// pages/goods/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType: 1, // 1为1个商品一行，2为2个商品一行  
    name: '',
    orderBy: '',
    categoryId: '',
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      categoryId: options.categoryId,
    })
    this.search();
  },

  filter: function () {
    
  },
  changeShowType: function () {
    
  },
  search: function () {
    // wx.showLoading({
    //   title: '加载中',
    // });
    // wx.showToast({
    //   title: '已售罄',
    // })
  }
})