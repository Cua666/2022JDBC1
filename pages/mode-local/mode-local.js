Page({
  data: {
    modalHidden: true,
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
  buttonTapDice: function() {     /* 投骰子获取点数 */
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
  TapToPutDice1:function(e){  
    var index = e.currentTarget.dataset.index
    var cell1=this.data.cell1
    var cell2=this.data.cell2
    if(cell1[index].type!=0||this.data.count%2==0)
    {
      return;
    }
    else{
    cell1[index].type = this.data.Num
    var f= Math.floor(index/3)
    for(var i = 0 ;i < 9 ;i++){
      if(Math.floor(i/3)==f){
        if(cell2[i].type==cell1[index].type){
          this.data.currDiceNum2--
          cell2[i].type=0
          cell2[i].img=[]
      }
    }
  }
    /* console.log("type="+cell1[index].type)  */
    this.data.currDiceNum1++
    console.log("currdicenum1="+this.data.currDiceNum1)
    
    if(this.data.Num===1){
      cell1[index].img = "/images/dice1.png"
    }
    if(this.data.Num===2){
      cell1[index].img = "/images/dice2.png"
    }
    if(this.data.Num===3){
      cell1[index].img = "/images/dice3.png"
    }
    if(this.data.Num===4){
      cell1[index].img = "/images/dice4.png"
    }
    if(this.data.Num===5){
      cell1[index].img = "/images/dice5.png"
    }
    if(this.data.Num===6){
      cell1[index].img = "/images/dice6.png"
    }
    this.setData({
      cell1:cell1,
      cell2:cell2,
      currDiceNum1:this.data.currDiceNum1,
      canTapDice:true
    })
    console.log(this.data.currDiceNum1)
    /* for(var i = 0 ;i < 9 ;i++){
      console.log(cell1[i].type+"\n");
    } */
  }
},
TapToPutDice2:function(e){  

  var index = e.currentTarget.dataset.index
  var cell2=this.data.cell2
  var cell1= this.data.cell1
  if(cell2[index].type!=0||this.data.count%2==1)
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
  console.log("currdicenum2="+this.data.currDiceNum2)
  
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
    canTapDice:true
  })
 /*  console.log(this.data.currDiceNum1) */
  /* for(var i = 0 ;i < 9 ;i++){
    console.log(cell1[i].type+"\n");
  } */
}


},


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
  ScoreConfirm: function() {
    // do something
    this.setData({
      modalofScoreHidden: false
    })
    wx.navigateTo({
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
      canTapDice:true
    })
  },
  

 
})

