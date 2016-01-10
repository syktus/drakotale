var bg, drako, col, cursors, col_sprites, door1, doorActivated, loadBlock = false;

var border, text;

/* GLOBAL STATE FLAGS */

var globalPenguinCutsceneTriggered = false;

/**********************/

var dialogState = 0;
var nextDrakoX = null, nextDrakoY = null;

var transitionPlugin;

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('level1', level1);
game.state.add('level2', level2);

game.state.start('level2');
