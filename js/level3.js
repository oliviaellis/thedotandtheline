var level3 = function(game){
}

level3.prototype = {

    create: function () {
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);
    },

    update: function () {
    },

    render: function () {
    },

    nextLevel: function(){
      this.game.state.start("level4");
    }
  }
