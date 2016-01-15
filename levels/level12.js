var tk_trigger, tk_talk, tk_trigger2, passage_trigger, cake, pony_trigger;

var level12_text_content1 = '* Widzisz kota. Wydaje się\n   głodny i zirytowany.\n   A może to jego twarz? *';
var level12_text_content2 = '* Muszę zmienić pracę...';
var level12_text_content3 = '* ...NAPRAWDĘ?\n* Kto w ogóle\n* lubi ten smak...?';
var level12_text_content4 = '* nuci * Bo jesteś jak\n* petaaar... co?\n* Tego też nie lubię...';
var level12_text_content5 = '* Kot wydaje się\n  zaabsorbowany ciastem.\n  Mruczy. *';
var level12_text_content6 = '* Dokąd to?!';
var level12_text_content7 = '* To jest naprawdę\n   straszny sekret.';


var level12 = {
    preload: function () {
        game.load.image('bg_level12a', 'assets/levels/level12a.png');
        game.load.image('bg_level12b', 'assets/levels/level12b.png');

        game.load.image('av_tk_sad', 'assets/avatars/av_tk_sad.png');
        game.load.image('av_tk_happy', 'assets/avatars/av_tk_happy.png');

        game.load.audio('tk', 'assets/sounds/talk_tk.ogg');

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

        if(!globalTKHappy)
            bg = game.add.sprite(0, 0, 'bg_level12a');
        else
            bg = game.add.sprite(0, 0, 'bg_level12b');

        door1 = createTrigger(0, 160, 5, 135);
        door2 = createTrigger(635, 0, 5, 480);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        col_sprites.push(makeRectangle(0, 160, 101, 36, col));
        col_sprites.push(makeRectangle(0, 292, 112, 200, col));
        col_sprites.push(makeRectangle(112, 413, 640, 80, col));
        col_sprites.push(makeRectangle(280, 0, 360, 160, col));
        col_sprites.push(makeRectangle(165, 160, 130, 178, col));
        col_sprites.push(makeRectangle(340, 160, 140, 80, col));
        col_sprites.push(makeRectangle(420, 330, 120, 120, col));

        col.visible = false;

        tk_trigger = createTrigger(145, 160, 60, 120);
        tk_trigger2 = createTrigger(90, 190, 10, 110);
        passage_trigger = createTrigger(240, 320, 10, 100);
        pony_trigger = createTrigger(340, 160, 140, 100);

        if (globalCakeDelivered != 0)
            cake = game.add.sprite(170, 240, 'cake'+globalCakeDelivered);

        tk_talk = game.add.audio('tk', 1, true);


        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(24, 200);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 2) {
            stopDrako();
            level12.tkDialogCutscene();
        }
        else if (dialogState >= 3 && dialogState <= 4) {
            stopDrako();
            level12.tkDialog2Cutscene();
        }
        else if (dialogState >= 5 && dialogState <= 9) {
            stopDrako();
            level12.tkDialog3Cutscene();
        }
        else if (dialogState >= 10 && dialogState <= 11) {
            stopDrako();
            level12.tkDialog4Cutscene();
        }
        else if (dialogState >= 12 && dialogState <= 13) {
            stopDrako();
            level12.tkDialog5Cutscene();
        }
        else if (dialogState >= 14 && dialogState <= 15) {
            stopDrako();
            level12.tkDialog6Cutscene();
        }
        else if (dialogState >= 16 && dialogState <= 17) {
            stopDrako();
            level12.tkDialog7Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(580, 200, 'level11'));
            game.physics.arcade.collide(drako, door2, doorGenerator(24, 200, 'level13'));

            if (!globalTKDialogComplete)
                game.physics.arcade.collide(drako, tk_trigger2, level12.tkDialogInit);

            if (!globalTKHappy)
                game.physics.arcade.collide(drako, passage_trigger, level12.tkDialog2Init);

            if (!globalTKHappy && !globalCake1Delivered && !globalCake2Delivered && !globalCake3Delivered &&
                spaceDown() && game.physics.arcade.overlap(drako, tk_trigger))
                level12.tkDialog3Init();
            else if (!globalTKHappy &&
                (globalCake1Taken + globalCake2Taken + globalCake3Taken) - (globalCake1Delivered + globalCake2Delivered + globalCake3Delivered) == 0 &&
                spaceDown() && game.physics.arcade.overlap(drako, tk_trigger))
                level12.tkDialog3Init();
            else if (!globalTKHappy && (globalCake1Delivered + globalCake2Delivered + globalCake3Delivered) == 1 &&
                spaceDown() && game.physics.arcade.overlap(drako, tk_trigger))
                level12.tkDialog4Init();
            else if (!globalTKHappy && (globalCake1Delivered + globalCake2Delivered + globalCake3Delivered) == 2 &&
                spaceDown() && game.physics.arcade.overlap(drako, tk_trigger))
                level12.tkDialog5Init();
            else if (globalTKHappy && spaceDown() && game.physics.arcade.overlap(drako, tk_trigger))
                level12.tkDialog6Init();

            if (spaceDown() && game.physics.arcade.overlap(drako, pony_trigger))
                level12.tkDialog7Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(tk_trigger) {
            tk_trigger.destroy();
            tk_trigger = null;
        }

        if(tk_trigger2) {
            tk_trigger2.destroy();
            tk_trigger2 = null;
        }

        if(passage_trigger) {
            passage_trigger.destroy();
            passage_trigger = null;
        }

        if(tk_talk) {
            tk_talk.destroy();
            tk_talk = null;
        }

        if(cake) {
            cake.destroy();
            cake = null;
        }

        if(pony_trigger) {
            pony_trigger.destroy();
            pony_trigger = null;
        }
    },

    tkDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    tkDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level12_text_content1);
        else if (dialogState == 1) {
            dialogState = 2;
            globalTKDialogComplete = true;
        }
        else if (dialogState == 2)
            textFinishWaiter();
    },

    tkDialog2Init: function() {
        dialogState = 3;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 4 });
        lockSpace(0.3);
    },

    tkDialog2Cutscene: function() {
        if (dialogState == 3)
            renderText(text, level12_text_content6, tk_talk);
        if (dialogState == 4)
            textFinishWaiter();
    },

    tkDialog3Init: function() {
        dialogState = 5;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 6 });
        lockSpace(0.3);
    },

    tkDialog3Cutscene: function() {
        if (dialogState == 5)
            renderText(text, level12_text_content2, tk_talk);
        else if (dialogState == 6) {
            if ((globalCake1Taken + globalCake2Taken + globalCake3Taken) - (globalCake1Delivered + globalCake2Delivered + globalCake3Delivered) == 1) {
                if (takenItem == 6)
                    globalCake1Delivered = true;
                else if (takenItem == 7)
                    globalCake2Delivered = true;
                else
                    globalCake3Delivered = true;
                dropItem();
                dialogState = 8;
            }
            else
                dialogState = 7;
        }
        else if (dialogState == 7)
            textFinishWaiter();
        else if (dialogState == 8)
            textWaiter(9, 7, text);
        else if (dialogState == 9)
            renderText(text, level12_text_content3, tk_talk);
    },

    tkDialog4Init: function() {
        dialogState = 10;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        if (takenItem == 6)
            globalCake1Delivered = true;
        else if (takenItem == 7)
            globalCake2Delivered = true;
        else
            globalCake3Delivered = true;
        dropItem();
        displayText(text, function() { dialogState = 11 });
        lockSpace(0.3);
    },

    tkDialog4Cutscene: function() {
        if (dialogState == 10)
            renderText(text, level12_text_content4, tk_talk);
        else if (dialogState == 11)
            textFinishWaiter();
    },

    tkDialog5Init: function() {
        dialogState = 12;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        globalTKHappy = true;
        if (takenItem == 6) {
            globalCake1Delivered = true;
            globalCakeDelivered = 1;
        }
        else if (takenItem == 7) {
            globalCake2Delivered = true;
            globalCakeDelivered = 2;
        }
        else {
            globalCake3Delivered = true;
            globalCakeDelivered = 3;
        }
        dropItem();
        cake = game.add.sprite(170, 240, 'cake'+globalCakeDelivered);
        bg.loadTexture('bg_level12b');
        displayText(text, function() { dialogState = 13 });
        lockSpace(0.3);
    },

    tkDialog5Cutscene: function() {
        if (dialogState == 12)
            renderText(text, level12_text_content5, tk_talk);
        else if (dialogState == 13)
            textFinishWaiter()
    },

    tkDialog6Init: function() {
        dialogState = 14;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 15 });
        lockSpace(0.3);
    },

    tkDialog6Cutscene: function() {
        if (dialogState == 14)
            renderText(text, level12_text_content5, tk_talk);
        else if (dialogState == 15)
            textFinishWaiter();
    },

    tkDialog7Init: function() {
        dialogState = 16;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_tk_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 17 });
        lockSpace(0.3);
    },

    tkDialog7Cutscene: function() {
        if (dialogState == 16)
            renderText(text, level12_text_content7, tk_talk);
        else if (dialogState == 17)
            textFinishWaiter();
    }

};
