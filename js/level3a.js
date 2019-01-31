var level3a = function(game){
  this.isChecked = false;
  this.audioStopped = false;
}

level3a.prototype = {

    create: function () {
      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.skipLevel, this);
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bg = this.game.add.sprite(0,0, 'daredevil');

      // Set up audio
        audio3 = this.game.add.audio('3a', 1, false);
        audio3.play();

        line = this.game.add.sprite(-750, 0, 'sideline');
        this.game.physics.arcade.enable(line);

        target = this.game.add.sprite(800, 275, 'target');
        this.game.physics.arcade.enable(target);

    },

    update: function () {
      if (line.body.top == 0 ) {
        line.body.velocity.y = 300;
      }

      if (line.body.top == 600) {
        line.body.velocity.y = -300;
      }

      if (line.x == 0) {
        line.body.velocity.x = -300;
      }
      if (line.x == -780) {
        line.x == -770;
        line.body.velocity.x = 0;
        line.body.velocity.y = 300;
      }

      this.spacebar.onDown.add(this.deploy, this);
      this.game.physics.arcade.overlap(line, target, this.checkLine, null, this);
      audio3.onStop.add(this.checkAudio, this);

      if (this.isChecked && this.audioStopped) {
        this.game.state.start("level3b", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
      }
    },

    deploy: function() {
      line.body.velocity.y = 0;
      line.body.velocity.x = 300;
    },

    checkLine: function() {
      line.body.velocity.x = 0;
      this.isChecked = true;
    },

    checkAudio: function() {
      this.audioStopped = true;
    },

    skipLevel: function(){
      audio3.stop();
      this.game.state.start("level3b", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
  }
