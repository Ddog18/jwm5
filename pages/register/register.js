// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    sendTime: '验证码',
    snsMsgWait: 60,
    phone: '',
    hidden: true,
  },

  // 监听手机号输入
  phone: function (event) {
    var that = this
    that.setData({
      phone: event.detail.value
    })
  },

  // 获取验证码
  sendCode: function () {
    var that = this
    var phone = that.data.phone
    if ((/^1(3|4|5|7|8)\d{9}$/.test(phone))){
      //获取验证码
      wx.request({
        url: that.data.url + '/f/jdx/zhuce_yanzhengma',
        data: { "shoujihao": phone },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success(data) {
          console.log(data.data)
          if (data.data.code==0){
            wx.showModal({
              title: '提示',
              content: '该手机号已注册',
            })
          } else if (data.data.code==-1){
            wx.showModal({
              title: '提示',
              content: '发送失败请稍后再试',
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
      // 60秒后重新获取验证码
      var inter = setInterval(function () {
        this.setData({
          smsFlag: true,
          sendTime: this.data.snsMsgWait + 's',
          snsMsgWait: this.data.snsMsgWait - 1
        });
        if (this.data.snsMsgWait < 0) {
          clearInterval(inter)
          this.setData({
            sendTime: '验证码',
            snsMsgWait: 60,
            smsFlag: false
          });
        }
      }.bind(this), 1000);
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号!',
      }) 
    }
  },


  // 登陆
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  //发送验证码
  code:function(){

  },

  // 注册方法
  form:function(e){
    var that = this
    var phone = e.detail.value.phone;
    var code = e.detail.value.code;
    var psw1 = e.detail.value.psw1;
    var psw2 = e.detail.value.psw2;
    if (phone == null || phone==""){
      wx.showModal({
        title: '提示',
        content: '请输入手机号!',
      }) 
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号!',
      }) 
    } else if (code == null || phone=="") {
      wx.showModal({
        title: '提示',
        content: '请输入验证码!',
      })
    } else if (psw1 == null || psw1 == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码!',
      })
    } else if (psw2 == null || psw2 == "") {
      wx.showModal({
        title: '提示',
        content: '请输入确认密码!',
      })
    } else if (psw1 != psw2) {
      wx.showModal({
        title: '提示',
        content: '密码不一致!',
      })
    }else{
      that.setData({
        hidden: false
      })
      // 注册
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: that.data.url + '/f/jdx/zhuce_save',
              data: { "shoujihao": phone, "mima": psw1, "code": res.code, "yanzhengma": code},
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success(data) {
                if (data.data.code==0){
                  wx.showModal({
                    title: '提示',
                    content: '验证码错误!',
                  })
                } else if (data.data.code == 1){
                  wx.showModal({
                    title: '提示',
                    content: '注册成功!',
                  });
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              },
              fail(e) {
                wx.showModal({
                  title: '错误',
                  content: '连接服务器失败请稍后重试',
                })
              },
              complete(){
                that.setData({
                  hidden: true
                })
              }
            })
          }
        }
      })
    }
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