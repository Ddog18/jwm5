// pages/curriculum/curriculum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kc_list: [],
    url: getApp().globalData.url,
    imgUrl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //跳转详情
  curriculum_content: function(data) {
    var id = data.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/curriculum_content/curriculum_content?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    //转圈圈
    wx.showLoading({
      title: '正在加载...',
    })
    //课程介绍
    wx.request({
      url: that.data.url+'/f/jdx/kecheng',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data.kc_list)
        //隐藏转圈圈
        wx.hideLoading();
        that.setData({
          kc_list: data.data.kc_list
        })
      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '连接服务器失败请稍后重试',
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})