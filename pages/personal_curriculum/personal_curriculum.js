// pages/personal_curriculum/personal_curriculum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    sp_list: '',
    imgUrl: getApp().globalData.imgUrl
  },

  //跳转到视频详情
  video_introduce: function (e) {
    wx.navigateTo({
      url: '/pages/video_introduce/video_introduce?id=' + e.currentTarget.dataset.id,
    })
  },

  //跳转视频播放
  video_play:function(e){
    wx.navigateTo({
      url: '/pages/video_play/video_play?id=' + e.currentTarget.dataset.id,
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    //转圈圈
    wx.showLoading({
      title: '正在加载...',
    })
    // 获取openid
    var openid = wx.getStorageSync('openid');
    // 我的课程
    wx.request({
      url: that.data.url + '/f/jdx/wode_shipin',
      data: { "openid": openid},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
      // console.log(data.data)
        //隐藏转圈圈
        wx.hideLoading();
       if(data.data.code==1){
         that.setData({
           sp_list: data.data.sp_list
         })
       }
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