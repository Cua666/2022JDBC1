const app = getApp()
Page({
  data:{
    
  },
  onShow(){
    console.log(app.globalData.userInfo)
  },
  onLoad:function(options){

  },
  login(){
    var that= this;
    wx.getUserProfile({
      
      desc: '用于信息完善',
      success(res){
        console.log(res)
        var user = res.userInfo
        app.globalData.userInfo = user
        that.setData({
          userInfo:user
        })
        wx.cloud.database().collection('login_users').add({
          data:{
            avatarUrl:user.avatarUrl,
            nickName:user.nickName
          },
          success(res){
            console.log(res)
            wx.showToast({
              title: '登陆成功',
            })
          }
        })
      }
    })
  }
})