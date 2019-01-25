var level2 = function(game){
}

level2.prototype = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 800, 600);
        this.game.stage.backgroundColor = '#000000';
        cursors = this.game.input.keyboard.createCursorKeys();
        line = this.game.add.sprite(100, 0, 'whiteline');
        this.game.physics.arcade.enable(line);
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);
    },

    update: function () {
      line.body.velocity.x = 0;
      line.top = 0;

      if (cursors.up.isDown) {
        line.bottom = 300;
      }

      if (cursors.down.isDown) {
        line.top = 300;
      }

      if (cursors.left.isDown) {
        line.body.velocity.x = -150;
      } else if (cursors.right.isDown) {
        line.body.velocity.x = 150;
      }
    },

    render: function () {
      this.game.debug.spriteInfo(line, 32, 32);
    },

    nextLevel: function(){
      this.game.state.start("level3");
    }
  }
