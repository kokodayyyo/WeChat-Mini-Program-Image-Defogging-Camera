// pages/Switch2/Switch2.js
Page({
  data: {

  },
  jump1:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/setDetail/setDetail',
    })
  },
  jump2:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/HsetDetail/HsetDetail',
    })
  },
})