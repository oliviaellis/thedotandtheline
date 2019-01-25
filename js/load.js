var loadState = function(game){}

loadState.prototype = {
  preload: function () {
    var loadingLabel = this.game.add.text(80, 150, 'loading...');
    this.game.load.image('line', 'assets/line.png');
    this.game.load.image('whiteline', 'assets/whiteline.png');
    this.game.load.image('balls', 'assets/balls.png');
    this.game.load.image('line-segment', 'assets/line-segment.png');
  },

  create: function () {
    this.game.state.start('menu');
  }
}
