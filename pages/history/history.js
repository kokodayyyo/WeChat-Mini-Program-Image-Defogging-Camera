Page({
  data: {
    pictures: []
  },
  chooseImg: function() {
    var that = this;
    console.log(1);
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pictures: res.tempFilePaths
        })
        wx.setStorageSync('image', res.tempFilePaths)
      }
    })
  },

   previewImage: function (e) {
    console.log(e);
    var current = e.currentTarget.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.pictures, // 需要预览的图片http链接列表
    })
  },
})


