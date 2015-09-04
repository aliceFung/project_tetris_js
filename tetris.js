controller = {

  loopInterval: 350,

  init: function(){
    //initialize the view
    model.level = this.selectLevel();
    controller.setSpeed(model.level);
    view.init();
    model.init(); // creates 1 new piece
    // view.drawShape(model.currentPiece); //draws piece
    controller.startGame();
  },

  selectLevel: function(){
    var input = prompt('Select Tetris Difficulty Level: 1 for easy, 2 for medium, 3 for difficult');
    if (isNaN(input) || input > 3 || input < 1) {
      input = 1;
    }
    return input;
  },

  setSpeed: function(level){
    controller.loopInterval -= (level-1)*100;
  },

  startGame: function(){
    controller.gameplay = setInterval(this.gameLoop, controller.loopInterval);
  },

  endGame: function(){
    clearInterval(controller.gameplay);
    alert("You Lost!");
  },

  gameLoop: function(){
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