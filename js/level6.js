var bossState = function(game){
}

bossState.prototype = {

    create: function () {
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);

      // Set up audio
        this.track = this.game.add.audio('level6', 1, false);
        this.track.play();
        this.game.input.onDown.addOnce(() => {
         this.game.sound.context.resume();
        });
    },

    update: function () {
    },

    render: function () {
    },

    nextLevel: function(){
      this.track.stop();
      this.game.state.start("win");
    }
  }
