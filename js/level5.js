var level5 = function(game){
}

var handle1;
var handle2;

var line1;
var line2;

level5.prototype = {

  create: function () {

    this.game.stage.backgroundColor = '#124184';

    handle1 = this.game.add.sprite(100, 200, 'balls', 0);
    handle1.anchor.set(0.5);
    handle1.inputEnabled = true;
    handle1.input.enableDrag(true);

    handle2 = this.game.add.sprite(400, 300, 'balls', 0);
    handle2.anchor.set(0.5);
    handle2.inputEnabled = true;
    handle2.input.enableDrag(true);

    handle3 = this.game.add.sprite(200, 400, 'balls', 0);
    handle3.anchor.set(0.5);
    handle3.inputEnabled = true;
    handle3.input.enableDrag(true);

    line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
    line2 = new Phaser.Line(handle2.x, handle2.y, handle3.x, handle3.y);

    var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.nextLevel, this);
  },

  update: function () {
    line1.fromSprite(handle1, handle2, false);
    line2.fromSprite(handle2, handle3, false);
  },

  render: function () {
    this.game.debug.geom(line1);
    this.game.debug.geom(line2);
  },

  nextLevel: function(){
    this.game.state.start("level6");
  }
}
