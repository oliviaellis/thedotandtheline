var level5 = function(game){
  snakeSection = new Array(); //array of sprites that make the snake body sections
  snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
  numSnakeSections = 30; //number of snake body sections
  snakeSpacer = 4; //parameter that sets the spacing between sections
  this.point = null;
}

level5.prototype = {

  create: function () {
    // Next level shortcut for development
    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.nextLevel, this);

    cursors = this.game.input.keyboard.createCursorKeys();

    snakeHead = this.game.add.sprite(400, 300, 'line-segment');
    snakeHead.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

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
    this.track = this.game.add.audio('level5', 1, false);
    this.track.play();
    this.game.input.onDown.addOnce(() => {
     this.game.sound.context.resume();
    });
  },

  addPoint: function() {

    var widthPoints = this.width/16;
    var heightPoints = this.height/16;
    var x = Math.round(Math.random()*(widthPoints-1))*16;
    var y = Math.round(Math.random()*(heightPoints-1))*16;

    if(!this.point) {
        this.point = this.add.sprite(this.world.centerX, this.world.centerY, 'balls');
      }

    this.point.x = x;
    this.point.y = y;
  },

  increaseLength: function() {
    var x = 160;
    var y = 160;

    if(this.player.length != 0) {
      x = this.player[this.player.length-1].x + 16;
      y = this.player[this.player.length-1].y + 16;
    }

    var ball = this.add.sprite(x, y, 'line-segment');
    this.physics.arcade.enable(ball);

    this.player.push(ball);
  },

  isColliding: function(a, b) {
    if(a.body.hitTest(b.x, b.y)) {
      return true;
    }
    return false;
  },

  update: function () {

    // if(this.isColliding(this.player[0], this.point)) {
    //   this.increaseLength();
    //   this.addPoint();
    // }

    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;

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
    this.game.state.start("level6");
  }
}

// Snake by Patrick OReilly and Richard Davey
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
