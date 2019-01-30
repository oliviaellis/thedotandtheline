var level3 = function(game){
}

level3.prototype = {

    create: function () {
      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bg = this.game.add.sprite(0,0, 'daredevil');

        line = this.game.add.sprite(0, 0, 'sideline');
        target = this.game.add.sprite(0, 300, 'target');
        this.game.physics.arcade.enable(target);
        this.game.physics.arcade.enable(line);
        line.body.collideWorldBounds = true;
        line.body.bounce.set(1);

      // Set up audio
        this.track = this.game.add.audio('level3', 1, false);
        this.track.play();
        this.track.onStop.add(this.nextLevel, this);
    },

    checkOverlap: function(spriteA, spriteB) {
      console.log('Checking overlap');
      if (line.body.velocity.y = 0) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        var overlap = Phaser.Rectangle.intersects(boundsA, boundsB);
        if (overlap) {
          nextScene();
        }
      }
    },

    update: function () {

      if (cursors.up.isDown) {
        line.body.velocity.y = -200;
      }
      if (cursors.down.isDown) {
        line.body.velocity.y = 200;
      }

      if (this.spacebar.isDown) {
        if (line.body.velocity.y = 0) {
          line.body.velocity.y = speed;
        } else {
          line.body.velocity.y = 0;
        }
      }

      this.game.physics.arcade.overlap(line, target, this.checkOverlap, null, this);
    },

    nextScene: function() {
      console.log('Nice dude, it works');
    },

    render: function () {
    },

    nextLevel: function(){
      this.track.stop();
      this.game.state.start("level4");
    }
  }
