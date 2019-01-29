var loadState = function(game){}

loadState.prototype = {
  preload: function () {
    var loadingLabel = this.game.add.text(80, 150, 'loading...');
    this.game.load.image('line1', 'assets/line.png');
    this.game.load.image('line2', 'assets/line.png');
    this.game.load.image('whiteline', 'assets/whiteline.png');
    this.game.load.image('balls', 'assets/balls.png');
    this.game.load.image('whiteball', 'assets/whiteball.png');
    this.game.load.image('line-segment', 'assets/line-segment.png');
    this.game.load.image('dot', 'assets/dot.png');
    this.game.load.image('background', 'assets/background.png');
    this.game.load.spritesheet('squiggle', 'assets/squigglesprites.png', 50, 50);

    this.game.load.audio('intro', 'assets/audio/intro.mp3');
    this.game.load.audio('level1', 'assets/audio/level1.mp3');
    this.game.load.audio('level2', 'assets/audio/level2.mp3');
    this.game.load.audio('level3', 'assets/audio/level3.mp3');
    this.game.load.audio('level4', 'assets/audio/level4.mp3');
    this.game.load.audio('level5', 'assets/audio/level5.mp3');
    this.game.load.audio('level6', 'assets/audio/boss.mp3');
    this.game.load.audio('outro', 'assets/audio/outro.mp3');
  },

  create: function () {
    this.game.state.start('menu');
  }
}
