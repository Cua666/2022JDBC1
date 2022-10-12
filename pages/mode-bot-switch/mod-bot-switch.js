// pages/mode-bot-switch/mod-bot-switch.js
Page({

  
  data: {

  },
easybot:function() {
  wx.navigateTo({
    url: '/pages/mode-bot/mode-bot',
  })
},
difbot:function() {
  wx.navigateTo({
    url: '/pages/mode-bot-difficult/mod-bot-difficult',
  })
},
quit:function() {
  wx.navigateTo({
    url: '/pages/modes/modes',
  })
}
})