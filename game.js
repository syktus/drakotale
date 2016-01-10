var bg, drako, col, cursors, col_sprites, door1, door2, doorActivated, loadBlock = false;

var border, text, avatar, choice1, choice2;

/* GLOBAL STATE FLAGS */

var globalPenguinCutsceneTriggered = true;//false;

/**********************/

var dialogState = 0;
var nextDrakoX = null, nextDrakoY = null;

var transitionPlugin;

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('level4', level4);

game.state.start('level4');
