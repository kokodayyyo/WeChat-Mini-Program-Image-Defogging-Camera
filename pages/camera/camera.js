// pages/camera/camera.js
Page({
  takePhoto(){
  
  },
  takePhoto(){
    const ctx = wx.createCameraContext()
  },
  takePhoto(){
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  
  saveToPhone() {
    wx.getImageInfo({
      src: this.data.src,
      success: function (res) {
        var path = res.path;
        //保存图片到本地
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: function () {
            wx.showToast({
              title: '保存成功'
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      }
    })
       }
})