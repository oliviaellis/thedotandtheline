var bootState = function(game){
};

bootState.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('load');
  }
}
