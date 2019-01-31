var winState = function(game){
}

winState.prototype = {

    create: function () {
    // Set up audio
      outro = this.game.add.audio('outro', 1, false);
      outro.play();

    // create Dot sprite
      dot = this.game.add.sprite(900, this.game.height/2, 'dot');
      line = this.game.add.sprite(-30, 0, 'full-line');

      tweenA = this.game.add.tween(dot).to( { x: 500 }, 1500, Phaser.Easing.Exponential.Out);
      tweenB = this.game.add.tween(line).to( { x: 300 }, 2000, Phaser.Easing.Exponential.Out);

      tweenA.chain(tweenB);

      this.game.time.events.add(3000, this.fade, this);
      this.game.camera.onFadeComplete.add(this.resetFade, this);
    },

    makeText: function() {
      this.text1 = this.game.add.text(this.game.width / 2, this.game.height / 2, "The End");
      this.text1.fill = "#FFFFFF";
      this.text1.anchor.set(0.5, 0.5);
      this.text1.font = "Lora";
    },


    fade: function() {
      this.game.camera.fade(0x000000, 6000);
      this.makeText();
    },

    resetFade: function() {
      this.game.stage.backgroundColor = '#000000';
      dot.kill();
      line.kill();
      this.game.camera.resetFX();
    },

    update: function () {
      tweenA.start();
    },

    render: function () {
    }
  }
