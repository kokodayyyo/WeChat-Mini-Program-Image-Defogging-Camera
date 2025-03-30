Page({
  jump1:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/Switch1/Switch1',
    })
  },
  jump2:function () {    
    //只能跳转非tabbar页面
    wx.navigateTo({
      url: '/pages/Switch2/Switch2',
    })
  },
  takephoto:function(){
    var self = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        self.setData({
            // picArray:res.tempFilePaths
            pic:res.tempFilePaths
        });
        wx.setStorageSync('img', res.tempFilePaths)
        console.log(res);
      }
    })
  },
})