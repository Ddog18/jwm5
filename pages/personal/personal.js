// pages/personal/personal.js
Page({
  // 登录
  logins: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 我的课程
  personal_curriculum: function () {
    wx.navigateTo({
      url: '/pages/personal_curriculum/personal_curriculum',
    })
  },

  // 我的订单
  personal_order: function () {
    wx.navigateTo({
      url: '/pages/personal_order/personal_order',
    })
  },

  // 我的收藏
  personal_collection: function() {
    wx.navigateTo({
      url: '/pages/personal_collection/personal_collection',
    })
  },

  // 我的考试
  personal_examination: function () {
    wx.navigateTo({
      url: '/pages/personal_examination/personal_examination',
    })
  },

  // 我的设置
  personal_setup: function () {
    wx.navigateTo({
      url: '/pages/personal_setup/personal_setup',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    avatarUrl:'',
    nickName:'',
    frequency:0,
    highest:0,
    accuracy:0
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
    var that = this;
    //转圈圈
    wx.showLoading({
      title: '正在加载...',
    })
    // 获取openid
    var openid = wx.getStorageSync('openid');
    //查询用户 考试信息
    wx.request({
      url: that.data.url + '/f/jdx/kaoshicishu',
      data: { "openid": openid},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
      // console.log(data.data)
        //隐藏转圈圈
        wx.hideLoading();
       if(data.data.code==1){
         that.setData({
          frequency: data.data.kscs
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

    //最高成绩 
    wx.request({
      url: that.data.url + '/f/jdx/kaoshigaofen',
      data: { "openid": openid},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
       console.log(data.data)
       if(data.data.code==1){
         that.setData({
          highest: data.data.zgf
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
    // 准确率
    wx.request({
      url: that.data.url + '/f/jdx/zhunquelu',
      data: { "openid": openid},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
       console.log(data.data)
       if(data.data.code==1){
         that.setData({
          accuracy: data.data.pj
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