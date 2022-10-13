// pages/mode-bot-switch/mod-bot-switch.js
Page({

  
  data: {

  },
easybot:function() {
  wx.redirectTo({
    url: '/pages/mode-bot/mode-bot',
  })
},
difbot:function() {
  wx.redirectTo({
    url: '/pages/mode-bot-difficult/mod-bot-difficult',
  })
},
quit:function() {
  wx.redirectTo({
    url: '/pages/modes/modes',
  })
}
})