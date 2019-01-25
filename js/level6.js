var bossState = function(game){
}

bossState.prototype = {

    create: function () {
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);
    },

    update: function () {
    },

    render: function () {
    },

    nextLevel: function(){
      this.game.state.start("win");
    }
  }
