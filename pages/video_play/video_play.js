function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onShareAppMessage() { 
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    }
  },

  //切换
  showintroduce: function (data) {
    var that = this
    that.setData({
      'showintroduce': data.currentTarget.id,
    })
  },

  //跳转考试
  // examination: function () {
  //   var that = this
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定开始开始吗?',
  //     success: function (res) {
  //       if (res.confirm) {
  //         wx.navigateTo({
  //           url: '/pages/examination/examination?id='+that.data.id,
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },


  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onHide() {

  },

  inputValue: '',
  data: {
    id:'',
    'showintroduce': 2,
    src: '',
    // danmuList:
    //   [{
    //     text: '第 1s 出现的弹幕',
    //     color: '#ff0000',
    //     time: 1
    //   }, {
    //     text: '第 3s 出现的弹幕',
    //     color: '#ff00ff',
    //     time: 3
    //   }],
    url: getApp().globalData.url,
    chapter: '',
    video: '',
    src2: '',
    pjlist: [],
    vid:'',
    playerid:''
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindVideoEnterPictureInPicture() {
    console.log('进入小窗模式')
  },

  bindVideoLeavePictureInPicture() {
    console.log('退出小窗模式')
  },

  bindPlayVideo() {
    console.log('1')
    this.videoContext.play()
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
    //添加弹幕
    
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  // 当前播放时间
  bindtimeupdate:function(data){
    console.log(data.detail.currentTime)
    //保存
    wx.setStorageSync('time', data.detail.currentTime)
  },

  //视频播放方法
  play:function(e){
    var that = this;
    var src = e.currentTarget.dataset.src;
    that.setData({
      src: src,
      src2:  src
    })
    // 同时缓存播放路径
    wx.setStorageSync('src', src)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    that.setData({
      id: options.id
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
    // 获取openid
    var openid = wx.getStorageSync('openid');
    //获取缓存中的src
    var src = wx.getStorageSync('src');
    var time = wx.getStorageSync('time');
    console.log('src'+src)
    that.setData({
      src:src,
      src2:src,
      time:time
    })
    // 获取视频内容
    wx.request({
      url: that.data.url + '/f/jdx/shipinbofang',
      data: { "id": that.data.id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        that.setData({
          vid: data.data.shipin.vid,
          playerid: data.data.shipin.playerid
        })
        //隐藏转圈圈
        wx.hideLoading();
        if (data.data.code==1){
          that.setData({
            video: data.data.shipin
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
    // 获取章节内容
    wx.request({
      url: that.data.url + '/f/jdx/shipinzhangjie',
      data: { "id": that.data.id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        //播放视频
        that.setData({
          chapter: data.data.jzlist,
        })
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
  },
  
})