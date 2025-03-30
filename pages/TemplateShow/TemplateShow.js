// pages/TemplateShow/TemplateShow.js
import {Base64} from '../../utils/base64';
Page({
  data: {
    completed:"请输入暂存空间密码",
    Code_value:"",
  },
  onLoad: function (options) {
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
  
  putStorage1: function(){
    var mima = wx.getStorageSync("Decode")
    wx.request({
      url: 'http://49.235.112.59:5000/Template1',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      data: {
        　Decode: mima,
      },
      dataType:'string',
      success:res=>{
        console.log(res,'获取暂存图片')      
      },
    })
    const z = this
      z.setData({
        SW1: 1
    })
  },
  putStorage2: function(){
    var mima = wx.getStorageSync("Decode")
    wx.request({
      url: 'http://49.235.112.59:5000/Template2',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      data: {
        　Decode: mima,
      },
      dataType:'string',
      success:res=>{
        console.log(res,'获取暂存图片')      
      },
    })
    const z = this
      z.setData({
        SW2: 1
    })
  },
  putStorage3: function(){
    var mima = wx.getStorageSync("Decode")
    wx.request({
      url: 'http://49.235.112.59:5000/Template3',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      data: {
        　Decode: mima,
      },
      dataType:'string',
      success:res=>{
        console.log(res,'获取暂存图片')      
      },
    })
    const z = this
      z.setData({
        SW3: 1
    })
  },
  putStorage4: function(){
    var mima = wx.getStorageSync("Decode")
    wx.request({
      url: 'http://49.235.112.59:5000/Template4',
      method: "POST",
      header: {
        　'content-type': "application/x-www-form-urlencoded",
      },
      data: {
        　Decode: mima,
      },
      dataType:'string',
      success:res=>{
        console.log(res,'获取暂存图片')      
      },
    })
    const z = this
      z.setData({
        SW4: 1
    })
  },

  getCode1() {   //从后端获取处理后的图片
    var self = this;
    var mima = wx.getStorageSync("Decode")
      wx.request({
        url: 'http://49.235.112.59:5000/Template1',
        method: "GET",
        header: {
          　'content-type': "application/x-www-form-urlencoded",
        },
        data: {
          　Decode: mima,
        },
        dataType:'string',
        responseType: 'arraybuffer',//设置返回的数据格式为arraybuffer
        success:res=>{
          let url =wx.arrayBufferToBase64(res.data)
          console.log(res,'flask返回图片')
          var base64Image = url // 后台返回的base64数据
          var imgData = base64Image.replace(/[\r\n]/g,"") // 将回车换行换为空字符''
          let decodeStr = Base64.decode(imgData);//解码
          console.log(decodeStr);
          this.setData({
            IMG1:decodeStr
          });
          wx.setStorageSync('image3', decodeStr)//将编码设置到本地内存供下方 SaveBase64函数使用
          return decodeStr;
        },
        fail (err) {
          wx.showModal({
              content: '空存档位'
          })
        }
      })
   },
  getCode2() {   //从后端获取处理后的图片
    var self = this;
      wx.request({
        url: 'http://49.235.112.59:5000/Template2',
        method: "GET",
        header: {
          　'content-type': "application/x-www-form-urlencoded",
        },
        responseType: 'arraybuffer',//设置返回的数据格式为arraybuffer
        success:res=>{
          let url =wx.arrayBufferToBase64(res.data)
          console.log(res,'flask返回图片')
          var base64Image = url // 后台返回的base64数据
          var imgData = base64Image.replace(/[\r\n]/g,"") // 将回车换行换为空字符''
          let decodeStr = Base64.decode(imgData);//解码
          console.log(decodeStr);
          this.setData({
            IMG2:decodeStr
          });
          wx.setStorageSync('image3', decodeStr)//将编码设置到本地内存供下方 SaveBase64函数使用
          return decodeStr;
        },
      })
   },
  getCode3() {   //从后端获取处理后的图片
    var self = this;
      wx.request({
        url: 'http://49.235.112.59:5000/Template3',
        method: "GET",
        header: {
          　'content-type': "application/x-www-form-urlencoded",
        },
        responseType: 'arraybuffer',//设置返回的数据格式为arraybuffer
        success:res=>{
          let url =wx.arrayBufferToBase64(res.data)
          console.log(res,'flask返回图片')
          var base64Image = url // 后台返回的base64数据
          var imgData = base64Image.replace(/[\r\n]/g,"") // 将回车换行换为空字符''
          let decodeStr = Base64.decode(imgData);//解码
          console.log(decodeStr);
          this.setData({
            IMG3:decodeStr
          });
          wx.setStorageSync('image3', decodeStr)//将编码设置到本地内存供下方 SaveBase64函数使用
          return decodeStr;
        },
      })
   },
  getCode4() {   //从后端获取处理后的图片
    var self = this;
      wx.request({
        url: 'http://49.235.112.59:5000/Template4',
        method: "GET",
        header: {
          　'content-type': "application/x-www-form-urlencoded",
        },
        responseType: 'arraybuffer',//设置返回的数据格式为arraybuffer
        success:res=>{
          let url =wx.arrayBufferToBase64(res.data)
          console.log(res,'flask返回图片')
          var base64Image = url // 后台返回的base64数据
          var imgData = base64Image.replace(/[\r\n]/g,"") // 将回车换行换为空字符''
          let decodeStr = Base64.decode(imgData);//解码
          console.log(decodeStr);
          this.setData({
            IMG4:decodeStr
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
})