//app.js
App({

  userinfo: null,
  //微信登录
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示', content: '新版本已经准备好，是否重启应用？', success: function (res) {
          if (res.confirm) {                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {    // 新的版本下载失败
      wx.showModal({ title: '更新提示', content: '新版本下载失败', showCancel: false })
    })
  },

  
  globalData: {
    isAndroid: false,
    isIOS: false,
    userInfo: null,
    imgUrl:'https://www.xuefushiyuan.com:8081',//图片前缀
    url:'https://www.xuefushiyuan.com:8081/jeesite'//地址URL
    //url:'http://192.168.0.112:8080/jeesite'
  },
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.platform);     //平台信息
        if (res.platform == "android") {
          this.globalData.isAndroid = true
        }
        else if (res.platform == "ios") {
          this.globalData.isIOS = true,
            this.setData({
              ss: '由于政策规定，IOS暂不支持'
            })
        }
        else if (res.platform == "pc") {
          console.log('pc设备')
        }

      }
    })

  },
})

