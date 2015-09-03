controller = {

  init: function(){
    //initialize the view
    view.init();
    model.init(); // creates 1 new piece
    view.drawShape(model.currentPiece); //draws piece
    controller.startGame();
  },

  startGame: function(){
    controller.gameplay = setInterval(this.gameLoop, 100);
  },

  endGame: function(){
    clearInterval(controller.gameplay);
    alert("You Lost!");
  },

  gameLoop: function(){
    view.clearBoard();        //clearBoard
    view.renderBoard(model.board);
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