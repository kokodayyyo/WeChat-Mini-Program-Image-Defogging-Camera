
const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js')
const Helper = require('../../utils/weImageFilters/weImageFiltersHelper.js')


let helper = new Helper({
  canvasId: 'hehe',
  width:960,
  height:540
})

const filters = {
    original: function (data) {
        return data
    },
    HSLAdjustment: function (data) {
      // ImageFilters.HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)
      // hueDelta: 0~180
      // satDelta, lightness: 0~100
      var zhi1 = wx.getStorageSync("Baohedu");
      var zhi2 = wx.getStorageSync("Liangdu");
      var zhi3 = wx.getStorageSync("SeXiang");
      return ImageFilters.HSLAdjustment(data, zhi3, zhi1, zhi2)
  },
}

const keys = Object.keys(filters)

Page({
    data: {
      saturate: 0,
      brightness: 0,
      contrast: 1,
        selected: 0,
        array: [],
        index: 0,
        gap: 0,
        i:0
    },
    jump1:function () {    
      //只能跳转非tabbar页面
      wx.navigateTo({
        url: '/pages/43setDetail/43setDetail',
      })
    },
    baohedu: function (e) {
      var self = this;
      self.setData({
        saturate: e.detail.value
      });
      wx.setStorageSync("Baohedu", e.detail.value);//将滑动条数据传递到storage中，通过上面函数中的获取函数获得新的数据
    },
    liangdu: function (e) {
      var self = this;
      self.setData({
        brightness: e.detail.value
      });
      wx.setStorageSync("Liangdu", e.detail.value);
    },
    SeXiang: function (e) {
      var self = this;
      self.setData({
        contrast: e.detail.value
      });
      wx.setStorageSync("SeXiang", e.detail.value);
    },
    onLoad: function (options) {
        this.setData({
            array: keys
        })
    },  
    bindPickerChange(e) {
        const z = this
        let index = e.detail.value
        this.setData({
            index
        })
    wx.showLoading({
            title: '正在加载...',
            mask: true
        })
        let startTime = (new Date()).getTime()
        let imageData = helper.createImageData()
        let filtered = filters[keys[index]](imageData)
        
        helper.putImageData(filtered, () => {
            wx.hideLoading()

            let endTime = (new Date()).getTime()
            let gap = (endTime - startTime)

            z.setData({
                gap
            })
        })
    },


    choose() {
        const z = this
        wx.chooseImage({
          count: 1,
            success: function (res) {
                if (res.tempFilePaths.length) {
                    let path = res.tempFilePaths[0]
                    
                    helper.initCanvas(path, () => {
                        z.setData({
                            selected: 1
                        })
                    })
                }
            },
        })
    },
    LoadingImage0: function () {
      const z = this
      var StorageData = wx.getStorageSync("img")
      console.log(StorageData)
      let path = StorageData[0]
      helper.initCanvas(path, () => {
        z.setData({
            selected: 1
        })
    })
  },
    LoadingImage1: function () {
      const z = this
      var StorageData = wx.getStorageSync("image")
      console.log(StorageData)
      let path = StorageData[0]
      helper.initCanvas(path, () => {
        z.setData({
            selected: 1
        })
    })
  },
    LoadingImage2: function () {
      const z = this
      var StorageData = wx.getStorageSync("image")
      console.log(StorageData)
      let path = StorageData[1]
      helper.initCanvas(path, () => {
        z.setData({
            selected: 1
        })
    })
  },
    LoadingImage3: function () {
    const z = this
    var StorageData = wx.getStorageSync("image")
    console.log(StorageData)
    let path = StorageData[2]
    helper.initCanvas(path, () => {
      z.setData({
          selected: 1
      })
  })
  },
    LoadingImage4: function () {
    const z = this
    var StorageData = wx.getStorageSync("image")
    console.log(StorageData)
    let path = StorageData[3]
    helper.initCanvas(path, () => {
      z.setData({
          selected: 1
      })
  })
  },
    LoadingImage5: function () {
    const z = this
    var StorageData = wx.getStorageSync("image")
    console.log(StorageData)
    let path = StorageData[4]
    helper.initCanvas(path, () => {
      z.setData({
          selected: 1
      })
  })
  },
    LoadingImage6: function () {
    const z = this
    var StorageData = wx.getStorageSync("image")
    console.log(StorageData)
    let path = StorageData[5]
    helper.initCanvas(path, () => {
      z.setData({
          selected: 1
      })
  })
  },
    LoadingImage7: function () {
  const z = this
  var StorageData = wx.getStorageSync("image")
  console.log(StorageData)
  let path = StorageData[6]
  helper.initCanvas(path, () => {
    z.setData({
        selected: 1
    })
})
  },
    LoadingImage8: function () {
  const z = this
  var StorageData = wx.getStorageSync("image")
  console.log(StorageData)
  let path = StorageData[7]
  helper.initCanvas(path, () => {
    z.setData({
        selected: 1
    })
})
  },
    LoadingImage9: function () {
  const z = this
  var StorageData = wx.getStorageSync("image")
  console.log(StorageData)
  let path = StorageData[8]
  helper.initCanvas(path, () => {
    z.setData({
        selected: 1
    })
})
  },

  save() {
    helper.getImageTempFilePath(tempFilePath => {
        // 保存到相册
        wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: res => {
                wx.showToast({
                    title: '保存成功',
                })
            }
        })
    })
},


    
})