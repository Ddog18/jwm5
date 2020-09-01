// pages/pay/pay.js
var util = require('../../utils/md5Utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    video: null,
    openid: '',
    shipinid:null,
    imgUrl: getApp().globalData.imgUrl
  },
  //调起免费支付
  freepay:function(){
    // 获取openid
    var openid = wx.getStorageSync('openid');
    var total_fee = 0;
    var shipinid = this.data.shipinid;
    console.dir(openid);
    console.dir(shipinid);
    //alert("获取成功");
    wx.showLoading({
      title: '支付中',
    })
    var that = this;
    wx.request({
      url: that.data.url + '/f/jdx_pay/goumai_zhifu',
      data: { 
        "openid": openid, "shangpinid": shipinid
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        wx.hideLoading();
        if (data.data.code == 1) {
          wx.showToast({
            title: '获取成功',
            icon: 'success',//当icon：'none'时，没有图标 只有文字
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/video_play/video_play?id=' + that.data.shipinid,
          })
        }else{
          wx.showToast({
            title: '获取失败',
            icon: 'success',//当icon：'none'时，没有图标 只有文字
            duration: 2000
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
  //调起支付
  pay:function(){
     // 获取ip
    var ip = null
    // 获取openid
    var openid = wx.getStorageSync('openid');
    console.dir(openid);
    var total_fee = 0;
    if (this.data.video.cuxiao == 0) {
      total_fee = this.data.video.jiage  
    }else{
      total_fee = this.data.video.cuxiaojiage 
    }
    total_fee=1;//分为单位
    console.dir(total_fee);
    var shipinid = this.data.shipinid;
    console.dir(shipinid);
    wx.showLoading({
      title: '支付中',
    })
    var that = this;
      wx.request({
        url: that.data.url +'/f/jdx_pay/wxPayXcx',
        data: {
          "shipinid": shipinid,
          "openid": openid, 
          "out_trade_no":"sfhsih",
          "total_fee": total_fee,
          "ip": ip 
          },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(data) {
          console.log("微信支付");
          console.log(data)
          var result = data.data.date;
          console.log(result);
          //that.doWxPay(res.data);
          // var stringA = "appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
          //var paySign=result.sign;
         // console.dir(paySign);
          var payDataA = "appId=" + result.appId + '&nonceStr=' + result.nonceStr +'&package='+ result.package + '&signType=MD5&timeStamp=' + result.timeStamp + '&key=' + 'jiuweimi2020JWM08XUE13XIpingTAIh';
          console.log(payDataA);
          let yqSign = util.hex_md5(payDataA).toUpperCase();
          console.log("员倩签名:" + yqSign);
          console.log("签名:" + result.paySign);
          //返回参数吊起微信支付
          wx.requestPayment({
            'timeStamp': result.timeStamp,
            'nonceStr': result.nonceStr,
            'package': result.package,
            'signType': 'MD5',
            'paySign': yqSign,
            'success': function (res) {
              console.log("支付成功", res);
              wx.navigateTo({
                url: '/pages/video_play/video_play?id=' + that.data.shipinid,
              })
            },
            'fail': function (res) {
              console.log("支付失败", res);
              //隐藏转圈圈
              wx.hideLoading();
            }
          })
        },
        fail() {
          console.log("失败")
        }
      })
   
   },
  // pay: function(){
  //   var that = this
  //   // 获取ip
  //   var ip = null
  //   // 获取openid
  //   var openid = wx.getStorageSync('openid');
  //   var total_fee = 0;
  //   if (that.data.video.cuxiao==0){
  //     total_fee = that.data.video.jiage  
  //   }else{
  //     total_fee = that.data.video.cuxiaojiage 
  //   }
  //   wx.request({
  //     url: that.data.url + '/f/jdx/shipinbofang',
  //     data: { "id": id },
  //     method: 'POST',
  //     header: { 'content-type': 'application/x-www-form-urlencoded' },
  //     success(data) {
  //       console.log(data.data)
  //       if (data.data.code == 1) {
         
  //         that.setData({
  //           video: data.data.shipin,
  //         })
  //       }
  //     },
  //     fail(e) {
  //       wx.showModal({
  //         title: '错误',
  //         content: '连接服务器失败请稍后重试',
  //       })
  //     },
  //   })
  //   wx.request({
  //     url: 'http://ip-api.com/json',
  //     success: function (e) {
  //       console.log(e.data);
  //       ip= e.data
  //     }
  //   })
  //   //调起支付
  //   wx.request({
  //     url: that.data.url +'/f/jdx/',
  //     data: { "total_fee": total_fee, "openid": openid, "ip": ip },
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     success(data) {
  //       console.log("微信支付" + data.data)
  //       if (data.data == null) {
  //         wx.showModal({
  //           title: '错误',
  //           content: '未选择充值金额',
  //         })
  //       } else {
  //         //返回参数吊起微信支付
  //         wx.requestPayment({
  //           'timeStamp': data.data.timeStamp,
  //           'nonceStr': data.data.nonceStr,
  //           'package': data.data.package,
  //           'signType': 'MD5',
  //           'paySign': data.data.paySign,
  //           'success': function (res) {
  //             console.log("支付成功", res)
  //           },
  //           'fail': function (res) {
  //             console.log("支付失败", res)
  //           }
  //         })
  //       }

  //     },
  //     fail() {
  //       console.log("失败")
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    //获取视频id
    this.setData({
      shipinid: options.id,
    })
    var that = this
    // 获取openid
    var openid = wx.getStorageSync('openid');
    // 查询视频
    wx.request({
      url: that.data.url + '/f/jdx/shipinbofang',
      data: { "id": id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        if (data.data.code == 1) {
          if (data.data.shipin.dengji == 1) {
            data.data.shipin.dengji = '入门'
          } else if (data.data.shipin.dengji == 2) {
            data.data.shipin.dengji = '中级'
          } else if (data.data.shipin.dengji == 3) {
            data.data.shipin.dengji = '高级'
          }
          that.setData({
            video: data.data.shipin,
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