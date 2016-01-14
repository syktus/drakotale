var ryok_trigger, door1_closed_trigger;
var ryok, ryok_talk, door1_col;

var level7_text_content1 = '* Rymy są, lecz brak sucharów\n   w moim życiu smaku brak';
var level7_text_content2 = '* Łzy same do oczu płyną\n   i mnie zaraz trafi szlag...';

var level7_choice_content1 = ['Lecz nie wina\nto Pingwina?', 'Idź się wyśpij!'];

var level7_text_content3 = '* Moja dusza wnet nieżywa\n   nie pingwina – detektywa!';
var level7_text_content4 = '* Puenta w tym sucharze\n   będzie bardzo chora:';
var level7_text_content5 = '* Czemu detektyw mieszka\n   blisko jeziora?';
var level7_text_content6 = 'A: Chyba trochę się rozmarzę -\n    - bo jest kurna marynarzem ??';
var level7_text_content7 = 'B: Wie to stary,\n    wie to młody\n    że tak bliżej ma doWody! ??';

var level7_choice_content2 = ['Marynarzem', 'DoWody!'];

var level7_text_content8 = '* To w sumie bez sensu.';
var level7_text_content9 = '* Toż to SUCHAR!!!\n   HAHAHA!!';
var level7_text_content10 = '* Twa wędrówka niechaj trwa!\n* I byś nadal brnął naprzód\n* musisz zbadać pewien but!';

var level7_text_content11 = '* Co mówi czarodziej,\n   kiedy robi pranie?';
var level7_text_content12 = '* Rzeczywiście!';

var level7_text_content13 = 'Drzwi są zamknięte.';

var level7 = {
    preload: function () {
        game.load.image('bg_level7', 'assets/levels/level7.png');

        game.load.image('ryok_happy', 'assets/characters/ryok_happy.png');
        game.load.image('ryok_sad', 'assets/characters/ryok_sad.png');

        game.load.image('av_ryok_sad', 'assets/avatars/av_ryok_sad.png');
        game.load.image('av_ryok_happy', 'assets/avatars/av_ryok_happy.png');

        game.load.audio('ryok', 'assets/sounds/talk_ryok.ogg');

        game.load.image('heart', 'assets/misc/heart.png');
        game.load.image('ramka', 'assets/misc/ramka.png');
        game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');

        loadTransitionPlugin();
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        bg = game.add.sprite(0, 0, 'bg_level7');

        door1 = createTrigger(0, 160, 5, 135);
        door2 = createTrigger(635, 160, 5, 135);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        if (!globalSucharToldToRyok) {
            door1_col = createTrigger(0, 160, 20, 135);
        }
        col_sprites.push(makeRectangle(0, 160, 101, 36, col));
        col_sprites.push(makeRectangle(0, 292, 112, 400, col));
        col_sprites.push(makeRectangle(0, 0, 640, 160, col));
        col_sprites.push(makeRectangle(112, 413, 416, 80, col));
        col_sprites.push(makeRectangle(540, 160, 140, 36, col));
        col_sprites.push(makeRectangle(528, 292, 112, 200, col));
        col_sprites.push(makeRectangle(300, 100, 190, 100, col));
        col_sprites.push(makeRectangle(340, 200, 100, 20, col));
        col_sprites.push(makeRectangle(158, 150, 76, 62, col));

        col.visible = false;

        door1_closed_trigger = createTrigger(0, 160, 40, 135);

        if (!globalSucharToldToRyok)
            ryok = game.add.sprite(150, 100, 'ryok_sad');
        else
            ryok = game.add.sprite(150, 100, 'ryok_happy');

        ryok_trigger = createTrigger(138, 150, 116, 82);

        ryok_talk = game.add.audio('ryok', 1, true);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(580, 200);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 8) {
            stopDrako();
            level7.ryokDialogCutscene();
        }
        else if (dialogState >= 9 && dialogState <= 30) {
            stopDrako();
            level7.ryokDialog2Cutscene();
        }
        else if (dialogState >= 31 && dialogState <= 34) {
            stopDrako();
            level7.ryokDialog3Cutscene();
        }
        else if (dialogState >= 35 && dialogState <= 36) {
            stopDrako();
            level7.door1ClosedDialogCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(580, 200, 'level8'));
            game.physics.arcade.collide(drako, door2, doorGenerator(24, 200, 'level5'));

            if (!globalSucharToldToRyok)
                game.physics.arcade.collide(drako, door1_col);

            if (!globalSucharToldToRyok && spaceDown() && game.physics.arcade.overlap(drako, door1_closed_trigger))
                level7.door1ClosedDialogInit();

            if (!globalRyokFirstChatPassed && spaceDown() && game.physics.arcade.overlap(drako, ryok_trigger))
                level7.ryokDialogInit();
            else if (!globalSucharToldToRyok && spaceDown() && game.physics.arcade.overlap(drako, ryok_trigger))
                level7.ryokDialog2Init();
            else if (spaceDown() && game.physics.arcade.overlap(drako, ryok_trigger))
                level7.ryokDialog3Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(ryok) {
            ryok.destroy();
            ryok = null;
        }

        if(ryok_trigger) {
            ryok_trigger.destroy();
            ryok_trigger = null;
        }

        if(ryok_talk) {
            ryok_talk.destroy();
            ryok_talk = null;
        }

        if(door1_closed_trigger) {
            door1_closed_trigger.destroy();
            door1_closed_trigger = null;
        }

        if(door1_col) {
            door1_col.destroy();
            door1_col = null;
        }
    },

    ryokDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ryok_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        text.tint = 0xFF69B4;
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    ryokDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level7_text_content1, ryok_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level7_text_content2, ryok_talk);
        else if (dialogState == 3)
            genericWaiter(4);
        else if (dialogState == 4) {
            text.setText('');
            setupChoice(348);
            dialogState = 5;
        }
        else if (dialogState == 5)
            renderChoice(choice1, choice2, level7_choice_content1[0], level7_choice_content1[1], 6);
        else if (dialogState == 6)
            choiceWaiter(8, 7);
        else if (dialogState == 7)
            choiceFinish();
        else if (dialogState == 8) {
            dialogState = 9;
            displayText(text, function() { dialogState = 10 });
            globalRyokFirstChatPassed = true;
        }
    },

    ryokDialog2Init: function() {
        dialogState = 9;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ryok_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        text.tint = 0xFF69B4;
        displayText(text, function() { dialogState = 10 });
        lockSpace(0.3);
    },

    ryokDialog2Cutscene: function() {
        if (dialogState == 9)
            renderText(text, level7_text_content3, ryok_talk);
        else if (dialogState == 10)
            textWaiter(11, 12, text);
        else if (dialogState == 11)
            renderText(text, level7_text_content4, ryok_talk);
        else if (dialogState == 12)
            textWaiter(13, 14, text);
        else if (dialogState == 13)
            renderText(text, level7_text_content5, ryok_talk);
        else if (dialogState == 14)
            textWaiter(15, 17, text);
        else if (dialogState == 15) {
            text.tint = 0xFFFFFF;
            dialogState = 16;
        }
        else if (dialogState == 16)
            renderText(text, level7_text_content6);
        else if (dialogState == 17)
            textWaiter(18, 19, text);
        else if (dialogState == 18)
            renderText(text, level7_text_content7);
        else if (dialogState == 19)
            genericWaiter(20);
        else if (dialogState == 20) {
            text.setText('');
            setupChoice(348);
            dialogState = 21;
        }
        else if (dialogState == 21)
            renderChoice(choice1, choice2, level7_choice_content2[0], level7_choice_content2[1], 22);
        else if (dialogState == 22)
            choiceWaiter(23, 26);
        else if (dialogState == 23) {
            displayText(text, function () { dialogState = 25; });
            dialogState = 24;
        }
        else if (dialogState == 24)
            renderText(text, level7_text_content8, ryok_talk);
        else if (dialogState == 25)
            textFinishWaiter();
        else if (dialogState == 26) {
            displayText(text, function () { dialogState = 28; });
            globalSucharToldToRyok = true;
            avatar.loadTexture('av_ryok_happy');
            ryok.loadTexture('ryok_happy');
            text.tint = 0xFF69B4;
            dialogState = 27;
        }
        else if (dialogState == 27)
            renderText(text, level7_text_content9, ryok_talk);
        else if (dialogState == 28)
            textWaiter(29, 30, text);
        else if (dialogState == 29)
            renderText(text, level7_text_content10, ryok_talk);
        else if (dialogState == 30)
            textFinishWaiter();
    },

    ryokDialog3Init: function() {
        dialogState = 31;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ryok_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        text.tint = 0xFF69B4;
        displayText(text, function() { dialogState = 32 });
        lockSpace(0.3);
    },

    ryokDialog3Cutscene: function() {
        if (dialogState == 31)
            renderText(text, level7_text_content11, ryok_talk);
        else if (dialogState == 32)
            textWaiter(33, 34, text);
        else if (dialogState == 33)
            renderText(text, level7_text_content12, ryok_talk);
        else if (dialogState == 34)
            textFinishWaiter()
    },

    door1ClosedDialogInit: function() {
        dialogState = 35;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 36; });
        lockSpace(0.3);
    },

    door1ClosedDialogCutscene: function() {
        if (dialogState == 35)
            renderText(text, level7_text_content13);
        else if (dialogState == 36)
            textFinishWaiter();
    }
};
