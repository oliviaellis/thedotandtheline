var level4 = function(game){
  this.cursors = null;
  this.currentMovement = 2;
  this.player = null;
  this.point = null;
  this.speed = 0;
  this.score = 0;
  this.scoreText = null;
  this.movement = {
    'UP' : 1,
    'RIGHT' : 2,
    'DOWN' : 4,
    'LEFT' : 8,
  }
}

level4.prototype = {

  create: function () {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.skipLevel, this);
    this.point = null;
    this.addPoint();
    this.player = [];
    this.game.stage.backgroundColor = '#FFFFFF';
    for(var i = 0; i < 4; i++) {
      this.increaseLength();
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
      audio4 = this.game.add.audio('level4', 1, false);
      audio4.play();
      audio4.onStop.add(this.nextLevel, this);

      this.timer = this.game.time.events.loop(5000, this.increaseSpeed, this);
  },

  addPoint: function() {
    var widthPoints = this.game.width/16;
    var heightPoints = this.game.height/16;
    var x = Math.round(Math.random()*(widthPoints-1))*16;
    var y = Math.round(Math.random()*(heightPoints-1))*16;
    if(!this.point) {
      this.point = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'balls')
    }
    this.game.physics.enable(this.point);
    this.point.body.setSize(25, 25);
    this.point.x = x;
    this.point.y = y;
  },

  increaseLength: function() {
    var x = 160;
    var y = 160;
    if(this.player.length != 0) {
      x = this.player[this.player.length-1].x + 50;
      y = this.player[this.player.length-1].y + 50;
    }
    var segment = this.game.add.sprite(x, y, 'line-segment');
    this.game.physics.arcade.enable(segment);
    segment.anchor.setTo(0.5, 0.5);

    this.player.push(segment);

    this.player[0].body.collideWorldBounds = true;
    this.player[0].body.setSize(25, 25);
  },

  increaseSpeed: function() {
    if (this.speed < 6) {
      this.speed++;
    }
  },

  updateMovementPosition: function() {
    if (this.cursors.up.isDown) {
      if(this.currentMovement != this.movement.DOWN) {
        this.currentMovement = this.movement.UP;
      }
    }

    if (this.cursors.right.isDown) {
      if(this.currentMovement != this.movement.LEFT) {
        this.currentMovement = this.movement.RIGHT;
      }
    }

    if (this.cursors.down.isDown) {
      if(this.currentMovement != this.movement.UP) {
        this.currentMovement = this.movement.DOWN;
      }
    }

    if (this.cursors.left.isDown){
      if(this.currentMovement != this.movement.RIGHT) {
        this.currentMovement = this.movement.LEFT;
      }
    }
  },

  getPoint: function(a, b) {
    this.increaseLength();
    this.addPoint();
    this.score++;
    this.updateScore();
  },

  updateScore: function() {
    this.scoreText.setText('SCORE: ' + this.score);
  },

  update: function () {
    this.updateMovementPosition();

    this.game.physics.arcade.overlap(this.player[0], this.point, this.getPoint, null, this);

    var oldX, oldY;
    for(var i = 0; i < this.player.length; i++) {
      var x = this.player[i].x;
      var y = this.player[i].y;
      if(i != 0) {
        this.player[i].x = oldX;
        this.player[i].y = oldY;
      }

      oldX = x;
      oldY = y;
    }

    switch(this.currentMovement) {
      case this.movement.UP:
        this.player[0].y -= this.speed;
      break;
      case this.movement.RIGHT:
        this.player[0].x += this.speed;
      break;
      case this.movement.DOWN:
        this.player[0].y += this.speed;
      break;
      case this.movement.LEFT:
        this.player[0].x -= this.speed;
      break;
    }
  },

  render: function () {
  },

  nextLevel: function(){
    this.game.state.start("level5", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
  },

  skipLevel: function(){
    audio4.stop();
    this.game.state.start("level5", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
  }
}
