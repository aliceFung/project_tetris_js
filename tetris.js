controller = {

  loopInterval: 350,

  init: function(){
    model.init(); // creates 1 new piece
    model.level = this.selectLevel();
    // controller.setSpeed(model.level);
    view.init();
    controller.runGame();
  },

  selectLevel: function(){
    var input = prompt('Select Tetris Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(input) || input > 3 || input < 1) {
      input = 1;
    }
    return Number(input);
  },

  setSpeed: function(){
    console.log('int: '+ controller.loopInterval+ ", lvl: "+ model.level + ", score: "+ model.score);
    controller.loopInterval = 350 - (model.level+model.score)*7;
    if (controller.loopInterval < 170){
      console.log('something wacky');
    }else if(controller.loopInterval < 200){
      console.log('lets look');
    }
  },

  runGame: function(){
    controller.setSpeed();
    window.gameplay = setTimeout(this.gameLoop, controller.loopInterval);
  },

  endGame: function(){
    window.clearTimeout(window.gameplay);
    alert("You Lost!");
  },

  gameLoop: function(){
    controller.runGame();
    view.clearBoard();        //clearBoard
    view.renderBoard(model.board, model.score);
    controller.movePiece();   //moves piece down
    view.drawShape(model.currentPiece); //
    // console.log('tick');
  },

  movePiece: function(xAmt){
    var validMove = true;
    if (xAmt){
      model.movePieceOnX(xAmt);
    } else {
      validMove = model.movePieceDown();
    }

    if (!validMove){
      view.drawShape(model.currentPiece);
      controller.endGame();
    }
  },

  dropPiece: function(){
    model.dropPiece();
  },

  rotatePiece: function(){
    model.rotatePiece();
  }

};

$(document).ready(controller.init());