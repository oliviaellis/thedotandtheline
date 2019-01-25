// Snake by Patrick OReilly and Richard Davey
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
var level4 = function(game){
}

var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 20; //number of snake body sections
var snakeSpacer = 6; //parameter that sets the spacing between sections

level4.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 800, 600);
    this.game.stage.backgroundColor = '#124184';
    cursors = this.game.input.keyboard.createCursorKeys();
    snakeHead = this.game.add.sprite(400, 300, 'balls');
    snakeHead.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(snakeHead, Phaser.Physics.ARCADE);
    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.nextLevel, this);

    //  Init snakeSection array
    for (var i = 1; i <= numSnakeSections-1; i++)
    {
      snakeSection[i] = this.game.add.sprite(400, 300, 'balls');
      snakeSection[i].anchor.setTo(0.5, 0.5);
    }

    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
    {
      snakePath[i] = new Phaser.Point(400, 300);
    }

  },

  update: function () {

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
    this.game.debug.spriteInfo(snakeHead, 32, 32);
  },

  nextLevel: function(){
    this.game.state.start("level5");
  }
}
