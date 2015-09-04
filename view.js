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
    //overwriting canvas
    view.ctx.clearRect(0,0, view.canvas.width, view.canvas.height);
  },

  drawPiece: function(piece){
    view.ctx.fillStyle = piece.color;
    view.ctx.fillRect(piece.x, piece.y, piece.width, piece.height);
    view.ctx.strokeStyle = "black";
    view.ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);
  },

  drawShape: function(shape){
    var pieces = shape.pieces;
    for (var i = pieces.length - 1; i >= 0; i--) {
          view.drawPiece(pieces[i]);
    }
  },

  changePieceColumn: function(event){
    if (event.which == 37 || event.which == 39){
      var xSpace = view.userMove[event.which] * 40;
      controller.movePiece(xSpace);
    } else if (event.which == 38){
      controller.rotatePiece();
    }

    if (event.which == 40){
      controller.dropPiece();
    }
  },

  renderBoard: function(board, score){
    for (var i =  board.length - 1; i >= 0; i--) {
        view.drawPiece(board[i]);
    }
    $('#score').text('Current Score: ' + score);
  },

  userMove: {
    37: -1, //left
    38: 'rotate', // 'up',
    39: 1, //'right'
    40: 'down'
  }

};