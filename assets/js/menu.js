var menuState = function(game){}

menuState.prototype = {
  create: function () {

    // Set up audio
    this.track = this.game.add.audio('intro', 1, true);
    this.track.play();
    this.game.input.onDown.addOnce(() => {
      this.game.sound.context.resume();
    });

    this.game.stage.backgroundColor = '#336cb2';

    this.add.button(this.game.width/2-25, this.game.height/2-25, 'dot', this.startGame, this);
  },

	startGame: function() {
    this.track.stop();
		this.game.state.start("level1");
	}
}
