// pages/Switch1/Switch1.js
Page({
  data: {

  },
  jump1:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/SetStyle/SetStyle',
    })
  },
  jump2:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/HSetStyle/HSetStyle',
    })
  },
})