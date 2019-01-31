var winState = function(game){
}

winState.prototype = {

    create: function () {
      console.log('You win');
    // Set up audio
      this.track = this.game.add.audio('outro', 1, false);
      this.track.play();
      this.game.input.onDown.addOnce(() => {
       this.game.sound.context.resume();
      });
    },

    update: function () {
    },

    render: function () {
    }
  }
