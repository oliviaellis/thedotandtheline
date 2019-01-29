var level6 = function(game){
  snakeSection = new Array(); //array of sprites that make the snake body sections
  snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
  numSnakeSections = 30; //number of snake body sections
  snakeSpacer = 4; //parameter that sets the spacing between sections
  this.score = 0;
  this.scoreText = null;
}

level6.prototype = {

    create: function () {
      // Next level shortcut for development
      cursors = this.game.input.keyboard.createCursorKeys();
      var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      wkey.onDown.addOnce(this.nextLevel, this);

      // Create squiggle
      squiggle = this.game.add.sprite(100, 100, 'squiggle');
      squiggle.frame = 3;
      squiggle.animations.add('wiggle', [0, 1, 2, 3, 4], 10, true);
      squiggle.animations.play('wiggle');

      // Configure snake
      snakeHead = this.game.add.sprite(400, 300, 'line-segment');
      snakeHead.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(snakeHead);

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

      this.score = 0;
      var style = {
        font: "16px Arial",
        fill: "#000",
        align: "center"
      };
      this.scoreText = this.game.add.text(10, 10, '', style);
      this.updateScore();

      // Set up audio
      this.track = this.game.add.audio('level6', 1, false);
      this.track.play();
      this.game.input.onDown.addOnce(() => {
       this.game.sound.context.resume();
      });
    },

    updateScore: function() {
      this.scoreText.setText('SCORE: ' + this.score);
    },

    isColliding: function(a, b) {
      this.score++;
      this.updateScore();
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

    },

    render: function () {
    },

    nextLevel: function(){
      this.track.stop();
      this.game.state.start("win");
    }
  }
