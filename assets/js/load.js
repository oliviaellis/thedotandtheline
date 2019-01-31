var loadState = function(game){}

loadState.prototype = {
  preload: function () {
    this.game.load.image('line1', 'images/line.png');
    this.game.load.image('line2', 'images/line.png');
    this.game.load.image('whiteline', 'images/whiteline.png');
    this.game.load.image('sideline', 'images/sideline.png');
    this.game.load.image('balls', 'images/balls.png');
    this.game.load.image('whiteball', 'images/whiteball.png');
    this.game.load.image('line-segment', 'images/line-segment.png');
    this.game.load.image('dot', 'images/dot.png');
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('target', 'images/target.png');
    this.game.load.image('affairs', 'images/affairs.png');
    this.game.load.image('art', 'images/art.png');
    this.game.load.image('enforcement', 'images/enforcement.png');
    this.game.load.image('daredevil', 'images/daredevil.png');
    this.game.load.image('sportsman', 'images/sportsman.png');

    this.game.load.spritesheet('squiggle', 'images/squigglesprites.png', 50, 50);

    this.game.load.audio('intro', 'audio/intro.mp3');
    this.game.load.audio('level1', 'audio/level1.mp3');
    this.game.load.audio('level2', 'audio/level2.mp3');
    this.game.load.audio('level3', 'audio/level3.mp3');
    this.game.load.audio('level4', 'audio/level4.mp3');
    this.game.load.audio('level5', 'audio/level5.mp3');
    this.game.load.audio('level6', 'audio/boss.mp3');
    this.game.load.audio('outro', 'audio/outro.mp3');
  },

  create: function () {
    this.game.state.start('menu');
  }
}
