controller = {

  init: function(){

  }

};

model = {

  smallPiece: {

  }

};

view = {

  context: $("#board")[0].getContext("2d"),

  //add listeners
  init: function(){
    $(document).keydown(function(event){
      view.changePieceColumn(event);
    });
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