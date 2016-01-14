var kuma_trigger;
var kuma, kuma_front, kuma_talk;

var level10_text_content1 = '* NGAAAH!';
var level10_text_content2 = '* NOGI MNIE BOLĄ!\n   NIE CIERPIĘ TYCH BUTÓW!';
var level10_text_content3 = '* ...Kapcie...?\n* CO?\n* ALE JA JESTEM KSIĘŻNICZKĄ!';
var level10_text_content4 = '* ...';
var level10_text_content5 = '* ...to ...um, lepiej. Ngh.';
var level10_text_content6 = '* Teraz mam do kompletu,\n   żeby wyglądać doszczętnie\n   i d i o t y c z n i e.';
var level10_text_content7 = '* Widzisz tę ohydną plamę,\n   tę szramę na moim wizerunku?';
var level10_text_content8 = '* Jakiś idiota namazał mi\n   czerwony bazgroł!\n* DYSHONOR!!!';
var level10_text_content9 = '* Jak tylko znajdzie się\n   w zasięgu mojego miecza, to...\n* GHRR!';
var level10_text_content10 = '* Uprałabym, ale nogi\n   mi odpadają.\n* Nigdzie nie idę.';
var level10_text_content11 = '* prosisz o materiał *\n\n* Ph... możesz spróbować.';
var level10_text_content12 = '* Zimno mi! Pośpiesz się!';
var level10_text_content13 = '* ... !\n* No i teraz to wygląda!\n* Nawet w kapciach!';
var level10_text_content14 = '* No dzięks, dziwaku!\n* POŁAMIANIA NÓŻEK!';
var level10_text_content15 = '* Pozdrów ode mnie Miyólika!\n* Ups, muszę ją przeprosić.';
var level10_text_content16 = '* Będę grać w grę.\n* I czytać komiksy\n   dla dziewczyn.';


var level10 = {
    preload: function () {
        game.load.image('bg_level10', 'assets/levels/level10.png');

        game.load.spritesheet('kuma', 'assets/characters/kuma_sprite.png', 50, 104);

        game.load.image('av_kuma_sad', 'assets/avatars/av_kuma_sad.png');
        game.load.image('av_kuma_happy', 'assets/avatars/av_kuma_happy.png');

        game.load.image('cloth_dirty_carry', 'assets/items/item4a_carry.png');
        game.load.image('cloth_carry', 'assets/items/item4b_carry.png');

        game.load.audio('kuma', 'assets/sounds/talk_kuma.ogg');

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

        bg = game.add.sprite(0, 0, 'bg_level10');

        door1 = createTrigger(0, 475, 640, 5);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 640, 170, col));
        col_sprites.push(makeRectangle(0, 170, 140, 310, col));
        col_sprites.push(makeRectangle(0, 413, 232, 80, col));
        col_sprites.push(makeRectangle(408, 413, 232, 80, col));
        col_sprites.push(makeRectangle(435, 0, 240, 480, col));
        col_sprites.push(makeRectangle(302, 280, 35, 44, col));

        col.visible = false;

        kuma = game.add.sprite(302, 220, 'kuma');

        kuma_trigger = createTrigger(282, 260, 75, 84);

        kuma_talk = game.add.audio('kuma', 1, true);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        kuma_front = game.add.sprite(302, 220, 'kuma');

        if (!globalKumaGotKapcie)
            kuma.frame = kuma_front.frame = 0;
        else if (!globalClothTaken)
            kuma.frame = kuma_front.frame = 1;
        else if (!globalKumaHelped)
            kuma.frame = kuma_front.frame = 2;
        else
            kuma.frame = kuma_front.frame = 3;

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (kuma_front) kuma_front.visible = (drako.y < 230);

        if (dialogState >= 0 && dialogState <= 4) {
            stopDrako();
            level10.kumaDialogCutscene();
        }
        else if (dialogState >= 4 && dialogState <= 14) {
            stopDrako();
            level10.kumaDialog2Cutscene();
        }
        else if (dialogState >= 15 && dialogState <= 25) {
            stopDrako();
            level10.kumaDialog3Cutscene();
        }
        else if (dialogState >= 26 && dialogState <= 27) {
            stopDrako();
            level10.kumaDialog4Cutscene();
        }
        else if (dialogState >= 28 && dialogState <= 35) {
            stopDrako();
            level10.kumaDialog5Cutscene();
        }
        else if (dialogState >= 36 && dialogState <= 37) {
            stopDrako();
            level10.kumaDialog6Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 150, 'level9'));

            if (!globalKapcieTaken && spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialogInit();
            else if (!globalKumaGotKapcie && spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialog2Init();
            else if (!globalClothTaken && spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialog3Init();
            else if (!globalClothWashed && spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialog4Init();
            else if (!globalKumaHelped && spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialog5Init();
            else if (spaceDown() && game.physics.arcade.overlap(drako, kuma_trigger))
                level10.kumaDialog6Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(kuma) {
            kuma.destroy();
            kuma = null;
        }

        if(kuma_trigger) {
            kuma_trigger.destroy();
            kuma_trigger = null;
        }

        if(kuma_front) {
            kuma_front.destroy();
            kuma_front = null;
        }

        if(kuma_talk) {
            kuma_talk.destroy();
            kuma_talk = null;
        }
    },

    kumaDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    kumaDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level10_text_content1, kuma_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level10_text_content2, kuma_talk);
        else if (dialogState == 3) {
            globalKumaAskedForKapcie = true;
            dialogState = 4;
        }
        else if (dialogState == 4)
            textFinishWaiter();
    },

    kumaDialog2Init: function() {
        dialogState = 5;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 6 });
        lockSpace(0.3);
    },

    kumaDialog2Cutscene: function() {
        if (dialogState == 5)
            renderText(text, level10_text_content3, kuma_talk);
        else if (dialogState == 6)
            textWaiter(7, 8, text);
        else if (dialogState == 7)
            renderText(text, level10_text_content4, kuma_talk);
        else if (dialogState == 8) {
            globalKumaGotKapcie = true;
            dialogState = 9;
            kuma.frame = kuma_front.frame = 1;
            dropItem();
        }
        else if (dialogState == 9)
            textWaiter(10, 11, text);
        else if (dialogState == 10)
            renderText(text, level10_text_content5, kuma_talk);
        else if (dialogState == 9)
            textWaiter(10, 11, text);
        else if (dialogState == 10)
            renderText(text, level10_text_content5, kuma_talk);
        else if (dialogState == 11)
            textWaiter(12, 13, text);
        else if (dialogState == 12)
            renderText(text, level10_text_content6, kuma_talk);
        else if (dialogState == 13)
            textWaiter(14, 16, text);
        else if (dialogState == 14)
            dialogState = 15;
    },

    kumaDialog3Init: function() {
        dialogState = 15;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 16 });
        lockSpace(0.3);
    },

    kumaDialog3Cutscene: function() {
        if (dialogState == 15)
            renderText(text, level10_text_content7, kuma_talk);
        else if (dialogState == 16)
            textWaiter(17, 18, text);
        else if (dialogState == 17)
            renderText(text, level10_text_content8, kuma_talk);
        else if (dialogState == 18)
            textWaiter(19, 20, text);
        else if (dialogState == 19)
            renderText(text, level10_text_content9, kuma_talk);
        else if (dialogState == 20)
            textWaiter(21, 22, text);
        else if (dialogState == 21)
            renderText(text, level10_text_content10, kuma_talk);
        else if (dialogState == 22)
            textWaiter(23, 24, text);
        else if (dialogState == 23)
            renderText(text, level10_text_content11, kuma_talk);
        else if (dialogState == 24) {
            takeItem(ITEM_CLOTH_DIRTY);
            globalClothTaken = true;
            dialogState = 25;
            kuma.frame = kuma_front.frame = 2;
        }
        else if (dialogState == 25)
            textFinishWaiter();
    },

    kumaDialog4Init: function() {
        dialogState = 26;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 27 });
        lockSpace(0.3);
    },

    kumaDialog4Cutscene: function() {
        if (dialogState == 26)
            renderText(text, level10_text_content12, kuma_talk);
        else if (dialogState == 27)
            textFinishWaiter();
    },

    kumaDialog5Init: function() {
        dialogState = 28;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 30 });
        lockSpace(0.3);
    },

    kumaDialog5Cutscene: function() {
        if (dialogState == 28) {
            dialogState = 29;
            globalKumaHelped = true;
            kuma.frame = kuma_front.frame = 3;
            dropItem();
        }
        else if (dialogState == 29)
            renderText(text, level10_text_content13, kuma_talk);
        else if (dialogState == 30)
            textWaiter(31, 32, text);
        else if (dialogState == 31)
            renderText(text, level10_text_content14, kuma_talk);
        else if (dialogState == 32)
            textWaiter(33, 34, text);
        else if (dialogState == 33)
            renderText(text, level10_text_content15, kuma_talk);
        else if (dialogState == 34)
            textWaiter(35, 37, text);
        else if (dialogState == 35)
            dialogState = 36;
    },

    kumaDialog6Init: function() {
        dialogState = 36;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_kuma_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 37 });
        lockSpace(0.3);
    },

    kumaDialog6Cutscene: function() {
        if (dialogState == 36)
            renderText(text, level10_text_content16, kuma_talk);
        else if (dialogState == 37)
            textFinishWaiter();
    }
};
