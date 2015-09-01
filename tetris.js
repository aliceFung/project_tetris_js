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
    view.renderBoard(model.board);
    controller.movePiece();   //moves piece down
    view.drawPiece(model.currentPiece); //
    console.log('tick');
  },

  movePiece: function(xAmt){
    if (xAmt){
      model.movePieceOnX(xAmt);
    } else {
    model.movePieceDown();
    }
  },

  dropPiece: function(){
    model.dropPiece();
  }

};

model = {

  board: [],
  rows: new Array(20),

  init: function(){
    model.createPiece();
    for (var i=0; i < model.rows.length; i++){
      model.rows[i] = {};
    }
  },

  createPiece: function(){
    model.currentPiece = new model.SmallPiece(model.randomX(),0);
  },

  //generates random X coordinate @ 40 increments
  randomX: function(){
    return Math.floor(Math.random()*10)*40;
  },

  //Constructor
  SmallPiece: function(x,y){

      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 40;
  },

  movePieceDown: function(){
    if (!model.collisionDetected() && !model.reachedBottom()){
      model.currentPiece.y += 1;
    }else if (model.reachedBottom() || model.occupiedSpace()){
      model.bottomBlocks();
    }
  },

  bottomBlocks: function(){
    model.board.push(model.currentPiece);
    model.addToRow();
    model.checkRows();
    model.createPiece();
  },

  movePieceOnX: function(xAmt){
    piece = model.currentPiece;
    // console.log('moving '+ piece.x+ ' ' + xAmt);
    nextX = piece.x+ xAmt;
    if (nextX >= 0 && nextX <= (view.canvas.width - piece.width)){
      piece.x += xAmt;
    }
  },

  dropPiece: function(){
    while (!model.collisionDetected()){
      model.movePieceDown();
    }
    model.bottomBlocks();
  },

  collisionDetected: function(){
    var piece = model.currentPiece;
    if (piece.x < 0 || piece.x > view.canvas.width - piece.width || piece.y > view.canvas.height - piece.height - 1){
      return  true;
    } else if (model.occupiedSpace()){
      return true;
    } else{
      return false;
    }
  },

  occupiedSpace: function(){
    var piece = model.currentPiece;
      for (var i = 0;i < model.board.length; i++ ){
        if (piece.x == model.board[i].x && piece.y + piece.height >= model.board[i].y){
          return true;
        }
      }
  },

  reachedBottom: function(){
    return model.currentPiece.y + model.currentPiece.height >= view.canvas.height;
  },

  addToRow: function(){
    console.log('addToRow');
    var index = model.currentPiece.x/40;
    var row = model.currentPiece.y/40;
    model.rows[row][index] = true;
  },

  checkRows: function(){
    console.log('running checkRows');
    var count;
    //go through all rows from bottom up
    for (var y = 19; y >= 0; y--){
      count = 0;
      // if row exists
      if(model.rows[y]){
        //go through all cells in row if rows exist
        for (var x=0; x< 10; x++){
          if (model.rows[y][x]){
            count++;
          }
        }
        console.log('checking row ' + x + "count "+ count);
        //if all cells filled
        if (count === 10){
          model.clearRow(x);
        }
      }
    }
  },

  clearRow: function(row){
    console.log('clearing row');
    //find and remove all row pieces in board
    var xCoord = row*40;
    for(var i=0; i<model.board.length; i++){
      if(model.board[i].x === xCoord){
        model.board.splice(i,1);
      }
    }
    //remove row
    model.rows.splice(row,1);
    //add empty row
    model.rows.push(undefined);
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
      var xSpace = view.userMove[event.which] * 40;
      controller.movePiece(xSpace);
    }

    if (event.which == 40){
      controller.dropPiece();
    }
  },

  renderBoard: function(board){
    for (var i =  board.length - 1; i >= 0; i--) {
        view.drawPiece(board[i]);
     };
  },

  userMove: {
    37: -1, //left
    // 38: 'up',
    39: 1, //'right'
    40: 'down'
  }

};

$(document).ready(controller.init());