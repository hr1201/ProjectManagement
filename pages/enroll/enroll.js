const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
     //是否为密码框
     passwordType:true,
     // 是否显示密码
     show_pass:false,
  },
  
  onLoad() {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  seeTap:function(data){
    // 经常会在接口的sucess函数里边重置data{}数据，但是直接this.setData是不行的；须写成var that=this;
    var that = this; 
    that.setData({
      // 切换图标
      show_pass:!that.data.show_pass,
      // 切换是否密码框
      passwordType:!that.data.passwordType,
    })
  }
})
