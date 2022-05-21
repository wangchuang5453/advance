// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['haha', '哈哈'],
    inputVal: '',
  },
  onClose: function (e) {
    const idx = e.currentTarget.dataset.idx;
    console.log(idx, '=== onclose idx');
    const searchHis = this.data.list;
    searchHis.splice(idx, 1);
    this.setData({
      list: searchHis,
    });
  },
  go: function (e) {
    const idx = e.currentTarget.dataset.idx;
    const keywords = this.data.list[idx];
    console.log(keywords, '===go');
    wx.redirectTo({
      url: '/pages/goods/list?name=' + keywords,
    })
  },
  searchscan: function () {
    wx.scanCode({
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success: function (res) {
        console.log(res, '=== scan');
        wx.redirectTo({
          url: '/pages/goods/list?name=' + res.result,
        })
      }
    })
  },
  search: function (e) {
    // 省略历史搜索数据处理逻辑
    console.log(e.detail, '===search detail');
    this.setData({
      inputVal: e.detail,
    });
    wx.redirectTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  },
})