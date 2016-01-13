var misza_trigger;
var misza, misza_gora, domek, cage, misza_talk;

var level6_text_content1 = '* No ja nie mogę!\n* Ty wiesz co?';

var level6_choice_content1 = ['Tak.', 'Nie.'];

var level6_text_content2 = '* Oni mówią,\n   znajdź sobie chłopaka.\n* Ale wiesz?';
var level6_text_content3 = '* Oni uciekają,\n   jak takie standardy widzą!';
var level6_text_content4 = '* Że niby za wysokie progi,\n   bo artystka...';
var level6_text_content5 = '* Bo ja artystką jestem.\n* Keke. \n* Times New Misza, miło mi.';

var level6_choice_content2 = ['Czemu nie\nRoman?', 'Kontynuuj,\nszkielecie\nz dredami...'];

var level6_text_content6 = '* Miałam byc chłopczykiem,\n   mieli mnie nazwać Roman.';
var level6_text_content7 = '* Ale nie jestem...\n   To nazwali Misza!';
var level6_text_content8 = '* Bo my jesteśmy rodziną\n   szkieletów ze standardami!';
var level6_text_content9 = '* A sztuka\n   to standard!\n* Przez same duże S!';
var level6_text_content10 = '* Tylko chłopaka bym chciała...\n   Smutno tak...\n   Może by nie uciekł,';
var level6_text_content11 = '   jakbym miała jakieś\n   inne hobby...? \n* Może jakbym hodowała...';
var level6_text_content12 = '* Jakieś zwierze?\n   ...rybkę...?\n   ...zerga...?';
var level6_text_content13 = '* ...';
var level6_text_content14 = '* Ke ke ke!!! Ja cię kręcę!\n* Skąd wiedziałaś,\n   że uwielbiam papugi?';
var level6_text_content15 = '* Ta ekspresja, te kolory!\n* To na pewno mi pomoże w\n   znalezieniu chłopaka, prawda?';

var level6_choice_content3 = ['Tak.', '...Nie da się jej\npowiedzieć nie!'];

var level6_text_content16 = '* Tak! Teraz tylko czekać na\n   przystojnego księcia na koniu,\n   tak białym jak jego kości...';
var level6_text_content17 = '* I tak wysokiego, jak\n   jego standardy, kekeke!';
var level6_text_content18 = '* Zostawiasz szkieleta\nw marzeniach *';
var level6_text_content19 = '* Gdzie jesteś, mój rycerzu?...';

var level6 = {
    preload: function () {
        game.load.image('bg_level6', 'assets/levels/level6.png');

        game.load.spritesheet('misza', 'assets/characters/misza_sprite.png', 51, 96);
        game.load.spritesheet('misza_gora', 'assets/characters/misza_sprite_gora.png', 51, 56);

        game.load.image('av_misza_sad', 'assets/avatars/av_misza_sad.png');
        game.load.image('av_misza_happy', 'assets/avatars/av_misza_happy.png');

        game.load.image('domek', 'assets/level_doodads/domek.png');
        game.load.image('cage', 'assets/level_doodads/cage.png');

        game.load.audio('misza', 'assets/sounds/talk_misza.ogg');

        game.load.image('heart', 'assets/misc/heart.png');
        game.load.image('ramka', 'assets/misc/ramka.png');
        game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');
        game.load.bitmapFont('times_new_misza', 'assets/fonts/times_new_misza_0.png', 'assets/fonts/times_new_misza.xml');

        loadTransitionPlugin();
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        bg = game.add.sprite(0, 0, 'bg_level6');

        door1 = createTrigger(0, 475, 640, 5);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(320, 275, 45, 40, col));
        col_sprites.push(makeRectangle(0, 0, 640, 150, col));
        col_sprites.push(makeRectangle(0, 150, 60, 263, col));
        col_sprites.push(makeRectangle(0, 413, 232, 75, col));
        col_sprites.push(makeRectangle(580, 150, 60, 263, col));
        col_sprites.push(makeRectangle(408, 413, 232, 75, col));
        col_sprites.push(makeRectangle(382, 100, 200, 120, col));
        col_sprites.push(makeRectangle(405, 278, 200, 10, col));
        col_sprites.push(makeRectangle(530, 100, 5, 180, col));
        col_sprites.push(makeRectangle(101, 345, 95, 35, col));
        col_sprites.push(makeRectangle(120, 145, 83, 80, col));

        col.visible = false;

        misza = game.add.sprite(320, 220, 'misza');

        misza_talk = game.add.audio('misza', 1, true);

        misza_trigger = createTrigger(300, 255, 85, 80);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        misza_gora = game.add.sprite(320, 220, 'misza_gora');

        if (!globalParrotDelivered) {
            misza_gora.frame = 1;
            misza.frame = 1;
        }

        domek = game.add.sprite(382, 94, 'domek');
        cage = game.add.sprite(101, 238, 'cage');

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (domek) domek.visible = (drako.y < 235);
        if (misza_gora) misza_gora.visible = (drako.y < 276);
        if (cage) cage.visible = (drako.y < 347);

        if (dialogState >= 0 && dialogState <= 32) {
            stopDrako();
            level6.miszaDialogCutscene();
        }
        else if (dialogState >= 33 && dialogState <= 34) {
            stopDrako();
            level6.miszaDialog2Cutscene();
        }
        else if (dialogState >= 35 && dialogState <= 50) {
            stopDrako();
            level6.miszaDialog3Cutscene();
        }
        else if (dialogState >= 51 && dialogState <= 52) {
            stopDrako();
            level6.miszaDialog4Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 150, 'level5'));

            if (!globalMiszaDialog1Triggered && spaceDown() && game.physics.arcade.overlap(drako, misza_trigger))
                level6.miszaDialogInit();
            else if (!globalParrotTaken && spaceDown() && game.physics.arcade.overlap(drako, misza_trigger))
                level6.miszaDialog2Init();
            else if (!globalParrotDelivered && spaceDown() && game.physics.arcade.overlap(drako, misza_trigger))
                level6.miszaDialog3Init();
            else if (spaceDown() && game.physics.arcade.overlap(drako, misza_trigger))
                level6.miszaDialog4Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(misza) {
            misza.destroy();
            misza = null;
        }

        if(misza_trigger) {
            misza_trigger.destroy();
            misza_trigger = null;
        }

        if(misza_gora) {
            misza_gora.destroy();
            misza_gora = null;
        }

        if(domek) {
            domek.destroy();
            domek = null;
        }

        if(cage) {
            cage.destroy();
            cage = null;
        }

        if(misza_talk) {
            misza_talk.destroy();
            misza_talk = null;
        }
    },

    miszaDialogInit: function() {
        globalMiszaDialog1Triggered = true;
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_misza_sad');
        text = game.add.bitmapText(174, 348, 'times_new_misza', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    miszaDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level6_text_content1, misza_talk);
        else if (dialogState == 1)
            genericWaiter(2);
        else if (dialogState == 2) {
            text.setText('');
            setupChoice(348);
            dialogState = 3;
        }
        else if (dialogState == 3)
            renderChoice(choice1, choice2, level6_choice_content1[0], level6_choice_content1[1], 4);
        else if (dialogState == 4)
            choiceWaiter(5, 5);
        else if (dialogState == 5) {
            displayText(text, function () { dialogState = 7; });
            dialogState = 6;
        }
        else if (dialogState == 6)
            renderText(text, level6_text_content2, misza_talk);
        else if (dialogState == 7)
            textWaiter(8, 9, text);
        else if (dialogState == 8)
            renderText(text, level6_text_content3, misza_talk);
        else if (dialogState == 9)
            textWaiter(10, 11, text);
        else if (dialogState == 10)
            renderText(text, level6_text_content4, misza_talk);
        else if (dialogState == 11)
            textWaiter(12, 13, text);
        else if (dialogState == 12)
            renderText(text, level6_text_content5, misza_talk);
        else if (dialogState == 13)
            genericWaiter(14);
        else if (dialogState == 14) {
            text.setText('');
            setupChoice(348);
            dialogState = 15;
        }
        else if (dialogState == 15)
            renderChoice(choice1, choice2, level6_choice_content2[0], level6_choice_content2[1], 16);
        else if (dialogState == 16)
            choiceWaiter(17, 18);
        else if (dialogState == 17) {
            displayText(text, function () { dialogState = 20; });
            dialogState = 19;
        }
        else if (dialogState == 18) {
            displayText(text, function () { dialogState = 24; });
            dialogState = 23;
        }
        else if (dialogState == 19)
            renderText(text, level6_text_content6, misza_talk);
        else if (dialogState == 20)
            textWaiter(21, 22, text);
        else if (dialogState == 21)
            renderText(text, level6_text_content7, misza_talk);
        else if (dialogState == 22)
            textWaiter(23, 24, text);
        else if (dialogState == 23)
            renderText(text, level6_text_content8, misza_talk);
        else if (dialogState == 24)
            textWaiter(25, 26, text);
        else if (dialogState == 25)
            renderText(text, level6_text_content9, misza_talk);
        else if (dialogState == 26)
            textWaiter(27, 28, text);
        else if (dialogState == 27)
            renderText(text, level6_text_content10, misza_talk);
        else if (dialogState == 28)
            textWaiter(29, 30, text);
        else if (dialogState == 29)
            renderText(text, level6_text_content11, misza_talk);
        else if (dialogState == 30)
            textWaiter(31, 32, text);
        else if (dialogState == 31)
            renderText(text, level6_text_content12, misza_talk);
        else if (dialogState == 32)
            textFinishWaiter();
    },

    miszaDialog2Init: function() {
        dialogState = 33;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_misza_sad');
        text = game.add.bitmapText(174, 348, 'times_new_misza', '', 29);
        displayText(text, function() { dialogState = 34; });
        lockSpace(0.3);
    },

    miszaDialog2Cutscene: function() {
        if (dialogState == 33)
            renderText(text, level6_text_content13, misza_talk);
        else if (dialogState == 34)
            textFinishWaiter();
    },

    miszaDialog3Init: function() {
        dialogState = 35;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_misza_sad');
        text = game.add.bitmapText(174, 348, 'times_new_misza', '', 29);
        displayText(text, function() { dialogState = 36; });
        lockSpace(0.3);
    },

    miszaDialog3Cutscene: function() {
        if (dialogState == 35)
            renderText(text, level6_text_content14, misza_talk);
        else if (dialogState == 36)
            textWaiter(37, 39, text);
        else if (dialogState == 37) {
            dropItem();
            globalParrotDelivered = true;
            avatar.loadTexture('av_misza_happy');
            misza.frame = 0;
            misza_gora.frame = 0;
            dialogState = 38;
        }
        else if (dialogState == 38)
            renderText(text, level6_text_content15, misza_talk);
        else if (dialogState == 39)
            genericWaiter(40);
        else if (dialogState == 40) {
            text.setText('');
            setupChoice(348);
            dialogState = 41;
        }
        else if (dialogState == 41)
            renderChoice(choice1, choice2, level6_choice_content3[0], level6_choice_content3[1], 42);
        else if (dialogState == 42)
            choiceWaiter(43, 43);
        else if (dialogState == 43) {
            displayText(text, function () { dialogState = 45; });
            dialogState = 44;
        }
        else if (dialogState == 44)
            renderText(text, level6_text_content16, misza_talk);
        else if (dialogState == 45)
            textWaiter(46, 47, text);
        else if (dialogState == 46)
            renderText(text, level6_text_content17, misza_talk);
        else if (dialogState == 47)
            textWaiter(48, 50, text);
        else if (dialogState == 48) {
            text.font = 'determination_font';
            dialogState = 49
        }
        else if (dialogState == 49)
            renderText(text, level6_text_content18);
        else if (dialogState == 50)
            textFinishWaiter();
    },

    miszaDialog4Init: function() {
        dialogState = 51;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_misza_happy');
        text = game.add.bitmapText(174, 348, 'times_new_misza', '', 29);
        displayText(text, function() { dialogState = 52; });
        lockSpace(0.3);
    },

    miszaDialog4Cutscene: function() {
        if (dialogState == 51)
            renderText(text, level6_text_content19, misza_talk);
        else if (dialogState == 52)
            textFinishWaiter();
    }
};

