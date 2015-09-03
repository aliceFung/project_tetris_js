controller = {

  init: function(){
    //initialize the view
    view.init();
    //testing
    model.init(); // creates 1 new piece
    view.drawShape(model.currentPiece); //draws piece
    setInterval(this.gameLoop, 400);
  },

  gameLoop: function(){
    view.clearBoard();        //clearBoard
    view.renderBoard(model.board);
    controller.movePiece();   //moves piece down
    view.drawShape(model.currentPiece); //
    // console.log('tick');
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
  // pieces: model.currentPiece.pieces,

  init: function(){
    model.createPiece();
    for (var i=0; i < model.rows.length; i++){
      model.rows[i] = {};
    }
  },

  createPiece: function(){
    console.log('piece created');
    // var shapes = [model.Square,model.I, model.J, model.T, model.Z, model.S, model.L];
    // selection = Math.floor((Math.random() * 7));

    // model.currentPiece = new shapes[selection](model.randomX(),0);

    model.currentPiece = new model.Square(model.randomX(),0);
      // // if x is off the edge when creating big shapes
      // if (model.currentPiece.x + model.currentPiece.width > 800){
      //   //shift them over to the left so they aren't created off canvas
      // }
    // new model.SmallPiece(model.randomX(),0);
    model.pieces = model.currentPiece.pieces;
  },

  //generates random X coordinate @ 40 increments
  // *9 b/c shape is 2 pieces in width
  randomX: function(){
    return Math.floor(Math.random()*9)*40;
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
    this.pieces[0] = new model.SmallPiece(x, y); //top left
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize); // top right
    this.pieces[2] = new model.SmallPiece(x+model.pieceSize, y); // bottom left
    this.pieces[3] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize); //bottom right
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 2;
  },


  //Constructor y @ -160 to be offscreen
  I: function(x,y){
    this.pieces = [];
    //straight up and down
    this.pieces[0] = new model.SmallPiece(x, y);
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.pieces[3] = new model.SmallPiece(x, y+model.pieceSize*3);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize;
    this.height = model.pieceSize*4;
  },

  //Constructor y @ -120 to be offscreen
  L: function(x,y){
    this.pieces = [];
    this.pieces[0] = new model.SmallPiece(x, y); //top
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.pieces[3] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
  },

  J: function(x,y){
    this.pieces = [];
    this.pieces[0] = new model.SmallPiece(x+model.pieceSize, y); //top
    this.pieces[1] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.pieces[3] = new model.SmallPiece(x, y-model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
  },

  T: function(x,y){
    this.pieces= [];
    this.pieces[0] = new model.SmallPiece(x, y); //top
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.pieces[3] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
  },

  S: function(x,y){
    this.pieces= [];
    this.pieces[0] = new model.SmallPiece(x, y);
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[3] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 3;
    this.height = model.pieceSize * 2;
  },

  Z: function(x,y){
    this.pieces= [];
    this.pieces[0] = new model.SmallPiece(x+model.pieceSize, y);
    this.pieces[1] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[3] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 3;
    this.height = model.pieceSize * 2;
  },

  updateShapeCoord: function(xAmt, yAmt){
    // console.log('update shape coord');
    xAmt = xAmt || 0;
    yAmt = yAmt || 0;
    for(var i=0; i< model.pieces.length; i++){
      // console.log('actually updating piece ' + i);
      model.pieces[i].x += xAmt;
      model.pieces[i].y += yAmt;
    }
    model.currentPiece.x +=xAmt;
    model.currentPiece.y +=yAmt;
    // console.log('actually updating shape ');
  },

  movePieceDown: function(){
    console.log('move piece down');
    if (!model.collisionDetected() && !model.reachedBottom()){
      model.updateShapeCoord(0, 40);
      // model.currentPiece.y += 1;
    }else if (model.occupiedSpace()){
      model.bottomBlocks();
    }else{
      console.log('something is happening here'); //remove after fix
    }
  },

  //stop movement because can't move down anymore, piece is finished
  bottomBlocks: function(){
    for(var i= model.pieces.length-1; i >= 0; i--){
      model.board.push(model.pieces[i]);
      model.addToRow(model.pieces[i]);
    }
    model.checkRows();
    model.createPiece();
  },

  movePieceOnX: function(xAmt){
    console.log('move piece on x');
    var pieces = model.currentPiece.pieces;
    var okPieces = 0;
    //check every piece of shape if valid to move
    for(var i=0; i< pieces.length; i++){
      var piece = pieces[i];
      // console.log('moving '+ piece.x+ ' ' + xAmt);
      nextX = piece.x+ xAmt;
      //checking borders
      if (nextX >= 0 && nextX <= (view.canvas.width - piece.width) && !model.occupiedSpace(nextX)){
        okPieces ++;
        // piece.x += xAmt;
      }
    }
    //ok to change x coord
    if(okPieces === pieces.length){
      model.updateShapeCoord(xAmt, 0);
    }
  },

  dropPiece: function(){
    while (!model.collisionDetected()){
      model.movePieceDown();
    }
    model.bottomBlocks();
  },

  collisionDetected: function(){
    var pieces = model.currentPiece.pieces;
    var count = 0;
    var collided = false;
    // for(i= 0; i < pieces.length; i++){
    while(!collided && count < pieces.length){
      var piece = pieces[count];
      if (piece.x < 0 || piece.x > view.canvas.width - piece.width || piece.y > view.canvas.height - piece.height - 1){
        collided = true;
      } else if (model.occupiedSpace()){
        collided = true;
      }
      count ++;
    }
    return collided;
  },

  occupiedSpace: function(xAmt){
    var pieces = model.currentPiece.pieces;
    var rowToCheck;
    var occupied = false;
    var count = 0;
    // setting default
    xAmt = xAmt || 0;

    //looping through small pieces
    while(!occupied && count < pieces.length){
      var piece = pieces[count];
      var nextX = xAmt + piece.x;
      rowToCheck = Math.floor(piece.y/40+1); // y=721; ck row: 19
      if(rowToCheck < 0 || rowToCheck > 19){
        occupied = true;
      }
      else if (model.rows[rowToCheck][nextX/40]){
       occupied = true;
      }
      count++;
    }
    return occupied;
  },

  // not changed for each piece yet
  reachedBottom: function(){
    return model.currentPiece.y + model.currentPiece.height >= view.canvas.height;
  },

  // sets cell status to occupied or not
  addToRow: function(piece){
    // console.log('addToRow');
    // for(var i=0; i < model.pieces.length; i++){
    //   piece = model.pieces[i];
      var index = piece.x/40;
      var row = piece.y/40;
      model.rows[row][index] = true;
    // }
  },

  checkRows: function(){
    // console.log('running checkRows');
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
        // console.log('checking row ' + x + "count "+ count);
        //if all cells filled
        if (count === 10){
          model.clearRow(y);
        }
      }
    }
  },

  clearRow: function(row){
    // console.log('clearing row '+ row );
    //find and remove all row pieces in board
    var yCoord = row*40;
    for(var i = model.board.length -1; i >= 0; i--){
      if(model.board[i].y === yCoord){
        // console.log("printing boardI.x" + model.board[i].x/40)
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

  drawShape: function(shape){
    var pieces = shape.pieces;
    for (var i = pieces.length - 1; i >= 0; i--) {
          view.drawPiece(pieces[i]);
    };
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