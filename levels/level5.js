var nikus_trigger, door3_closed_trigger, door4_closed_trigger, door4_col;
var nikus, nikus_talk;

var level5_text_content1 = '* ♩ Olololo! ♩\n   ♩ Tutaj jest wiele drzwi! ♩';
var level5_text_content2 = '* ♩ Niektóre zamknięte... ♩\n   ...a niektóre nie!\n* ♩ Tralala! ♩ Tra la la. ♩';
var level5_text_content3 = '* To śpiewałem ja,  Kamień.\n   Kamienikus.';
var level5_text_content4 = '* To właśnie ja.\n   ♩ Tra. La. ♩ \n   ♩♩ La. ♩♩';
var level5_text_content5 = '* Słyszałemżegdzieśsąukryte\n   tajemnedrzwialeciiii...';

var level5_text_content6 = '* Wygląda to na dziurę...\n   ...zatkaną kurzem.';

var level5_text_content7 = '* Wyglądają na niezniszczalne.';

var level5_text_content8 = '* Drzwi pękły pod naporem\n   przytłaczającej siły Nokii!';


var level5 = {
    preload: function () {
        if (debugMode) {
            game.load.image('bg_level5a', 'assets/levels/level5a.png');
            game.load.image('bg_level5b', 'assets/levels/level5b.png');
            game.load.image('bg_level5c', 'assets/levels/level5c.png');

            game.load.image('nikus', 'assets/characters/kamienikus.png');
            game.load.image('av_nikus', 'assets/avatars/av_nikus.png');

            game.load.audio('nikus', 'assets/sounds/talk_nik.ogg');

            game.load.image('ramka', 'assets/misc/ramka.png');
            game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

            game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');

            loadTransitionPlugin();
        }
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        if (!globalParrotDelivered)
            bg = game.add.sprite(0, 0, 'bg_level5a');
        else if (!globalLegoDoorDestroyed)
            bg = game.add.sprite(0, 0, 'bg_level5b');
        else
            bg = game.add.sprite(0, 0, 'bg_level5c');

        door1 = createTrigger(0, 475, 640, 5);
        door2 = createTrigger(280, 130, 80, 5);

        door3 = createTrigger(0, 160, 5, 135);
        door4 = createTrigger(635, 160, 5, 135);

        door3_closed_trigger = createTrigger(0, 160, 40, 135);
        door4_closed_trigger = createTrigger(600, 160, 40, 135);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        if (!globalParrotDelivered) col_sprites.push(makeRectangle(0, 160, 20, 135, col));
        col_sprites.push(makeRectangle(0, 160, 170, 36, col));
        col_sprites.push(makeRectangle(0, 292, 112, 200, col));
        col_sprites.push(makeRectangle(112, 413, 120, 80, col));
        col_sprites.push(makeRectangle(360, 0, 280, 160, col));
        col_sprites.push(makeRectangle(540, 160, 140, 36, col));
        col_sprites.push(makeRectangle(528, 292, 112, 200, col));
        col_sprites.push(makeRectangle(408, 413, 120, 80, col));

        col.visible = false;

        if (!globalLegoDoorDestroyed)
            door4_col = createTrigger(620, 160, 20, 135);

        nikus = game.add.sprite(80, 120, 'nikus');

        nikus_talk = game.add.audio('nikus', 1, true);

        nikus_trigger = createTrigger(100, 150, 95, 70);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 9) {
            stopDrako();
            level5.nikusDialog();
        }
        else if (dialogState >= 10 && dialogState <= 11) {
            stopDrako();
            level5.door3ClosedDialogCutscene();
        }
        else if (dialogState >= 12 && dialogState <= 13) {
            stopDrako();
            level5.door4ClosedDialogCutscene();
        }
        else if (dialogState >= 14 && dialogState <= 16) {
            stopDrako();
            level5.door4ClosedDialog2Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 150, 'level4'));
            game.physics.arcade.collide(drako, door2, doorGenerator(302, 400, 'level6'));
            game.physics.arcade.collide(drako, door3, doorGenerator(580, 200, 'level7'));
            game.physics.arcade.collide(drako, door4, doorGenerator(24, 200, 'level9'));

            if (!globalLegoDoorDestroyed)
                game.physics.arcade.collide(drako, door4_col);

            if (spaceDown() && game.physics.arcade.overlap(drako, nikus_trigger))
                level5.nikusDialogInit();

            if (!globalParrotDelivered && spaceDown() && game.physics.arcade.overlap(drako, door3_closed_trigger))
                level5.door3ClosedDialogInit();

            if (!globalNokiaTaken && !globalLegoDoorDestroyed && spaceDown() && game.physics.arcade.overlap(drako, door4_closed_trigger))
                level5.door4ClosedDialogInit();
            else if (!globalLegoDoorDestroyed && spaceDown() && game.physics.arcade.overlap(drako, door4_closed_trigger))
                level5.door4ClosedDialog2Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(nikus) {
            nikus.destroy();
            nikus = null;
        }

        if(nikus_trigger) {
            nikus_trigger.destroy();
            nikus_trigger = null;
        }

        if(door3_closed_trigger) {
            door3_closed_trigger.destroy();
            door3_closed_trigger = null;
        }

        if(door4_closed_trigger) {
            door4_closed_trigger.destroy();
            door4_closed_trigger = null;
        }

        if(nikus_talk) {
            nikus_talk.destroy();
            nikus_talk = null;
        }

        if(door4_col) {
            door4_col.destroy();
            door4_col = null;
        }
    },

    nikusDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_nikus');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    nikusDialog: function() {
        if (dialogState == 0)
            renderText(text, level5_text_content1, nikus_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level5_text_content2, nikus_talk);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level5_text_content3, nikus_talk);
        else if (dialogState == 5)
            textWaiter(6, 7, text);
        else if (dialogState == 6)
            renderText(text, level5_text_content4, nikus_talk);
        else if (dialogState == 7)
            textWaiter(8, 9, text);
        else if (dialogState == 8)
            renderText(text, level5_text_content5, nikus_talk);
        else if (dialogState == 9)
            textFinishWaiter();
    },

    door3ClosedDialogInit: function() {
        dialogState = 10;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 11; });
        lockSpace(0.3);
    },

    door3ClosedDialogCutscene: function() {
        if (dialogState == 10)
            renderText(text, level5_text_content6);
        else if (dialogState == 11)
            textFinishWaiter();
    },

    door4ClosedDialogInit: function() {
        dialogState = 12;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 13; });
        lockSpace(0.3);
    },

    door4ClosedDialogCutscene: function() {
        if (dialogState == 12)
            renderText(text, level5_text_content7);
        else if (dialogState == 13)
            textFinishWaiter();
    },

    door4ClosedDialog2Init: function() {
        dialogState = 14;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 15; });
        lockSpace(0.3);
    },

    door4ClosedDialog2Cutscene: function() {
        if (dialogState == 14)
            renderText(text, level5_text_content8);
        else if (dialogState == 15) {
            globalLegoDoorDestroyed = true;
            bg.loadTexture('bg_level5c');
            dialogState = 16;
            dropItem();
        }
        else if (dialogState == 16)
            textFinishWaiter();
    }
};

