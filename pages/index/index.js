// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  jump0:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/Introduction/Introduction',
    })
  },
  jump1:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/SingleDehaze/SingleDehaze',
    })
  },
  jump2:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/ImageEnhance/ImageEnhance',
    })
  },
  jump3:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/TemplateShow/TemplateShow',
    })
  },
})
