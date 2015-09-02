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
  pieceSize: 40,

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
      this.width = model.pieceSize;
      this.height = model.pieceSize;
  },

  //Constructor y @ -80 to be offscreen
  Square: function(x,y){
    this.pieces = [];
    this.pieces[0] = new board.SmallPiece(x, y); //top left
    this.pieces[1] = new board.SmallPiece(x, y+model.pieceSize); // top right
    this.pieces[2] = new board.SmallPiece(x+model.pieceSize, y); // bottom left
    this.pieces[3] = new board.SmallPiece(x+model.pieceSize, y+model.pieceSize); //bottom right
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 2;
  },

  //Constructor y @ -160 to be offscreen
  Bar: function(x,y){
    this.pieces = [];
    //straight up and down
    this.pieces[0] = new board.SmallPiece(x, y);
    this.pieces[1] = new board.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new board.SmallPiece(x, y+model.pieceSize*2);
    this.pieces[3] = new board.SmallPiece(x, y+model.pieceSize*3);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize;
    this.height = model.pieceSize*4;
  },

  //Constructor y @ -120 to be offscreen
  L: function(x,y){
    this.pieces = [];
    this.pieces[0] = new board.SmallPiece(x, y); //top
    this.pieces[1] = new board.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new board.SmallPiece(x, y+model.pieceSize*2);
    this.pieces[3] = new board.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
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

  movePieceOnX: function(xAmt){  //need to add collision for left/right
    piece = model.currentPiece;
    // console.log('moving '+ piece.x+ ' ' + xAmt);
    nextX = piece.x+ xAmt;

    //checking borders
    if (nextX >= 0 && nextX <= (view.canvas.width - piece.width) && !model.occupiedSpace(nextX)){
      piece.x += xAmt;
    }
  },

  dropPiece: function(){
    while (!model.collisionDetected()){
      model.movePieceDown();
    }
    model.bottomBlocks();
  },

  collisionDetected: function(nextX){
    var piece = model.currentPiece;

    if (piece.x < 0 || piece.x > view.canvas.width - piece.width || piece.y > view.canvas.height - piece.height - 1){
      return  true;
    } else if (model.occupiedSpace()){
      return true;
    } else{
      return false;
    }
  },

  occupiedSpace: function(nextX){
    var piece = model.currentPiece;
    var rowToCheck;

    // setting default
    if(!nextX){nextX = piece.x;}

    if (model.rows[Math.floor(piece.y/40+1)][nextX/40]){
     return true;
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
          model.clearRow(y);
        }
      }
    }
  },

  clearRow: function(row){
    console.log('clearing row '+ row );
    //find and remove all row pieces in board
    var yCoord = row*40;
    for(var i = model.board.length -1; i >= 0; i--){
      if(model.board[i].y === yCoord){
        console.log("printing boardI.x" + model.board[i].x/40)
        // console.log(model.board[i].y)
        model.board.splice(i,1);
      }else{
        model.board[i].y += 40;
      }
    }
    //remove row
    model.rows.splice(row,1);
    //add empty row
    model.rows.unshift({});
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
    //overwriting canvas
    view.ctx.clearRect(0,0, view.canvas.width, view.canvas.height);
  },

  drawPiece: function(piece){
    view.ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);
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