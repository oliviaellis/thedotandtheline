var level3a = function(game){
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
        audio3 = this.game.add.audio('level3', 1, false);
        audio3.play();
        audio3.onStop.add(this.nextLevel, this);

        line = this.game.add.sprite(-750, 0, 'sideline');
        this.game.physics.arcade.enable(line);

        target = this.game.add.sprite(780, 300, 'line-segment');
        this.game.physics.arcade.enable(target);
    },

    update: function () {
      if (line.body.top == 0 ) {
        line.body.velocity.y = 300;
      }

      if (line.body.top == 600) {
        line.body.velocity.y = -300;
      }

      this.spacebar.onDown.add(this.deploy, this);
      this.game.physics.arcade.overlap(line, target, this.nextLevel, null, this);

    },

    deploy: function() {
      line.body.velocity.y = 0;
      line.body.velocity.x = 300;
      if (line.x == 0) {
        line.body.velocity.x = 0;
      }
    },

    nextLevel: function(){
      this.game.state.start("level3b", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    },

    skipLevel: function(){
      audio3.stop();
      this.game.state.start("level4", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
  }
