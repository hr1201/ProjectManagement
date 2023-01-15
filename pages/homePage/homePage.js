// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homePage_img: '/images/homePage(1).png',
    homePage_color:"green",
    ranking_img:'/images/ranking.png',
    ranking_color:"black",
    my_img:'/images/my.png',
    my_color:"black",
  },
  addAnswer:function(){
    //点击添加文章触发
    wx.showActionSheet({
      itemList: ['填写今日','发布数据','查看动态'],
      success:function(res){//点击其中任一项触发success
        if(res.tapIndex==0){//填写今日
          wx.navigateTo({
            url: '/pages/fillToday/fillToday',
          })
        }
        else if(res.tapIndex==1){//发布数据
          wx.navigateTo({
            url: '/pages/testData/testData',
          })
        }
        else if(res.tapIndex==2){//查看动态
          wx.navigateTo({
            url: '/pages/viewDynamic/viewDynamic',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})