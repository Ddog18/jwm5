// pages/examination/examination.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmlist: [],
    name: 'python初级测试',
    num: '',
    url: getApp().globalData.url,
    imgUrl: getApp().globalData.imgUrl,
    answer: [],
    page: 0,
    error_list: [],
    score: 0,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    that.setData({
      name: options.name,
      id:id
    })
    //获取考试信息
    wx.request({
      url: that.data.url + '/f/jdx/kaoshineirong',
      data: { 'shipinid': id},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        that.setData({
          tmlist: data.data.tmlist,
          num: data.data.tmlist.length
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

  // 返回视频
  sub2:function(){
    wx.navigateTo({
      url: '/pages/personal_examination/personal_examination',
    })
  },
  
  // 提交试卷
  sub:function(){
    var that = this
    // 填写的内容
    var answer = that.data.answer
    // 题目
    var list = that.data.tmlist
    // 判断是否填写
    if(answer.length<that.data.num){
      wx.showModal({
        title: '提示',
        content: '请填写全部题目',
      })
      return false
    }
    // 计算成绩
    var error_list = new Array;
    var num = that.data.num
    for(let i=0;i<list.length;++i){
      for(let j=0;j<answer.length;++j){
        if(list[i].id==answer[j].id){
          if(list[i].zhengque==answer[j].data){
            // 答对
          }else{
            // 答错
            error_list = error_list.concat([{"wenti":list[i].wenti, "jieshi1":list[i].jieshi1}])
          }
        }
      }
    }
    // 切换页面显示
    that.setData({
      page:1,
      error_list: error_list
    })
    // 计算得分
    var correct = num-error_list.length
    var score = (correct/num).toFixed(2)*100
    that.setData({
      score:score
    })
    // 保存得分
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: that.data.url + '/f/jdx/kaoshi_baocun',
      data: { "openid": openid, "zongfen": score
       , "shijuan": that.data.id, "zhunquelu":score},
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
       
      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '连接服务器失败请稍后重试',
        })
      },
    })
  },

  // 每次选中
  radio_group: function (value){
    var that = this
    var data = value.detail.value
    var id = value.target.dataset.id
    var list = [{'data':data, 'id':id}]
    var answer = that.data.answer
    console.log(answer);
    for(let i=0;i<answer.length;++i){
      if(answer[i].id==id){
        answer.splice(i, 1);
      }
    }

    that.setData({
      answer:answer.concat(list)
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