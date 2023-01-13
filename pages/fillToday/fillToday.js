// pages/fillToday/fillToday.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    detailTomorrow:"",
    detailTime:"",
  },
  bindTextArea:function(e){
    // console.log(e.detail.value),//获取到文本输入框的值
    this.data.detail=e.detail.value
    // console.log(this.data.detail)//检查是否获取到值
  },
  bindTomorrow:function(e){
    // console.log(e.detail.value),
    this.data.detailTomorrow=e.detail.value
    // console.log(this.data.detailTomorrow)
  },
  bindTime:function(e){
    console.log(e.detail.value),
    this.data.detailTime=e.detail.value
    console.log(this.data.detailTime)
  },

  save:function(e){
    var that=this //由于要访问detail需要用到this，防止被修改，保存至that中

    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.detail)//任务完成描述的数据
    console.log(that.data.detailTomorrow)//明日计划任务的数据
    console.log(that.data.detailTime)//计划打卡时间的数据

    // 与服务器交互
    setTimeout(function(){
      wx.hideLoading()
    },1000)
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