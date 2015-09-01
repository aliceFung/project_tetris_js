controller = {

  currentPiece: 0,

  init: function(){
    //testing
    model.init();
    view.drawPiece(model.piece);
    setInterval(this.gameLoop, 1000);
  },

  gameLoop: function(){
    view.clearBoard();
    controller.movePiece();
    view.drawPiece(currentPiece);
  },

  movePiece: function(){
    currentPiece = model.piece;
    currentPiece.y+= 40; //40 = 1x1 minipiece
  }

};

model = {
  piece: 0,

  init: function(){
    model.piece = new model.SmallPiece(200,200);
  },

  //Constructor
  SmallPiece: function(x,y){
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 40;
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


  //add listeners
  init: function(){
    $(document).keydown(function(event){
      view.changePieceColumn(event);
    });

  },

  clearBoard: function(){
    view.ctx.clearRect(0,0, 400, 800); //overwriting canvas
  },

  drawPiece: function(piece){
      view.ctx.rect(piece.x,piece.y,piece.width,piece.height);
      view.ctx.stroke();

  },

  changePieceColumn: function(event){
    if (event.which == 37 || event.which == 39){
      model.piece.x += view.userMove[event.which] * 0.25;
    }

    if (event.which == 40){
      model.dropPiece();
    }
    // this.currentDirection += this.userMove[event.which];
  },

  userMove: {
    37: -1, //left
    // 38: 'up',
    39: 1, //'right'
    40: 'down'
  }

};

$(document).ready(controller.init());