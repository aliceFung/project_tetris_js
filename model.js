model = {

  board: [],
  rows: new Array(20),
  pieceSize: 40,
  currentColor: '#6C0',

  init: function(){
    model.createPiece();
    for (var i=0; i < model.rows.length; i++){
      model.rows[i] = {};
    }
  },

  createPiece: function(){
    var shapes = [ [model.Square, -80], [model.I, -160],
                [model.J, -120], [model.T, -120], [model.Z, -120],
                [model.S, -120], [model.L, -120] ];
    selection = Math.floor((Math.random() * 6.999999)); //no 7 idx

    model.currentColor = model.colors[selection];
    model.currentPiece = new shapes[selection][0](model.randomX(),shapes[selection][1]);

    model.pieces = model.currentPiece.pieces;
  },

  colors: ['blue', 'tomato', 'yellow','#6C0', 'orange', '#00FFFF', 'pink'],

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
      this.color = model.currentColor;
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
    this.type = 'square';
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
    this.type = 'I';
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
    this.type = 'L';
  },

  J: function(x,y){
    this.pieces = [];
    this.pieces[0] = new model.SmallPiece(x+model.pieceSize, y); //top
    this.pieces[1] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.pieces[3] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
    this.type = 'J';
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
    this.type = 'T';
  },

  S: function(x,y){
    this.pieces= [];
    this.pieces[0] = new model.SmallPiece(x, y);
    this.pieces[1] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[3] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
    this.type = 'S';
  },

  Z: function(x,y){
    this.pieces= [];
    this.pieces[0] = new model.SmallPiece(x+model.pieceSize, y);
    this.pieces[1] = new model.SmallPiece(x+model.pieceSize, y+model.pieceSize);
    this.pieces[2] = new model.SmallPiece(x, y+model.pieceSize);
    this.pieces[3] = new model.SmallPiece(x, y+model.pieceSize*2);
    this.x = x;
    this.y = y;
    this.width = model.pieceSize * 2;
    this.height = model.pieceSize * 3;
    this.type = 'Z';
  },

  updateShapeCoord: function(xAmt, yAmt){
    xAmt = xAmt || 0;
    yAmt = yAmt || 0;
    for(var i=0; i< model.pieces.length; i++){
      model.pieces[i].x += xAmt;
      model.pieces[i].y += yAmt;
    }
    model.currentPiece.x +=xAmt;
    model.currentPiece.y +=yAmt;
  },

  rotatePiece: function(){
    var tempPieces = [];
    var originX = model.currentPiece.x;
    var originY = model.currentPiece.y;
    for (var i=0; i < model.pieces.length; i++){
      //subtract origin x and y for rotation point of shape
      //swap x and y for clockwise rotation
      //add origin x and y to maintain place on board
      var tmpY = model.pieces[i].x - originX; //coord set to origin
      var tmp = { x: model.pieces[i].y - originY + originX,
                  y: model.pieceSize*3 - tmpY + originY};
      //create tmp piece to check collision
      tempPieces.push(tmp);
    }

    //check if rotation possible
    if(!model.occupiedSpace(0, tempPieces)){
      for (var i=0; i < model.pieces.length; i++){
        model.pieces[i].x = tempPieces[i].x;
        model.pieces[i].y = tempPieces[i].y;
     }
     var tmpW = model.currentPiece.width;
     model.currentPiece.width = model.currentPiece.height;
     model.currentPiece.height = tmpW;
    }
  },

  movePieceDown: function(){
    if(!model.collisionDetected() && !model.reachedBottom()){
      model.updateShapeCoord(0, 10);
    }else if (!model.pieceCannotMove() && model.occupiedSpace()){
      model.bottomBlocks();
    }else{
      return false;
      console.log('something is happening here'); //remove after fix
    }
    return true;
  },

  pieceCannotMove: function(){
    //top edge of shape in on canvas
    if (model.currentPiece.y < 0){
      return true; //tmp
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
    var pieces = model.currentPiece.pieces;
    var okPieces = 0;
    //check every piece of shape if valid to move
    for(var i=0; i< pieces.length; i++){
      var piece = pieces[i];
      nextX = piece.x+ xAmt;
      //checking borders
      if (nextX >= 0 && nextX <= (view.canvas.width - piece.width) && !model.occupiedSpace(xAmt)){
        okPieces ++;
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

  occupiedSpace: function(xAmt, pieces){
    pieces = pieces || model.currentPiece.pieces;
    var rowToCheck;
    var occupied = false;
    var count = 0;
    // setting default
    xAmt = xAmt || 0;

    //looping through small pieces
    while(!occupied && count < pieces.length){
      var piece = pieces[count];
      var nextX = xAmt + piece.x;
      rowToCheck = Math.floor(piece.y/40+1);
      if(rowToCheck > 19 || nextX <0 || nextX >=400){
        occupied = true;
      }
      else if (rowToCheck >= 0 && model.rows[rowToCheck][nextX/40]){
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
    var index = piece.x/40;
    var row = piece.y/40;
    model.rows[row][index] = true;
  },

  checkRows: function(){
    var count;
    //go through all rows from top down
    for(var y = 0; y <= 19; y++){
      count = 0;
      // if row exists
      if(model.rows[y]){
        //go through all cells in row if rows exist
        for (var x=0; x< 10; x++){
          if (model.rows[y][x]){
            count++;
          }
        }
        //if all cells filled
        if (count === 10){
          model.clearRow(y);
        }
      }
    }
  },

  clearRow: function(row){
    //find and remove all row pieces in board
    var yCoord = row*40;
    for(var i = model.board.length -1; i >= 0; i--){
      if(model.board[i].y === yCoord){
        model.board.splice(i,1);
      }else if (model.board[i].y < yCoord){
        model.board[i].y += 40;
      }
    }
    //remove row
    model.rows.splice(row,1);

    //add empty row
    model.rows.unshift({});
  }

};