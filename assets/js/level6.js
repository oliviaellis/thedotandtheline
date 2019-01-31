var level6 = function(game){
  snakeSection = new Array(); //array of sprites that make the snake body sections
  snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
  numSnakeSections = 30; //number of snake body sections
  snakeSpacer = 4; //parameter that sets the spacing between sections
  squiggleScale = 4;
  var seed = Date.now();
  this.random = new Phaser.RandomDataGenerator([seed]);
  this.score = 0;
  this.scoreText = null;
}

level6.prototype = {

    create: function () {
      // Next level shortcut for development
      cursors = this.game.input.keyboard.createCursorKeys();
      var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      wkey.onDown.addOnce(this.skipLevel, this);

      // Create squiggle
      squiggle = this.game.add.sprite(100, 100, 'squiggle');
      this.game.physics.enable(squiggle);
      squiggle.frame = 3;
      squiggle.scale.setTo(4);
      squiggle.animations.add('wiggle', [0, 1, 2, 3, 4], 10, true);
      squiggle.animations.play('wiggle');
      squiggle.body.collideWorldBounds = true;

      var x = this.random.integerInRange(-300, 300);
      squiggle.body.velocity.setTo(x, x);
      squiggle.body.bounce.set(0.8);

      // Configure snake
      snakeHead = this.game.add.sprite(400, 300, 'line-segment');
      snakeHead.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(snakeHead);
      snakeHead.body.collideWorldBounds = true;

      //  Init snakeSection array
      for (var i = 1; i <= numSnakeSections-1; i++)
      {
          snakeSection[i] = this.game.add.sprite(400, 300, 'line-segment');
          snakeSection[i].anchor.setTo(0.5, 0.5);
      }

      //  Init snakePath array
      for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
      {
          snakePath[i] = new Phaser.Point(400, 300);
      }
      // Set up audio
      audio6 = this.game.add.audio('level6', 1, false);
      audio6.play();
      audio6.onStop.add(this.nextLevel, this);
    },

    updateScore: function() {
      this.scoreText.setText('SCORE: ' + this.score);
    },

    isColliding: function(a, b) {
      var x = this.random.integerInRange(0, 800);
      var y = this.random.integerInRange(0, 600);
      squiggle.x = x;
      squiggle.y = y;
      squiggleScale -= 0.1;
      squiggle.scale.setTo(squiggleScale);
      this.score += 20;
      // this.updateScore();
    },

    update: function () {
      // Initial velocity 0
      snakeHead.body.velocity.setTo(0, 0);
      snakeHead.body.angularVelocity = 0;

      this.game.physics.arcade.overlap(snakeHead, squiggle, this.isColliding, null, this);

      if (cursors.up.isDown)
      {
          snakeHead.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));

          // Everytime the snake head moves, insert the new location at the start of the array,
          // and knock the last position off the end

          var part = snakePath.pop();

          part.setTo(snakeHead.x, snakeHead.y);

          snakePath.unshift(part);

          for (var i = 1; i <= numSnakeSections - 1; i++)
          {
              snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
              snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
          }
      }

      if (cursors.left.isDown)
      {
          snakeHead.body.angularVelocity = -300;
      }
      else if (cursors.right.isDown)
      {
          snakeHead.body.angularVelocity = 300;
      }

      if (squiggleScale === 0) {
        squiggle.kill();
      }

    },

    nextLevel: function() {
        this.game.state.start("win", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    },

    skipLevel: function(){
      audio6.stop();
      this.game.state.start("win", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
  }
