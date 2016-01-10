var pin_dialog, pinDialogOn = false;
var pin, border, text;

var text_content = 'Lorem ipsum dolor sit amet, enim percipit\net vim, ei mea tritani platonem.\nMel sale invenire id, per ad meis platonem.';

var level2 = {
    preload: function() {
        game.load.image('bg_level2', 'assets/level2.png');

        game.load.image('pin1', 'assets/pin1.png');
        game.load.image('ramka', 'assets/ramka.png');

        game.load.spritesheet('drako', 'assets/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/determination_sans_0.png', 'assets/determination_sans.xml');

        loadTransitionPlugin();
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if(!cursors)
            cursors = game.input.keyboard.createCursorKeys();

        bg = game.add.sprite(0, 0, 'bg_level2');

        door1 = game.add.group();
        door1.enableBody = true;
        door1.physicsBodyType = Phaser.Physics.ARCADE;
        door1.visible = false;

        makeRectangle(0, 475, 640, 5, door1);

        pin_dialog = game.add.group();
        pin_dialog.enableBody = true;
        pin_dialog.physicsBodyType = Phaser.Physics.ARCADE;
        pin_dialog.visible = false;

        makeRectangle(0, 325, 640, 5, pin_dialog);

        pin = game.add.sprite(265, 168, 'pin1');

        if(nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        setLoadBlock();
    },

    update: function() {
        if(loadBlock) return;

        if(pinDialogOn) {
            stopDrako();
            this.playCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, this.door1Callback);
            game.physics.arcade.collide(drako, pin_dialog, this.pinDialogCallback);

            moveDrako();
        }
    },

    shutdown: function() {
        genericCleanup();

        if(pin) {
            pin.destroy();
            pin = null;
        }

        if(border) {
            border.destroy();
            border = null;
        }

        if(text) {
            text.destroy();
            text = null;
        }

    },

    door1Callback: function() {
        if(!doorActivated) {
            doorActivated = true;
            nextDrakoX = 275;
            nextDrakoY = 20;
            transitionPlugin.to('level1');
        }
    },

    pinDialogCallback: function() {
        pinDialogOn = true;
        border = game.add.sprite(31, 10, 'ramka');
        text = game.add.bitmapText(62, 40, 'determination_font', '', 29);
        displayText();
    },

    playCutscene: function() {
        renderText(text, text_content);
    }
};

