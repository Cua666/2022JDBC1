Page({
  data: {
    modalHidden: true,
    modalHidden2:true,
    modalofScoreHidden:true,
    imgurl1: "https://biaoqingba.cn/wp-content/uploads/2018/11/d97281d035ad9a5.gif",
    imgurl2: "https://biaoqingba.cn/wp-content/uploads/2018/11/5e2f9d2eed22d44.gif" ,
    imgurl3:"https://biaoqingba.cn/wp-content/uploads/2018/11/30f69ff3a17f316.gif",
    imgurl4:"https://biaoqingba.cn/wp-content/uploads/2018/11/30f69ff3a17f316-1.gif",
    imgurl5:"https://biaoqingba.cn/wp-content/uploads/2018/11/b476176ff266b49.gif",
    imgurl6:"https://biaoqingba.cn/wp-content/uploads/2018/11/ab5bf7c83fac7ff.gif",
    tmp1:0,
    tmp2:0,
    score1:0,
    score2:0
  },
  /* 投骰子获取点数 */
  buttonTapDice: function() {     
    if(this.data.canTapDice){
      this.setData({
        modalHidden: false,
        count:this.data.count+1
      })
      var i=Math.floor(Math.random()*6+1)
      this.setData({
        Num:i,
        flag:this.data.flag + 1,
        canTapDice:false
      })
    }
    else{
      return
    }
    

    /* console.log(this.data.Num),
    console.log("flag="+this.data.flag) */
    
  },

/* 在我方棋盘下骰 */
TapToPutDice2:function(e){  
  var index = e.currentTarget.dataset.index
  var cell2=this.data.cell2
  var cell1= this.data.cell1
  if(cell2[index].type!=0||this.data.count%2==0)
  {
    return;
  }
  else{
  cell2[index].type = this.data.Num
  var f= Math.floor(index/3)
  for(var i = 0 ;i < 9 ;i++){
    if(Math.floor(i/3)==f){
      if(cell1[i].type==cell2[index].type){
        this.data.currDiceNum1--
        cell1[i].type=0
        cell1[i].img=[]
      }
    }
  }
   
  /* console.log("type="+cell1[index].type)  */
  this.data.currDiceNum2++

  
  if(this.data.Num===1){
    cell2[index].img = "/images/dice1.png"
  }
  if(this.data.Num===2){
    cell2[index].img = "/images/dice2.png"
  }
  if(this.data.Num===3){
    cell2[index].img = "/images/dice3.png"
  }
  if(this.data.Num===4){
    cell2[index].img = "/images/dice4.png"
  }
  if(this.data.Num===5){
    cell2[index].img = "/images/dice5.png"
  }
  if(this.data.Num===6){
    cell2[index].img = "/images/dice6.png"
  }
  
  
  this.setData({
    cell2:cell2,
    cell1:cell1,
    currDiceNum2:this.data.currDiceNum2,
    canTapDice:true,
    count:this.data.count+1
  })
  if(this.data.currDiceNum2<9){
    setTimeout(()=>
      {
        this.botaction()
      }, 20)
  }
  else return
  

 /*  console.log(this.data.currDiceNum1) */
  /* for(var i = 0 ;i < 9 ;i++){
    console.log(cell1[i].type+"\n");
  } */
}


},
 /* 人机行为 */
 botaction:function(){
  var DiceNum=Math.floor(Math.random()*6+1)
  this.setData({
    botShowDice:true,
    BotNum:DiceNum,
    modalHidden2: false
  })
  setTimeout(()=>
  {
    this.modalConfirm2()
    this.nextstep()
    
  }, 1500)
  
},
/* 人机下一步棋ai */
  nextstep(){
    var ownBoard = this.data.cell1
    /* for (var i = 0 ;i <3 ;i++){
      console.log(ownBoard[3*i].type,ownBoard[3*i+1].type,ownBoard[3*i+2].type)
    }  */
    var otherBoard = this.data.cell2
    var figure = this.data.BotNum
    var ans=0
    var same = 0
    var final_diff=-100
    for(var i=0;i<3;++i){
      for(var j=0;j<3;++j){
        if(ownBoard[3*i+j].type==0){
          let other = 0
          let own = 0
          let blank = 0
          for(var k=0; k<3 ;++k){

            if(ownBoard[3*i+k].type==figure){
              ++own
              console.log("own="+own)
            }
            if(ownBoard[3*i+k].type==0){
              ++blank
              console.log("blank="+blank)
            }
            if(otherBoard[3*i+k].type==figure){
              ++other
              console.log("other="+other)
            }
          }
          var diff = ((own + blank)*(own+blank))+ other * other;
          console.log("dif="+diff)
          if (diff >final_diff||(diff==final_diff&&own>same)) {
            ans = 3 * i + j ;
            final_diff = diff;
            same=own
            console.log("diff="+diff,"ans="+ans)
          }
          
          
          break;
        }
        
      }
    }
   
    /* console.log(ans)  */
   /*  if(ownBoard[ans].type==0){
      (ownBoard[ans].type)=figure
    }
    else{
      while(ownBoard[ans].type!=0){
        ans=ans+1
      }
      ownBoard[ans].type=figure
    } */
    ownBoard[ans].type=figure
   /*  console.log(ownBoard[ans].type) */
    this.data.currDiceNum1++
    if(this.data.BotNum===1){
      ownBoard[ans].img = "/images/dice1.png"
    }
    if(this.data.BotNum===2){
      ownBoard[ans].img = "/images/dice2.png"
    }
    if(this.data.BotNum===3){
      ownBoard[ans].img  = "/images/dice3.png"
    }
    if(this.data.BotNum===4){
      ownBoard[ans].img  = "/images/dice4.png"
    }
    if(this.data.BotNum===5){
      ownBoard[ans].img  = "/images/dice5.png"
    }
    if(this.data.BotNum===6){
      ownBoard[ans].img  = "/images/dice6.png"
    }
    var f= Math.floor(ans/3)
    for(var i = 0 ;i < 9 ;i++){
    if(Math.floor(i/3)==f){
      if(otherBoard[i].type==ownBoard[ans].type){
        this.data.currDiceNum2--
        otherBoard[i].type=0
        otherBoard[i].img=[]
      }
    }
  } 
    
    this.setData({
      cell1:ownBoard,
      cell2:otherBoard,
      currDiceNum1:this.data.currDiceNum1,
      canTapDice:true
    })
    /* console.log("currdicenum1="+this.data.currDiceNum1)
    for(var i = 0 ;i < 9 ;i++){
    console.log(cell1[i].type+"\n");
    }  */
    
    
  },
/* 最终计算得分 */
  getScore(){
    var cell1 = this.data.cell1
    var cell2 = this.data.cell2
    for(var i = 0 ;i < 3 ;i++){
      var l1=[0,0,0,0,0,0,0,0,0,0]
      var l2=[0,0,0,0,0,0,0,0,0,0]
      for(var j = 0; j < 3 ; j++){
        l1[cell1[i*3+j].type]++
        l2[cell2[i*3+j].type]++
      }
      for (var k = 1; k < 10; ++k){
        this.data.score1 += k * l1[k] * l1[k];
        this.data.score2 += k * l2[k] * l2[k];
      }
      this.setData({
        score1:this.data.score1,
        score2:this.data.score2,
        showscore:true

      })
     
      
      
      /* console.log("score1="+this.data.score1)
      console.log("score2="+this.data.score2) */
    }
  },
 
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalCandel2: function() {
    // do something
    this.setData({
      modalHidden2: true
    })
  },
  ScoreCandel: function() {
    // do something
    this.setData({
      modalofScoreHidden: false
    })
  },

  /***  点击确认*/
  modalConfirm: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm2: function() {
    // do something
    this.setData({
      modalHidden2: true
    })
  },
  ScoreConfirm: function() {
    // do something
    this.setData({
      modalofScoreHidden: false
    })
    wx.redirectTo({
      url: '/pages/modes/modes',
    })
  },
  onLoad: function (options) {
    this.reset()
    
  },
  reset(e){
    this.setData({
      cell1:[
        {type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},
      ],
      cell2:[
        {type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},
      ],
      currDiceNum1:0,
      currDiceNum2:0,
      Num : 0,
      flag : 0,
      count: 0,
      showscore:false,
      canTapDice:true,
      BotNum:0,
      botShowDice:false,
      
    })
  },
  

 
})

