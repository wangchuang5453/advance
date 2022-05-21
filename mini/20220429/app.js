// app.js
App({
  onLaunch: function () {
    const menuBottomObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight;
        let navTop = menuBottomObject.top;
        // 导航高度
        let navHeight = statusBarHeight + menuBottomObject.height + 
                        (menuBottomObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuBottomObject = menuBottomObject;
        console.log(navHeight, '==navHeight');
      },
      fail(err) {
        console.log(err);
      }
    });
  },
  globalData: {

  }
})
