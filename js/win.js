var winState = function(game){
}

winState.prototype = {

    create: function () {
      console.log('You win');
    },

    update: function () {
    },

    render: function () {
    },

    nextLevel: function(){
      this.game.state.start("win");
    }
  }
