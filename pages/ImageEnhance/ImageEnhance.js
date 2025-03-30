// pages/ImageEnhance/ImageEnhance.js
import {Base64} from '../../utils/base64';
Page({
  data: {
    pictures: [],
    picurl: "/static/0001.png",
    codeImg: '',
    completed:"请输入暂存空间密码",
    Code_value:"",
    showView: true
  },
  chooseImg: function() {  //选择图片并发送到后端
    var that = this;
    console.log(1);
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pictures: res.tempFilePaths
        })
        wx.setStorageSync('SingleDehaze', res.tempFilePaths)
        var team_image = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64") //将图片进行base64编码。
        wx.request({
          　url: 'http://49.235.112.59:5000/one', //API地址
          　method: "POST",
          　header: {
          　'content-type': "application/x-www-form-urlencoded",
          　},
          　data: {
          　image: team_image,
          　},
           dataType:'string',
          　success: function (reg) {
          　console.log(reg)
          　}
          　})
      }
    })
  },
  getCode() {   //从后端获取处理后的图片
    var self = this;
      wx.request({
        url: 'http://49.235.112.59:5000/two',
        method: "GET",
        header: {
          　'content-type': "application/x-www-form-urlencoded",
        },
        responseType: 'arraybuffer',//设置返回的数据格式为arraybuffer
        success:res=>{
          // let url ='data:image/png;base64,'+wx.arrayBufferToBase64(res.data)
          let url =wx.arrayBufferToBase64(res.data)
          console.log(res,'flask返回图片')
          var base64Image = url // 后台返回的base64数据
          var imgData = base64Image.replace(/[\r\n]/g,"") // 将回车换行换为空字符''
          let decodeStr = Base64.decode(imgData);//解码
          console.log(decodeStr);
          this.setData({
            IMG:decodeStr
          });
          wx.setStorageSync('image3', decodeStr)//将编码设置到本地内存供下方 SaveBase64函数使用
          return decodeStr;
        },
      })
   },
   
   SaveBase64: function(){  //保存base64图片
    var imgSrc = wx.getStorageSync("image3");//base64编码 从本地内存获取
    console.log(imgSrc)
    var save = wx.getFileSystemManager();//获取文件管理器对象
    var number = Math.random();
    save.writeFile({   //写文件
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.jpg',
      data: imgSrc,
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.jpg',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        console.log(res)
      }, fail: err => {
        console.log(err)
      }
    })
   },
  STemplate: function(){
    wx.request({
      url: 'http://49.235.112.59:5000/New',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      responseType: 'arraybuffer',
      success:res=>{
        console.log(res,'后端已处理图片')      
      },
    })
  },
  DealImg5: function(){ //发送指令调用暗通道先验处理图片
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000//持续的时间
    })
    wx.request({
      url: 'http://49.235.112.59:5000/seven',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      responseType: 'arraybuffer',
      success:res=>{
        console.log(res,'后端已处理图片')      
      },
      fail (err) {
            wx.showModal({
                content: '未连接到服务器'
            })
      }
    })
  },
  DealImg6: function(){ //发送指令调BCCR处理图片
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000//持续的时间
    })
    wx.request({
      url: 'http://49.235.112.59:5000/eight',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      responseType: 'arraybuffer',
      success:res=>{
        console.log(res,'后端已处理图片')      
      },
      fail (err) {
        wx.showModal({
            content: '未连接到服务器'
        })
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
  onLoad1: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  }, 
  getNumber(){ //创建空间并获取密码
    var that = this;
    wx.request({
      url: 'http://49.235.112.59:5000/NewFolder',
      method: "GET",
      header: {
        　'content-type': "application/json",
      },
      responseType: 'text',
      success:res=>{
        console.log(res.data)
        wx.setStorageSync('Secret', res.data)
      }
    })
    that.setData({
      showView: (!that.data.showView)
    })
   },
   New: function(){ 
    var mima = wx.getStorageSync("Secret");//获取本地密码
    mima=mima.toString();//转化为字符串
    wx.showModal({
      title: '这是你的暂存空间密码',
      content: mima,
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
    const z = this
      z.setData({
        SW: 1  //点击显示密码后隐藏创建空间按钮
    })
  },
  onLoad2: function (options) {
    console.log("completed="+this.data.completed);
  },
 
  /**
   * 键盘输入时触发的事件  在这里实时获取输入的内容
   */
  Open: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      Code_value: res.detail.value,//赋值给Code_value
    })
    wx.setStorageSync('Decode', res.detail.value)
  },
  
  putStorage: function(){
    var mima = wx.getStorageSync("Decode")
    wx.request({
      url: 'http://49.235.112.59:5000/New',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      data: {
        　Decode: mima,
      },
      dataType:'string',
      success:res=>{
        console.log(res,'暂存图片')      
      },
      fail (err) {
        wx.showModal({
            content: '该暂存空间创建失败或已被清理'
        })
      }
    })
  },
})