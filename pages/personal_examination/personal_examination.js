// pages/personal_examination/personal_examination.js
var util= require('../../utils/util.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    fraction_list: [],
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
    // 查询考试信息
    wx.request({
      url: that.data.url + '/f/jdx/chengji_lsit',
      data: { "openid": openid},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        //隐藏转圈圈
        wx.hideLoading();
       var cjlist = data.data.cjlist
       if(data.data.code==1){
        // for(let i=0;i<cjlist.length;++i){
        //   // var date = Date(cjlist[i]); //返回当前时间对象
        //   console.log(Date(cjlist[i]))
        //   cjlist[i] = util.formatTime(Date(cjlist[i]))
        // }
         that.setData({
          fraction_list: cjlist
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