controller = {

  init: function(){
    //initialize the view
    view.init();
    //testing
    model.init(); // creates 1 new piece
    view.drawPiece(model.currentPiece); //draws piece
    setInterval(this.gameLoop, 10);
  },

  gameLoop: function(){
    view.clearBoard();        //clearBoard
    controller.movePiece();   //moves piece down
    
    view.drawPiece(model.currentPiece); //
  },

  movePiece: function(){
    model.movePieceDown();
  }

};

model = {
  // currentPiece: 0,

  init: function(){
    model.currentPiece = new model.SmallPiece(200,200);
  },

  //Constructor
  SmallPiece: function(x,y){

      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 40;
  },

  movePieceDown: function(){
    if (model.checkCollision(model.currentPiece)){
      model.currentPiece.y += 1;
    }
  },

  dropPiece: function(){
    //drop piece all the way to bottom
    //check where lowest point before existing
  },

  checkCollision: function(piece){
    if (piece.x < 0 || piece.x > view.canvas.width - piece.width || piece.y > view.canvas.height - piece.height - 1){
        return false;
    }else{
      return true;
    }
  },

  square: {
      // view.ctx.rect(0,20,40,40);
      // view.ctx.stroke();
      // view.ctx.rect(0,60,40,40);
      // view.ctx.stroke();
      // view.ctx.rect(40,20,40,40);
      // view.ctx.stroke();
      // view.ctx.rect(40,60,40,40);
      // view.ctx.stroke();
  }
};

view = {

  ctx: $("#board")[0].getContext("2d"),
  canvas: $("#board")[0],

  //add listeners
  init: function(){
    $(document).keydown(function(event){
      view.changePieceColumn(event);
    });

  },

  clearBoard: function(){
    view.ctx.clearRect(0,0, view.canvas.width, view.canvas.height); //overwriting canvas

  },

  drawPiece: function(piece){
    // view.clearBoard();
    // view.ctx.clearRect(0,0, view.canvas.width, view.canvas.height);
    view.ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);
    // view.ctx.stroke();

  },

  changePieceColumn: function(event){
    if (event.which == 37 || event.which == 39){
      model.currentPiece.x += view.userMove[event.which] * 40;
    }

    if (event.which == 40){
      model.dropPiece();
    }
  },

  userMove: {
    37: -1, //left
    // 38: 'up',
    39: 1, //'right'
    40: 'down'
  }

};

$(document).ready(controller.init());