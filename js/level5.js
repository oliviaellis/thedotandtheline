var level5 = function(game){
  snakeSection = new Array(); //array of sprites that make the snake body sections
  snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
  numSnakeSections = 30; //number of snake body sections
  snakeSpacer = 4; //parameter that sets the spacing between sections
  point = null;
  this.score = 0;
  this.scoreText = null;
}

level5.prototype = {

  create: function () {
    // Next level shortcut for development
    cursors = this.game.input.keyboard.createCursorKeys();
    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.skipLevel, this);

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

    // Set up points
    point = null;
    this.addPoint();

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.timer = this.game.time.events.loop(3000, this.addEnemy, this);

    // Set up audio
    audio5 = this.game.add.audio('level5', 1, false);
    audio5.play();
    audio5.onStop.add(this.nextLevel, this);

    this.score = 0;
    var style = {
      font: "16px Arial",
      fill: "#000",
      align: "center"
    };
    this.scoreText = this.game.add.text(10, 10, '', style);
    this.updateScore();
  },

  addPoint: function() {
    // Set up RNG
    var seed = Date.now();
    this.random = new Phaser.RandomDataGenerator([seed]);

    var widthPoints = this.width/16;
    var heightPoints = this.height/16;
    var x = this.random.integerInRange(0, 800);
    var y = this.random.integerInRange(0, 600);
    point = this.add.sprite(x, y, 'balls');
    this.game.physics.arcade.enable(point);
  },

    addEnemy: function(){
      var x = this.random.integerInRange(50, 750);
      var y = this.random.integerInRange(50, 550);
      var sframe = this.random.integerInRange(0, 4);
      var sprite = this.enemies.create(x, y, 'squiggle');
      sprite.frame = sframe;
      this.game.physics.arcade.enable(sprite);
      sprite.enableBody = true;
      sprite.body.immovable = true;
      sprite.body.setSize(50, 50);

    },

  updateScore: function() {
    this.scoreText.setText('SCORE: ' + this.score);
  },

  getPoint: function(a, b) {
    point.kill();
    this.addPoint();
    this.score++;
    this.updateScore();
  },

  isColliding: function() {
    this.score--;
    this.updateScore();
  },

  update: function () {
    // Initial velocity 0
    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;

    this.game.physics.arcade.overlap(snakeHead, point, this.getPoint, null, this);
    this.game.physics.arcade.collide(snakeHead, this.enemies, this.isColliding, null, this);

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

  nextLevel: function(){
    this.game.state.start("level6");
  },

  skipLevel: function(){
    audio5.stop();
    this.game.state.start("level6");
  }
}

// Snake by Patrick OReilly and Richard Davey
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
