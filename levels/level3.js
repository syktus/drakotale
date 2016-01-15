var parrot_trigger;
var parrot;

var level3_text_content1 = '* Papuga Katarzynka.\n   Wygląda na samotną.';


var level3 = {
    preload: function () {
        if (debugMode) {
            game.load.image('bg_level3', 'assets/levels/level3.png');

            game.load.image('parrot', 'assets/items/item1.png');
            game.load.image('parrot_carry', 'assets/items/item1_carry.png');

            game.load.image('heart', 'assets/misc/heart.png');
            game.load.image('ramka', 'assets/misc/ramka.png');
            game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

            game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');

            loadTransitionPlugin();
        }
    },

    create: function () {
        if (!(music_overworld.isPlaying)) music_overworld.play();
        if (music_level2.isPlaying) music_level2.stop();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        bg = game.add.sprite(0, 0, 'bg_level3');

        door1 = createTrigger(0, 475, 640, 5);
        door2 = createTrigger(280, 160, 80, 5);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(250, 0, 30, 200, col));
        col_sprites.push(makeRectangle(360, 0, 30, 200, col));
        if(!globalParrotTaken)
            col_sprites.push(makeRectangle(390, 143, 40, 57, col));

        col.visible = false;

        if (!globalParrotTaken) {
            parrot = game.add.sprite(390, 143, 'parrot');

            parrot_trigger = createTrigger(390, 140, 60, 80);
        }

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 1) {
            stopDrako();
            level3.parrotInteractInactive();
        }
        else if (dialogState >= 2 && dialogState <= 7) {
            stopDrako();
            level3.parrotInteractActive();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 20, 'level2'));
            game.physics.arcade.collide(drako, door2, doorGenerator(302, 400, 'level4'));

            if (!globalMiszaDialog1Triggered && spaceDown() && game.physics.arcade.overlap(drako, parrot_trigger))
                level3.parrotDialogInit();
            else if (!globalParrotTaken && spaceDown() && game.physics.arcade.overlap(drako, parrot_trigger))
                level3.parrotDialog2Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(parrot) {
            parrot.destroy();
            parrot = null;
        }

        if(parrot_trigger) {
            parrot_trigger.destroy();
            parrot_trigger = null;
        }
    },

    parrotDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    parrotInteractInactive: function() {
        if (dialogState == 0)
            renderText(text, level3_text_content1);
        else if (dialogState == 1)
            textFinishWaiter();
    },

    parrotDialog2Init: function() {
        dialogState = 2;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 3 });
        lockSpace(0.3);
    },

    parrotInteractActive: function() {
        if (dialogState == 2)
            renderText(text, level3_text_content1);
        else if (dialogState == 3) {
            setupChoice(406, true);
            dialogState = 4;
        }
        else if (dialogState == 4)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 5);
        else if (dialogState == 5)
            choiceWaiter(6, 7);
        else if (dialogState == 6) {
            takeItem(ITEM_PARROT);
            globalParrotTaken = true;
            parrot.visible = false;
            dialogState = 7;
        }
        else if (dialogState == 7)
            choiceFinish();
    }
};
