var wilk_trigger, wilk_trigger2;
var wilk, wilk_talk, death1, death2, t1, t2;
var cake1, cake2, cake3, cake1_trigger, cake2_trigger, cake3_trigger;

var level11_text_content1 = '* WRRRRRRR!\n* Ani kroku dalej, złociutka!';
var level11_text_content2 = '* Czy jesteś\n   czerwonym kapturkiem?';

var level11_choice_content1 = ['Tak', 'Nie'];

var level11_text_content3 = '* Węszy...\n* Czy aby na pewno?';
var level11_text_content4 = '* Bo Wilkatona, robota\n* do polowań na Czerwone\n* Kapturki, nie przechytrzysz!';
var level11_text_content5 = '* Udowodnij to!\n   Mam dla ciebie nawet quiz.\n* Tylko uważaj, bywa zabójczy...';
var level11_text_content6 = '* BARDZO SPECJALNY QUIZ\n   DEMASKUJĄCY CZ. KAPTURKI';
var level11_text_content7 = '1. Który z tych elementów\n   nie pasuje do reszty?';

var level11_choice_content2 = ['Cytryna\n\nPomidor', 'Ferrari\n\nBiedronka'];

var level11_text_content8 = '* HA! GIŃ, ZŁOCIUTKA!';
var level11_text_content9 = '* ... bo jest żółte,\n   a kapturek klika tylko\n   czerwone, co? Nieźle.';
var level11_text_content10 = '2. Co musi być w koszyku\n   dla babci?';

var level11_choice_content3 = ['Jabłka\n\nDefibrylator', 'Karabin\n\nChusteczki'];

var level11_text_content11 = '* ... tak, nadal żyjesz.\n* Słaby z ciebie kapturek.\n* Ale teraz wpadniesz!';
var level11_text_content12 = '3. Co Wilkaton robi\n   najlepiej?';

var level11_choice_content4 = ['Morduje\n\nPatroszy', 'Rozdziera\n\nŁadnie śpiewa'];

var level11_text_content13 = '* ...? Tak by kapturek nigdy nie\n* p-powiedział...\n* Naprawde tak myślisz?';
var level11_text_content14 = '* Że mogłabym robić coś\n* innego niż mordowanie\n*  niewiniątek!?';
var level11_text_content15 = '* To BrZmi Jak fajOWY\n* POMYSŁ!!!1\n* ZabiJANie jest takie NuDNE!';
var level11_text_content16 = '* A może BY TAK RZUcić\n   WSzystKO I PÓJŚĆ DO coleGU!!!1';
var level11_text_content17 = '* Muszę przemyśleć\n* swoje życie.\n* Kontynuuj.';
var level11_text_content18 = '* KToś tu zosTAWIł\n* góRę ciaSta... Smacznego!\n* KradziONE nie tuCzy!';

var level11_text_content19 = '* Sernik. W życiu go często brak.';
var level11_text_content20 = '* Piernik. Do wiatraka.';
var level11_text_content21 = '* Tarta z Brokułów. Nie pytaj.';

var level11 = {
    preload: function () {
        if (debugMode) {
            game.load.image('bg_level11', 'assets/levels/level11.png');

            game.load.image('cake1', 'assets/items/item5.png');
            game.load.image('cake1_carry', 'assets/items/item5_carry.png');
            game.load.image('cake2', 'assets/items/item6.png');
            game.load.image('cake2_carry', 'assets/items/item6_carry.png');
            game.load.image('cake3', 'assets/items/item7.png');
            game.load.image('cake3_carry', 'assets/items/item7_carry.png');

            game.load.image('av_wilk_sad', 'assets/avatars/av_wilk_sad.png');
            game.load.image('av_wilk_happy', 'assets/avatars/av_wilk_happy.png');

            game.load.spritesheet('wilk', 'assets/characters/wilk_sprite.png', 83, 110);

            game.load.image('death1', 'assets/level_doodads/death1.png');
            game.load.image('death2', 'assets/level_doodads/death2.png');

            game.load.audio('wilk', 'assets/sounds/talk_wilk.ogg');

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

        bg = game.add.sprite(0, 0, 'bg_level11');

        door1 = createTrigger(0, 160, 5, 135);
        door2 = createTrigger(635, 160, 5, 135);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        col_sprites.push(makeRectangle(0, 160, 101, 36, col));
        col_sprites.push(makeRectangle(0, 292, 112, 200, col));
        col_sprites.push(makeRectangle(112, 413, 300, 80, col));
        col_sprites.push(makeRectangle(280, 0, 360, 160, col));
        col_sprites.push(makeRectangle(540, 160, 140, 36, col));
        col_sprites.push(makeRectangle(528, 292, 112, 200, col));
        col_sprites.push(makeRectangle(408, 413, 120, 80, col));
        col_sprites.push(makeRectangle(130, 290, 100, 100, col));
        col_sprites.push(makeRectangle(180, 150, 240, 40, col));
        col_sprites.push(makeRectangle(270, 190, 80, 40, col));
        col_sprites.push(makeRectangle(160, 120, 45, 110, col));

        col.visible = false;

        wilk = game.add.sprite(140, 120, 'wilk');

        wilk_trigger = createTrigger(120, 190, 10, 100);
        wilk_trigger2 = createTrigger(140, 120, 85, 130);

        wilk_talk = game.add.audio('wilk', 1, true);

        if (!globalCake1Taken) {
            cake1 = game.add.sprite(400, 300, 'cake1');
            cake1_trigger = createTrigger(400, 300, 49, 36);
        }

        if (!globalCake2Taken) {
            cake2 = game.add.sprite(350, 320, 'cake2');
            cake2_trigger = createTrigger(350, 320, 49, 36);
        }

        if (!globalCake3Taken) {
            cake3 = game.add.sprite(410, 340, 'cake3');
            cake3_trigger = createTrigger(410, 340, 49, 36);
        }

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(24, 200);

        if (!globalWilkDialogComplete)
            wilk.frame = 0;
        else
            wilk.frame = 1;

        dialogState = -1;

        death1 = game.add.sprite(0, 0, 'death1');
        death2 = game.add.sprite(0, 0, 'death2');

        death1.alpha = death2.alpha = 0;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 58) {
            stopDrako();
            level11.wilkCutscene();
        }
        else if (dialogState >= 59 && dialogState <= 60) {
            stopDrako();
            level11.wilkCutscene2();
        }
        else if (dialogState >= 61 && dialogState <= 67) {
            stopDrako();
            level11.cake1Cutscene();
        }
        else if (dialogState >= 68 && dialogState <= 74) {
            stopDrako();
            level11.cake2Cutscene();
        }
        else if (dialogState >= 75 && dialogState <= 81) {
            stopDrako();
            level11.cake3Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(580, 200, 'level9'));
            game.physics.arcade.collide(drako, door2, doorGenerator(24, 200, 'level12'));

            if (!globalWilkDialogComplete)
                game.physics.arcade.collide(drako, wilk_trigger, level11.wilkDialogInit);

            if (globalWilkDialogComplete && spaceDown() && game.physics.arcade.overlap(drako, wilk_trigger2))
                level11.wilkDialog2Init();

            if (!globalCake1Taken && spaceDown() && game.physics.arcade.overlap(drako, cake1_trigger))
                level11.cake1DialogInit();

            if (!globalCake2Taken && spaceDown() && game.physics.arcade.overlap(drako, cake2_trigger))
                level11.cake2DialogInit();

            if (!globalCake3Taken && spaceDown() && game.physics.arcade.overlap(drako, cake3_trigger))
                level11.cake3DialogInit();


            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(wilk) {
            wilk.destroy();
            wilk = null;
        }

        if(wilk_trigger) {
            wilk_trigger.destroy();
            wilk_trigger = null;
        }

        if(wilk_trigger2) {
            wilk_trigger2.destroy();
            wilk_trigger2 = null;
        }

        if(wilk_talk) {
            wilk_talk.destroy();
            wilk_talk = null;
        }

        if(death1) {
            death1.destroy();
            death1 = null;
        }

        if(death2) {
            death2.destroy();
            death2 = null;
        }

        if(cake1) {
            cake1.destroy();
            cake1 = null;
        }

        if(cake1_trigger) {
            cake1_trigger.destroy();
            cake1_trigger = null;
        }

        if(cake2) {
            cake2.destroy();
            cake2 = null;
        }

        if(cake2_trigger) {
            cake2_trigger.destroy();
            cake2_trigger = null;
        }

        if(cake3) {
            cake3.destroy();
            cake3 = null;
        }

        if(cake3_trigger) {
            cake3_trigger.destroy();
            cake3_trigger = null;
        }
    },

    wilkDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_wilk_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
    },

    wilkCutscene: function() {
        if (dialogState == 0)
            renderText(text, level11_text_content1, wilk_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level11_text_content2, wilk_talk);
        else if (dialogState == 3)
            genericWaiter(4);
        else if (dialogState == 4) {
            text.setText('');
            setupChoice(348);
            dialogState = 5;
        }
        else if (dialogState == 5)
            renderChoice(choice1, choice2, level11_choice_content1[0], level11_choice_content1[1], 6);
        else if (dialogState == 6)
            choiceWaiter(11, 17);
        else if (dialogState == 11) {
            displayText(text, function () {
                dialogState = 13;
            });
            dialogState = 12;
        }
        else if (dialogState == 12)
            renderText(text, level11_text_content8, wilk_talk);
        else if (dialogState == 13)
            genericWaiter(14);
        else if (dialogState == 14) {
            choiceFinish();
            t1 = game.add.tween(death1).to( { alpha: 0.5 }, 2000, "Linear", true);
            t1.onComplete.add(function() {
                t1.onComplete.removeAll();
                t2 = game.add.tween(death2).to( { alpha: 1 }, 2000, "Linear", true);
                t2.onComplete.add(function() {
                    t2.onComplete.removeAll();
                    dialogState = 15;
                })
            })
        }
        else if (dialogState == 15)
            genericWaiter(16);
        else if (dialogState == 16) {
            spaceIsLocked = false;
            transitionPlugin.to('level1');
        }
        else if (dialogState == 17) {
            displayText(text, function () {
                dialogState = 19;
            });
            dialogState = 18;
        }
        else if (dialogState == 18)
            renderText(text, level11_text_content3, wilk_talk);
        else if (dialogState == 19)
            textWaiter(20, 21, text);
        else if (dialogState == 20)
            renderText(text, level11_text_content4, wilk_talk);
        else if (dialogState == 21)
            textWaiter(22, 23, text);
        else if (dialogState == 22)
            renderText(text, level11_text_content5, wilk_talk);
        else if (dialogState == 23)
            textWaiter(24, 25, text);
        else if (dialogState == 24)
            renderText(text, level11_text_content6, wilk_talk);
        else if (dialogState == 25)
            textWaiter(26, 27, text);
        else if (dialogState == 26)
            renderText(text, level11_text_content7, wilk_talk);
        else if (dialogState == 27)
            genericWaiter(28);
        else if (dialogState == 28) {
            text.setText('');
            setupChoice(348);
            dialogState = 29;
        }
        else if (dialogState == 29)
            renderChoice(choice1, choice2, level11_choice_content2[0], level11_choice_content2[1], 30);
        else if (dialogState == 30)
            choiceWaiter4(31, 11, 11, 11);
        else if (dialogState == 31) {
            displayText(text, function () {
                dialogState = 33;
            });
            dialogState = 32;
        }
        else if (dialogState == 32)
            renderText(text, level11_text_content9, wilk_talk);
        else if (dialogState == 33)
            textWaiter(34, 35, text);
        else if (dialogState == 34)
            renderText(text, level11_text_content10, wilk_talk);
        else if (dialogState == 35)
            genericWaiter(36);
        else if (dialogState == 36) {
            text.setText('');
            setupChoice(348);
            dialogState = 37;
        }
        else if (dialogState == 37)
            renderChoice(choice1, choice2, level11_choice_content3[0], level11_choice_content3[1], 38);
        else if (dialogState == 38)
            choiceWaiter4(11, 11, 39, 11);
        else if (dialogState == 39) {
            displayText(text, function () {
                dialogState = 41;
            });
            dialogState = 40;
        }
        else if (dialogState == 40)
            renderText(text, level11_text_content11, wilk_talk);
        else if (dialogState == 41)
            textWaiter(42, 43, text);
        else if (dialogState == 42)
            renderText(text, level11_text_content12, wilk_talk);
        else if (dialogState == 43)
            genericWaiter(44);
        else if (dialogState == 44) {
            text.setText('');
            setupChoice(348);
            dialogState = 45;
        }
        else if (dialogState == 45)
            renderChoice(choice1, choice2, level11_choice_content4[0], level11_choice_content4[1], 46);
        else if (dialogState == 46)
            choiceWaiter4(11, 11, 11, 47);
        else if (dialogState == 47) {
            displayText(text, function () {
                dialogState = 49;
            });
            dialogState = 48;
        }
        else if (dialogState == 48)
            renderText(text, level11_text_content13, wilk_talk);
        else if (dialogState == 49)
            textWaiter(50, 51, text);
        else if (dialogState == 50)
            renderText(text, level11_text_content14, wilk_talk);
        else if (dialogState == 51)
            textWaiter(52, 54, text);
        else if (dialogState == 52) {
            globalWilkDialogComplete = true;
            wilk.frame = 1;
            avatar.loadTexture('av_wilk_happy');
            dialogState = 53;
        }
        else if (dialogState == 53)
            renderText(text, level11_text_content15, wilk_talk);
        else if (dialogState == 54)
            textWaiter(55, 56, text);
        else if (dialogState == 55)
            renderText(text, level11_text_content16, wilk_talk);
        else if (dialogState == 56)
            textWaiter(57, 58, text);
        else if (dialogState == 57)
            renderText(text, level11_text_content17, wilk_talk);
        else if (dialogState == 58)
            textWaiter(59, 60, text);
    },

    wilkDialog2Init: function() {
        dialogState = 59;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_wilk_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 60 });
        lockSpace(0.3);
    },

    wilkCutscene2: function() {
        if (dialogState == 59)
            renderText(text, level11_text_content18, wilk_talk);
        else if (dialogState == 60)
            textFinishWaiter();
    },

    cake1DialogInit: function() {
        dialogState = 61;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 62 });
        lockSpace(0.3);
    },

    cake1Cutscene: function() {
        if (dialogState == 61)
            renderText(text, level11_text_content19);
        else if (dialogState == 62) {
            if ((!globalCake2Taken || globalCake2Delivered) && (!globalCake3Taken || globalCake3Delivered)) {
                setupChoice(406, true);
                dialogState = 63;
            }
            else
                dialogState = 67;
        }
        else if (dialogState == 63)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 64);
        else if (dialogState == 64)
            choiceWaiter(65, 66);
        else if (dialogState == 65) {
            takeItem(ITEM_CAKE1);
            globalCake1Taken = true;
            cake1.visible = false;
            dialogState = 66;
        }
        else if (dialogState == 66)
            choiceFinish();
        else if (dialogState == 67)
            textFinishWaiter();
    },

    cake2DialogInit: function() {
        dialogState = 68;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 69 });
        lockSpace(0.3);
    },

    cake2Cutscene: function() {
        if (dialogState == 68)
            renderText(text, level11_text_content20);
        else if (dialogState == 69) {
            if ((!globalCake1Taken || globalCake1Delivered) && (!globalCake3Taken || globalCake3Delivered)) {
                setupChoice(406, true);
                dialogState = 70;
            }
            else
                dialogState = 74;
        }
        else if (dialogState == 70)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 71);
        else if (dialogState == 71)
            choiceWaiter(72, 73);
        else if (dialogState == 72) {
            takeItem(ITEM_CAKE2);
            globalCake2Taken = true;
            cake2.visible = false;
            dialogState = 73;
        }
        else if (dialogState == 73)
            choiceFinish();
        else if (dialogState == 74)
            textFinishWaiter();
    },

    cake3DialogInit: function() {
        dialogState = 75;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 76 });
        lockSpace(0.3);
    },

    cake3Cutscene: function() {
        if (dialogState == 75)
            renderText(text, level11_text_content21);
        else if (dialogState == 76) {
            if ((!globalCake2Taken || globalCake2Delivered) && (!globalCake1Taken || globalCake1Delivered)) {
                setupChoice(406, true);
                dialogState = 77;
            }
            else
                dialogState = 81;
        }
        else if (dialogState == 77)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 78);
        else if (dialogState == 78)
            choiceWaiter(79, 80);
        else if (dialogState == 79) {
            takeItem(ITEM_CAKE3);
            globalCake3Taken = true;
            cake3.visible = false;
            dialogState = 80;
        }
        else if (dialogState == 80)
            choiceFinish();
        else if (dialogState == 81)
            textFinishWaiter();
    }
};

