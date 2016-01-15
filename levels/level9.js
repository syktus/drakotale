var miya_trigger, door3_closed_trigger, passage_trigger, kapcie_trigger;
var miya, miya_front, miya_talk, kapcie;
var bunny, bunnies, nextBunny, bunniesMoving;

var level9_text_content1 = '* Och, cześć! Szukasz wyjścia?\n* Hmm...\n* ...';
var level9_text_content2 = '* Przepuściłabym cię,\n   ale... mam dylemat...\n* Proszę, powiedz mi!';
var level9_text_content3 = '* Co jest ważniejsze?';

var level9_choice_content1 = ['Marchewki', 'Igły'];

var level9_text_content4 = '* Aaaha! Teraz rozumiem!';
var level9_text_content5 = '* Marchewkę można zjeść,\n   a zdrowe odżywianie\n   to podstawa radości!';
var level9_text_content6 = '* Karoten, błonnik, witaminy\n   to przypomnienie,\n   aby dbać o siebie.';
var level9_text_content7 = '* Teraz wiem co jest ważniejsze,\n   ...\n   dziękuję.';
var level9_text_content8 = '* Aaaha! Teraz rozumiem!';
var level9_text_content9 = '* Igłą uszyję ubranka!\n*  I przedziurawię lisy!\n* I zrobię piorunochron!';
var level9_text_content10 = '* Jest użyteczna.\n* To przypomina mi,\n   żeby być pracowitym.';
var level9_text_content11 = '* Teraz wiem co jest ważniejsze,\n   ...\n   dziękuję.';
var level9_text_content12 = '* Hmm... Wiesz, tu wyżej\n   mieszka moja przyjaciółka.\n   Wydaje się bardzo zdenerwowana.';
var level9_text_content13 = '* Chciałam jej pomóc...\n* Ale zaczęła rzucac ostrymi\n   przedmiotami.';
var level9_text_content14 = '* Odstresowuje się tak.\n* Spróbowałbyś jej też pomóc?\n* Ładnie proszę!';

var level9_text_content15 = 'Drzwi są zamknięte.';

var level9_text_content16 = '* Hej, stój!\n   Nie możesz jeszcze tam iść!';

var level9_text_content17 = 'Ręcznie robione kapcie.\nMięciutkie i puchate.';

var level9_text_content18 = 'Króliczki przybywajcie!';

var level9 = {
    preload: function () {
        if (debugMode) {
            game.load.image('bg_level9', 'assets/levels/level9.png');

            game.load.image('kapcie', 'assets/items/item3.png');
            game.load.image('kapcie_carry', 'assets/items/item3_carry.png');

            game.load.image('av_miya_sad', 'assets/avatars/av_miya_sad.png');
            game.load.image('av_miya_happy', 'assets/avatars/av_miya_happy.png');

            game.load.spritesheet('miya', 'assets/characters/miya_sprite.png', 37, 70);

            game.load.spritesheet('bunny', 'assets/level_doodads/bunny.png', 50, 53);

            game.load.audio('miya', 'assets/sounds/talk_miya.ogg');

            game.load.image('heart', 'assets/misc/heart.png');
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

        bg = game.add.sprite(0, 0, 'bg_level9');

        door1 = createTrigger(0, 160, 5, 135);
        door2 = createTrigger(635, 160, 5, 135);
        door3 = createTrigger(280, 130, 80, 5);

        door3_closed_trigger = createTrigger(280, 130, 80, 25);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        col_sprites.push(makeRectangle(0, 160, 101, 36, col));
        col_sprites.push(makeRectangle(0, 292, 112, 200, col));
        col_sprites.push(makeRectangle(112, 413, 300, 80, col));
        col_sprites.push(makeRectangle(360, 0, 280, 160, col));
        col_sprites.push(makeRectangle(540, 160, 140, 36, col));
        col_sprites.push(makeRectangle(528, 292, 112, 200, col));
        col_sprites.push(makeRectangle(408, 413, 120, 80, col));
        col_sprites.push(makeRectangle(300, 260, 37, 30, col));
        col_sprites.push(makeRectangle(245, 220, 40, 60, col));
        col_sprites.push(makeRectangle(360, 230, 25, 60, col));

        col.visible = false;

        miya = game.add.sprite(300, 220, 'miya');

        miya_trigger = createTrigger(280, 240, 77, 70);

        miya_talk = game.add.audio('miya', 1, true);

        if (!globalKapcieTaken) {
            kapcie = game.add.sprite(400, 350, 'kapcie');
            kapcie_trigger = createTrigger(400, 350, 49, 36);
        }

        if (!globalKumaHelped) {
            passage_trigger = createTrigger(550, 160, 5, 200);
        }

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(24, 200);

        miya_front = game.add.sprite(300, 220, 'miya');

        if (!globalMiyaChatComplete) {
            miya.frame = 0;
            miya_front.frame = 0;
        }
        else {
            miya.frame = 1;
            miya_front.frame = 1;
        }

        dialogState = -1;
        bunnies = 0;
        bunniesMoving = false;
        bunny = [];

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (miya_front) miya_front.visible = (drako.y < 220);

        if (bunniesMoving) {
            level9.moveBunnies();
            level9.checkBunnies();
        }

        if (dialogState >= 0 && dialogState <= 1) {
            stopDrako();
            level9.door3ClosedDialogCutscene();
        }
        else if (dialogState >= 2 && dialogState <= 27) {
            stopDrako();
            level9.miyaDialogCutscene();
        }
        else if (dialogState >= 28 && dialogState <= 33) {
            stopDrako();
            level9.miyaDialog1bCutscene();
        }
        else if (dialogState >= 34 && dialogState <= 35) {
            stopDrako();
            level9.passageDialogCutscene();
        }
        else if (dialogState >= 36 && dialogState <= 37) {
            stopDrako();
            level9.kapcieInteractInactive();
        }
        else if (dialogState >= 38 && dialogState <= 43) {
            stopDrako();
            level9.kapcieInteractActive();
        }
        else if (dialogState >= 44 && dialogState <= 46) {
            stopDrako();
            level9.miyaDialog2Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(580, 200, 'level5'));
            game.physics.arcade.collide(drako, door2, doorGenerator(24, 200, 'level11'));
            if (!globalMiyaChatComplete)
                game.physics.arcade.collide(drako, door3);
            else
                game.physics.arcade.collide(drako, door3, doorGenerator(302, 400, 'level10'));

            if (!globalKumaHelped)
                game.physics.arcade.collide(drako, passage_trigger, level9.passageDialogInit);

            if (!globalMiyaChatComplete && spaceDown() && game.physics.arcade.overlap(drako, door3_closed_trigger))
                level9.door3ClosedDialogInit();

            if (!globalMiyaChatComplete && spaceDown() && game.physics.arcade.overlap(drako, miya_trigger))
                level9.miyaDialogInit();
            else if (!globalKumaHelped && spaceDown() && game.physics.arcade.overlap(drako, miya_trigger))
                level9.miyaDialog1bInit();
            else if (spaceDown() && game.physics.arcade.overlap(drako, miya_trigger))
                level9.miyaDialog2Init();

            if (!globalKapcieTaken && !globalKumaAskedForKapcie && spaceDown() && game.physics.arcade.overlap(drako, kapcie_trigger))
                level9.kapcieDialogInit();
            else if (!globalKapcieTaken && spaceDown() && game.physics.arcade.overlap(drako, kapcie_trigger))
                level9.kapcieDialog2Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(miya) {
            miya.destroy();
            miya = null;
        }

        if(miya_front) {
            miya_front.destroy();
            miya_front = null;
        }

        if(miya_trigger) {
            miya_trigger.destroy();
            miya_trigger = null;
        }

        if(door3_closed_trigger) {
            door3_closed_trigger.destroy();
            door3_closed_trigger = null;
        }

        if(miya_talk) {
            miya_talk.destroy();
            miya_talk = null;
        }

        if(passage_trigger) {
            passage_trigger.destroy();
            passage_trigger = null;
        }

        if(kapcie) {
            kapcie.destroy();
            kapcie = null;
        }

        if(kapcie_trigger) {
            kapcie_trigger.destroy();
            kapcie_trigger = null;
        }

        for (var i = 0; i<bunnies; i++) {
            if (bunny[i]) {
                bunny[i].destroy();
                bunny[i] = null;
            }
        }
    },

    door3ClosedDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    door3ClosedDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level9_text_content15);
        else if (dialogState == 1)
            textFinishWaiter();
    },

    miyaDialogInit: function() {
        dialogState = 2;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_miya_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 3 });
        lockSpace(0.3);
    },

    miyaDialogCutscene: function() {
        if (dialogState == 2)
            renderText(text, level9_text_content1, miya_talk);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level9_text_content2, miya_talk);
        else if (dialogState == 5)
            textWaiter(6, 7, text);
        else if (dialogState == 6)
            renderText(text, level9_text_content3, miya_talk);
        else if (dialogState == 7)
            genericWaiter(8);
        else if (dialogState == 8) {
            text.setText('');
            setupChoice(348);
            dialogState = 9;
        }
        else if (dialogState == 9)
            renderChoice(choice1, choice2, level9_choice_content1[0], level9_choice_content1[1], 10);
        else if (dialogState == 10)
            choiceWaiter(11, 19);
        else if (dialogState == 11) {
            displayText(text, function () {
                dialogState = 13;
            });
            miya.frame = 1;
            miya_front.frame = 1;
            avatar.loadTexture('av_miya_happy');
            globalMiyaChatComplete = true;
            dialogState = 12;
        }
        else if (dialogState == 12)
            renderText(text, level9_text_content4, miya_talk);
        else if (dialogState == 13)
            textWaiter(14, 15, text);
        else if (dialogState == 14)
            renderText(text, level9_text_content5, miya_talk);
        else if (dialogState == 15)
            textWaiter(16, 17, text);
        else if (dialogState == 16)
            renderText(text, level9_text_content6, miya_talk);
        else if (dialogState == 17)
            textWaiter(18, 27, text);
        else if (dialogState == 18)
            renderText(text, level9_text_content7, miya_talk);
        else if (dialogState == 19) {
            displayText(text, function () {
                dialogState = 21;
            });
            miya.frame = 1;
            miya_front.frame = 1;
            avatar.loadTexture('av_miya_happy');
            globalMiyaChatComplete = true;
            dialogState = 20;
        }
        else if (dialogState == 20)
            renderText(text, level9_text_content8, miya_talk);
        else if (dialogState == 21)
            textWaiter(22, 23, text);
        else if (dialogState == 22)
            renderText(text, level9_text_content9, miya_talk);
        else if (dialogState == 23)
            textWaiter(24, 25, text);
        else if (dialogState == 24)
            renderText(text, level9_text_content10, miya_talk);
        else if (dialogState == 25)
            textWaiter(26, 27, text);
        else if (dialogState == 26)
            renderText(text, level9_text_content11, miya_talk);
        else if (dialogState == 27)
            textWaiter(28, 29, text);
    },

    miyaDialog1bInit: function() {
        dialogState = 28;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_miya_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 29 });
        lockSpace(0.3);
    },

    miyaDialog1bCutscene: function() {
        if (dialogState == 28)
            renderText(text, level9_text_content12, miya_talk);
        else if (dialogState == 29)
            textWaiter(30, 31, text);
        else if (dialogState == 30)
            renderText(text, level9_text_content13, miya_talk);
        else if (dialogState == 31)
            textWaiter(32, 33, text);
        else if (dialogState == 32)
            renderText(text, level9_text_content14, miya_talk);
        else if (dialogState == 33)
            textFinishWaiter();
    },

    passageDialogInit: function() {
        dialogState = 34;
        border = game.add.sprite(31, 318, 'ramka');
        if (!globalMiyaChatComplete)
            avatar = game.add.sprite(49, 340, 'av_miya_sad');
        else
            avatar = game.add.sprite(49, 340, 'av_miya_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 35 });
    },

    passageDialogCutscene: function() {
        if (dialogState == 34)
            renderText(text, level9_text_content16, miya_talk);
        else if (dialogState == 35)
            textFinishWaiter();
    },

    kapcieDialogInit: function() {
        dialogState = 36;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 37 });
        lockSpace(0.3);
    },

    kapcieInteractInactive: function() {
        if (dialogState == 36)
            renderText(text, level9_text_content17);
        else if (dialogState == 37)
            textFinishWaiter();
    },

    kapcieDialog2Init: function() {
        dialogState = 38;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 39 });
        lockSpace(0.3);
    },

    kapcieInteractActive: function() {
        if (dialogState == 38)
            renderText(text, level9_text_content17);
        else if (dialogState == 39) {
            setupChoice(406, true);
            dialogState = 40;
        }
        else if (dialogState == 40)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 41);
        else if (dialogState == 41)
            choiceWaiter(42, 43);
        else if (dialogState == 42) {
            takeItem(ITEM_KAPCIE);
            globalKapcieTaken = true;
            kapcie.visible = false;
            dialogState = 43;
        }
        else if (dialogState == 43)
            choiceFinish();
    },

    miyaDialog2Init: function() {
        dialogState = 44;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_miya_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 45 });
        lockSpace(0.3);
    },

    miyaDialog2Cutscene: function() {
        if (dialogState == 44)
            renderText(text, level9_text_content18, miya_talk);
        else if (dialogState == 45) {
            level9.generateBunny();
            bunniesMoving = true;
            dialogState = 46;
            nextBunny = game.time.now + 200;
        }
        else if (dialogState == 46)
        {
            if (game.time.now > nextBunny) {
                level9.generateBunny();
                nextBunny = game.time.now + 200;
            }
            textFinishWaiter();
        }
    },

    generateBunny: function() {
        bunny[bunnies++] = game.add.sprite(640, Math.random() * 430, 'bunny');
        bunny[bunnies-1].animations.add('jump', [0, 1, 2, 3, 4, 5], 10, true);
        bunny[bunnies-1].animations.play('jump');
    },

    moveBunnies: function() {
        var deltaTime = game.time.elapsed / 1000;

        for (var i = 0; i<bunnies; i++) {
            if (bunny[i]) {
                bunny[i].x -= 100 * deltaTime;
                if (bunny[i].x < -60) {
                    bunny[i].destroy();
                    bunny[i] = null;
                }
            }
        }
    },

    checkBunnies: function() {
        bunniesMoving = false;
        for (var i = 0; i<bunnies; i++) {
            if (bunny[i]) {
                bunniesMoving = true;
                break;
            }
        }
    }

};
