var level3 = function(game){
  sceneCount = 0;
}

level3.prototype = {

    create: function () {
      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.skipLevel, this);
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bg = this.game.add.sprite(0,0, 'daredevil');

        line = this.game.add.sprite(0, 0, 'sideline');
        target = this.game.add.sprite(0, 300, 'target');
        this.game.physics.arcade.enable(target);
        this.game.physics.arcade.enable(line);
        line.body.collideWorldBounds = true;
        line.body.bounce.set(1);

      // Set up audio
        audio3 = this.game.add.audio('level3', 1, false);
        audio3.play();
        audio3.onStop.add(this.nextLevel, this);
    },

    checkOverlap: function(spriteA, spriteB) {
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    update: function () {

      if (cursors.up.isDown) {
        line.body.velocity.y = -200;
      }
      if (cursors.down.isDown) {
        line.body.velocity.y = 200;
      }

      if (this.spacebar.isDown) {
          line.body.velocity.y = 0;
      }

      this.spacebar.onDown.add(function () { this.checkOverlap(line, target);}, this);


    },

    nextScene: function() {
      sceneCount += 1;
      bg = this.game.add.sprite(0, 0, sceneCount+".png");
    },

    render: function () {
    },

    nextLevel: function(){
      this.game.state.start("level4");
    },

    skipLevel: function(){
      audio3.stop();
      this.game.state.start("level4");
    }
  }
