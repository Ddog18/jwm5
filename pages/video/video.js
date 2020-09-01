// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    imgUrl: getApp().globalData.imgUrl,
    sp_list: [],
    fl_list: [],
    video_class: null,
    sort: '',
    isIOS: getApp().globalData.isIOS,
    isAndroid: getApp().globalData.isAndroid,
    ss: ''
  },

  //跳转到视频详情
  video_introduce: function (e) {
    var that = this
    // 获取openid
    var openid = wx.getStorageSync('openid');
    //判断用户是否购买
    wx.request({
      url: that.data.url + '/f/jdx/shipin_goumai',
      data: { "openid": openid, "shipinid": e.currentTarget.dataset.id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        if (data.data.code == 1) {
          wx.navigateTo({
            url: '/pages/video_play/video_play?id=' + e.currentTarget.dataset.id,
          })
        } else {
          wx.navigateTo({
            url: '/pages/video_introduce/video_introduce?id=' + e.currentTarget.dataset.id,
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

  //视频分类
  video_class: function (e) {
    var that = this
    that.setData({
      video_class: e.currentTarget.dataset.id
    })
    console.log("分类" + e.currentTarget.dataset.id)
    wx.request({
      url: that.data.url + '/f/jdx/shipin',
      data: { "shipinpaixu": that.data.sort, "fenlei": that.data.video_class },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data.sp_list)
        that.setData({
          sp_list: data.data.sp_list
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

  // 视频排序
  video_sort: function (e) {
    var that = this
    that.setData({
      sort: e.currentTarget.dataset.id
    })
    wx.request({
      url: that.data.url + '/f/jdx/shipin',
      data: { "shipinpaixu": that.data.sort, "fenlei": that.data.video_class },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data.sp_list)
        that.setData({
          sp_list: data.data.sp_list
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
    //转圈圈
    wx.showLoading({
      title: '正在加载...',
    })

    var that = this
    //视频
    wx.request({
      url: that.data.url + '/f/jdx/shipin',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data.sp_list)
        that.setData({
          sp_list: data.data.sp_list
        })
        //隐藏转圈圈
        wx.hideLoading();
      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '连接服务器失败请稍后重试',
        })
      },
    })
    //分类
    wx.request({
      url: that.data.url + '/f/jdx/shipin_fenlei',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data.fl_list)
        that.setData({
          fl_list: data.data.fl_list
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