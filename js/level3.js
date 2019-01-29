var level3 = function(game){
}

level3.prototype = {

    create: function () {
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);

      // Set up audio
        this.track = this.game.add.audio('level3', 1, false);
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
      this.game.state.start("level4");
    }
  }
