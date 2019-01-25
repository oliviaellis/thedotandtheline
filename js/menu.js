var menuState = {
  create: function () {
    var nameLabel = game.add.text(80, 80, 'My First Game');

    var startLabel = game.add.text(80, game.world.height - 80, "press the W key to start");

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    wkey.onDown.addOnce(this.start, this);
  },

  start: function () {
    game.state.start('level1');
  }
};




var menuState = function(game){}

menuState.prototype = {
  create: function () {
    var nameLabel = this.game.add.text(80, 80, 'My First Game');
    var startLabel = this.game.add.text(80, this.game.world.height - 80, "press the W key to start");
    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start, this);
  },
	start: function(){
		this.game.state.start("level1");
	}
}
