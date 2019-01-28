var level1 = function(game){
}

level1.prototype = {

    create: function () {
      // initialize physics engine and stage
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 800, 600);
        this.game.stage.backgroundColor = '#FFFFFF';

      // create Line sprite
        line1 = this.game.add.sprite(100, 0, 'line1');
        line2 = this.game.add.sprite(100, 300, 'line2');
        this.game.physics.arcade.enable(line1);
        this.game.physics.arcade.enable(line2);

      // Manual next stage key
        cursors = this.game.input.keyboard.createCursorKeys();
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.nextLevel, this);

      // Configure enemies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.initEnemies();
        this.timer = this.game.time.events.loop(500, this.addEnemy, this);

      // Set up RNG
        var seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);
    },

    initEnemies: function(){
      // Create 5 enemies with speed -300 (toward left of screen)
        for(var i = 0; i <= 5; i++){
            var sprite = this.enemies.create(800, 100, 'balls', null, false);
            this.game.physics.arcade.enable(sprite);
            sprite.enableBody = true;
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

       this.game.physics.arcade.overlap(line1, this.enemies, this.hitHazard);
       this.game.physics.arcade.overlap(line2, this.enemies, this.hitHazard);
    },

    hitHazard: function () {
      console.log('Hit');
    },

    render: function () {
        this.game.debug.spriteInfo(line1, 32, 32);
        this.game.debug.spriteInfo(line2, 32, 600-32);
      },

    nextLevel: function(){
      this.game.state.start("level2");
    }
}
