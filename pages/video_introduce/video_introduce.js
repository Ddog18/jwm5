// pages/video_introduce/video_introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    'showintroduce':1,
    openid: '',
    url: getApp().globalData.url,
    video: null,
    collection:0,
    buy:'',
    chapter: null,
    pjlist: [],
    imgUrl: getApp().globalData.imgUrl
  },

  //切换
  showintroduce: function (data){
    var that = this
    that.setData({
      'showintroduce': data.currentTarget.id,
    })
  },

  //跳转支付
  pay:function(){
    var that = this
    wx.navigateTo({
      url: '/pages/pay/pay?id=' + that.data.id,
    })
  },

  //收藏
  collection0:function(){
    var that = this
    wx.request({
      url: that.data.url + '/f/jdx/shoucang_tianjia',
      data: { "openid": that.data.openid, "shangpinid": that.data.id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        if (data.data.code == 1) {
          that.setData({
            'collection': 1,
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

  collection1: function () {
    var that = this
    wx.request({
      url: that.data.url + '/f/jdx/shoucang_shanchu',
      data: { "openid": that.data.openid, "shipinid": that.data.id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        if (data.data.code == 1) {
          that.setData({
            'collection': 0,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('执行onload方法');
    var that = this
    that.setData({
      id: options.id
    })
    var openid = wx.getStorageSync('openid');
    var id = options.id

    // 查询课程
    wx.request({
      url: that.data.url + '/f/jdx/shipinbofang',
      data:{"id": id},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        if (data.data.code==1){
          if (data.data.shipin.dengji==1){
            data.data.shipin.dengji = '入门'
          } else if(data.data.shipin.dengji == 2){
            data.data.shipin.dengji = '中级'
          } else if (data.data.shipin.dengji == 3) {
            data.data.shipin.dengji = '高级'
          }
          that.setData({
            video: data.data.shipin,
          })
        }else{
          wx.showModal({
            title: '错误',
            content: '连接服务器失败请稍后重试',
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

    //查询章节
    wx.request({
      url: that.data.url + '/f/jdx/shipinzhangjie',
      data: { "id": id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        that.setData({
          chapter: data.data.jzlist
        })
      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '连接服务器失败请稍后重试',
        })
      },
    })

    //查询是否收藏
    wx.request({
      url: that.data.url + '/f/jdx/shouchang',
      data: { "openid": openid, "shangpinid":id},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        if (data.data.code==1){
          //已收藏
          that.setData({
            collection:1
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

    //查询视频评价
    wx.request({
      url: that.data.url + '/f/jdx/shipin_pinglun',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        if (data.data.code==1){
         that.setData({
          pjlist: data.data.pjlist
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

    // 查询是否支付
    wx.request({
      url: that.data.url + '/f/jdx_pay/goumai',
      data: { "openid": openid, "shangpinid": id},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        that.setData({
          buy: data.data.code
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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