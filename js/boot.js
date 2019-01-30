var bootState = function(game){
};

bootState.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    import { createTransition } from "phaser-state-transition";

    const EnteringTransition = createTransition({
        props: {
            x: game => this.game.width
        }
    });


    this.game.state.start('load');
  }
}
