// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    lbtlist: '',
    imgUrl: getApp().globalData.imgUrl,
  },

  //跳转视频详情
  // video:function(e){
  //   wx.navigateTo({
  //     url: '/pages/video_introduce/video_introduce?id=' + e.currentTarget.dataset.id,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //轮播图
    wx.request({
      url: that.data.url+'/f/jdx/lunbotu',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        if(data.data.code==1){
          that.setData({
            lbtlist: data.data.lbtlist
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

    //获取用户
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.data.url + '/f/jdx/denglu_yanzheng',
            data: { "code": res.code},
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success(data) {
              //隐藏转圈圈
              wx.hideLoading();
              if (data.data.code==1){
                //登录成功
                console.log(data);
                wx.setStorageSync('openid', data.data.yonghu.openid)
              }
              else{
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            },
            fail(e) {
              wx.showModal({
                title: '错误',
                content: '连接服务器失败请稍后重试',
              })
            }
            
          })
        }
      }
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