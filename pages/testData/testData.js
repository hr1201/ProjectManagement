// pages/testData/testData.js
Page({
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    items: [
      {value: 'RM组', name: 'RM组', checked: 'true'},
      {value: 'RC组', name: 'RC组'},
      {value: '项目组', name: '项目组'},
      {value: '其他', name: '其他'},
    ]
  },
  // 单选按钮监听
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },

  //文本输入框监听 
  bindTextArea:function(e){
    console.log(e.detail.value),//获取到文本输入框的值
    this.data.detail=e.detail.value
    console.log(this.data.detail)//检查是否获取到值
  },

  // 上传照片监听
  uploadHeadImg: function() {
    let a = this;
    wx.showActionSheet({
        itemList: [ "从相册中选择", "拍照" ],
        itemColor: "#0ccb82",
        success: function(e) {
          //album:相册   //camera拍照
          e.cancel || (0 == e.tapIndex ? a.chooseWxImageShop("album") : 1 == e.tapIndex && a.chooseWxImageShop("camera"));
        }
    });
  },
  //a：选择的类型  //album:相册   //camera拍照
  chooseWxImageShop: function(a) {
    var e = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],//可以选择照片或视频
      sourceType: ['album', 'camera'],//可以相册选择和相机拍摄
      maxDuration: 30,//最大拍摄时长
      camera: 'back',//后置摄像头
      success(res) {
        console.log(res.tempFiles.tempFilePath)
        console.log(res.tempFiles.size)
        if(a.tempFiles[0].size> 2097152){
          wx.showModal({
              title: "提示",
              content: "选择的图片过大，请上传不超过2M的图片",
              showCancel: !1,
              success: function(a) {
                  a.confirm;
              }
          })
        }else{
            //把图片上传到服务器
            e.upload_file(a.tempFilePaths[0])
        }
      }
    })
  },
  // 把图片上传到服务器，后端
  upload_file: function(e) {
    wx.showLoading({
      title: "上传中"
    });
    wx.uploadFile({
        url:url,
        filePath: e,//图片路径
        name: "user_avatar",
        formData: {
          token: a.globalData.token,
          user_avatar: "filePath"
        },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function(a) {
          wx.hideLoading();
          wx.showToast({
              title: "上传成功",
              icon: "success",
              duration: 3000
          });
        },
        fail: function(a) {
          wx.hideLoading();
          wx.showToast({
              title: "上传失败",
              icon: "none",
              duration: 3000
          });
        }
    });
  },
})