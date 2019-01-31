var level3c = function(game){
}

level3c.prototype = {

    create: function () {
      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.skipLevel, this);
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bg = this.game.add.sprite(0,0, 'enforcement');

      // Set up audio
        audio3 = this.game.add.audio('level3', 1, false);
        audio3.play();

        line = this.game.add.sprite(0, 580, 'full-line');
        this.game.physics.arcade.enable(line);

        target = this.game.add.sprite(400, 0, 'line-segment');
        this.game.physics.arcade.enable(target);
    },

    update: function () {
      if (line.x == 0 ) {
        line.body.velocity.x = 300;
      }

      if (line.x == 800) {
        line.body.velocity.x = -300;
      }

      this.spacebar.onDown.add(this.deploy, this);
      this.game.physics.arcade.overlap(line, target, this.nextLevel, null, this);

    },

    deploy: function() {
      line.body.velocity.x = 0;
      line.body.velocity.y = -300;
      if (line.y == 0) {
        line.body.velocity.y = 0;
      }
    },

    nextLevel: function(){
      this.game.state.start("level3d", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    },

    skipLevel: function(){
      audio3.stop();
      this.game.state.start("level4", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
  }
