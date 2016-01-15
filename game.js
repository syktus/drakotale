var bg, drako, col, cursors, col_sprites, door1, door2, door3, door4, doorActivated, loadBlock = false;

var border, text, avatar, choice1, choice2, heart;

/* GLOBAL STATE FLAGS */

var debugMode = false;

var globalPenguinCutsceneTriggered = false;
var globalMlodyDialog1Completed = false;
var globalComputerDialogCompleted = false;
var globalMiszaDialog1Triggered = false;
var globalParrotTaken = false;
var globalParrotDelivered = false;
var globalRyokFirstChatPassed = false;
var globalSucharToldToRyok = false;
var globalNokiaTaken = false;
var globalLegoDoorDestroyed = false;
var globalMiyaChatComplete = false;
var globalKumaAskedForKapcie = false;
var globalKapcieTaken = false;
var globalKumaGotKapcie = false;
var globalClothTaken = false;
var globalClothWashed = false;
var globalKumaHelped = false;
var globalWilkDialogComplete = false;

var globalCake1Taken = false;
var globalCake2Taken = false;
var globalCake3Taken = false;
var globalCake1Delivered = false;
var globalCake2Delivered = false;
var globalCake3Delivered = false;

var globalTKDialogComplete = false;
var globalTKHappy = false;

var globalCakeDelivered = 0;

var globalAilishTalkTriggered = false;
var globalPaintingTouched = false;
var globalAilishHappy = false;

/**********************/

var dialogState = 0;
var nextDrakoX = null, nextDrakoY = null;

var transitionPlugin;

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('intro', intro);
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('level4', level4);
game.state.add('level5', level5);
game.state.add('level6', level6);
game.state.add('level7', level7);
game.state.add('level8', level8);
game.state.add('level9', level9);
game.state.add('level10', level10);
game.state.add('level11', level11);
game.state.add('level12', level12);
game.state.add('level13', level13);
game.state.add('level14', level14);
game.state.add('final', final);

game.state.start('intro');

//takenItem = ITEM_PARROT;

var music_intro, music_overworld, music_level2, music_level14, music_outro, music_dogsong;
