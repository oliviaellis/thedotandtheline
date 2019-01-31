var level1 = function(game){

}

level1.prototype = {

    create: function () {
      // initialize physics engine and stage
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 800, 600);

      // Background and animation
        this.game.stage.backgroundColor = '#FFFFFF';
        bg = this.game.add.sprite(0,0, 'background');
        this.game.add.tween(bg).to({alpha: 0}, 1000, "Linear", true);
      // create Dot sprite
        dot = this.game.add.sprite(this.game.width/2, this.game.height/2, 'dot');
        this.game.time.events.add(Phaser.Timer.SECOND, this.startAnimation, this);

      // create Line sprite
        line1 = this.game.add.sprite(100, 0, 'line1');
        line2 = this.game.add.sprite(100, 300, 'line2');
        this.game.physics.arcade.enable(line1);
        this.game.physics.arcade.enable(line2);
        line1.body.setSize(20, 300);
        line2.body.setSize(20, 300);

      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.add(this.skipLevel, this);

      // Configure enemies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.initEnemies();
        this.timer = this.game.time.events.loop(500, this.addEnemy, this);

      // Set up RNG
        var seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);

      // Set up audio
        audio1 = this.game.add.audio('level1', 1, false);
        audio1.play();
        audio1.onStop.add(this.nextLevel, this);
    },

    startAnimation: function () {
      this.game.add.tween(dot).to({x: 900}, 2000, Phaser.Easing.Exponential.In, true);
    },

    updateScore: function() {
      this.scoreText.setText('SCORE: ' + this.score);
    },

    initEnemies: function(){
      // Create 5 enemies with speed -300 (toward left of screen)
        for(var i = 0; i <= 5; i++){
            var sprite = this.enemies.create(800, 100, 'balls', null, false);
            this.game.physics.arcade.enable(sprite);
            sprite.enableBody = true;
            sprite.body.setSize(25, 25);
            sprite.body.velocity.x = -300;
        }
    },

    addEnemy: function(){
      // 50% chance of spawning an enemy every 0.5 seconds
        if(Phaser.Utils.chanceRoll(50)){
          // Phaser function that reuses "killed" sprites
            var enemy = this.enemies.getFirstDead();
          // Calculate random spawn height
            var y = this.random.integerInRange(10, this.game.world.height - 10);
            enemy.reset(800, y);
            enemy.body.velocity.x = this.random.integerInRange(-200, -500);
          // Kill enemies when they exit screen
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
        }

    },

    damageLine: function (line, enemy) {
      enemy.kill();
    },

    nextLevel: function(){
      this.game.state.start("level2", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    },

    skipLevel: function(){
      audio1.stop();
      this.game.state.start("level2", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    },

    update: function () {
      line1.body.velocity.x = 0;
      line2.body.velocity.x = 0;

      if (cursors.up.isDown && line2.bottom > 300) {
        line2.bottom = line2.bottom - 3;
      } else if (line2.bottom < 600) {
        line2.bottom = line2.bottom + 3;
      }

      if (cursors.down.isDown && line1.top < 300) {
        line1.top = line1.top + 3;
      } else if (line1.top > 0) {
        line1.top = line1.top - 3;
      }

      if (cursors.left.isDown) {
        line1.body.velocity.x = -150;
        line2.body.velocity.x = -150;
      } else if (cursors.right.isDown) {
        line1.body.velocity.x = 150;
        line2.body.velocity.x = 150;
      }

      this.game.physics.arcade.overlap(line1, this.enemies, this.damageLine, null, this);
      this.game.physics.arcade.overlap(line2, this.enemies, this.damageLine, null, this);

    }
}
