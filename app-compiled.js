'use strict';

//app.js
App({

  userinfo: null,
  //微信登录
  onLaunch: function onLaunch() {
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示', content: '新版本已经准备好，是否重启应用？', success: function success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({ title: '更新提示', content: '新版本下载失败', showCancel: false });
    });
  },

  // globalData: {
  //   userInfo: null,
  //   url: 'https://www.xuefushiyuan.com:8081/jeesite'
  // }

});
