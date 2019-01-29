var menuState = function(game){}

menuState.prototype = {
  create: function () {

    this.track = this.game.add.audio('intro', 1, true);
    this.track.play();

    this.game.stage.backgroundColor = '#336cb2';

    this.add.button(this.game.width/2-25, this.game.height/2-25, 'dot', this.startGame, this);

    this.game.input.onDown.addOnce(() => {
    this.game.sound.context.resume();
    });

    this.game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);

  },

  makeText: function() {
    this.text1 = this.game.add.text(this.game.width / 2, 100, "The Dot and the Line");
    this.text1.fill = "#EBDE47";
    this.text1.anchor.set(0.5, 0.5);
    this.text1.font = "Lora";
    },

	startGame: function() {
    this.track.stop();
		this.game.state.start("level1");
	}
}
