var ailish_trigger1, ailish_trigger2, door_trigger;
var ailish, ailish_talk;

var level13_text_content1 = '* Oh! Drasasynie!\n* Nie s-spodziewałam się!\n* Przepraszam, zajęta jestem!';
var level13_text_content2 = '* Aaa... Szybko, szybko!\n* Obraz z przystojnym ziomem!\n* Na początku! Pamiętasz?';
var level13_text_content3 = '* Ile tam było zer? ILE???\n* Potrzebuję tego! Proszę!\n* BIEGNIJ! AAAaaaaa!';
var level13_text_content4 = '* O, już! Szczybk-ko ci poszło!\n* Co? A , nie, dziękuję,\n   ze mną wszystko w porządku!';
var level13_text_content5 = '* Pomyślałam że przyda ci się\n   spacerek! A poza tym wszcze-\n   piłam ci licznik kroków!';
var level13_text_content6 = '* Teraz mogę obliczyć ich\n   funkcję kratkową w relacji\n   do gęstości kurzu!';
var level13_text_content7 = '* Fascynujące, co nie?\n* A drzwi były otwarte. Tylko\n   otwierają się w drugą stronę.';
var level13_text_content8 = '* Hej... wiem po co tam\n   idziesz. Ja też próbuję\n   nas stąd wydostać.';
var level13_text_content9 = '* Robię badania. i...\n* Obserwowałam cię. \n* Ekhm. Tak..';
var level13_text_content10 = '* W każdym razie nie wiem, \n* kto wrzucił nas w to ciemne\n* i niskie miejsce.';
var level13_text_content11 = '* Ale jeśli się czegoś\n   dowiesz... t-to daj znać, co?\n* Jesteśmy tuż obok Bariery...';
var level13_text_content12 = '* Ciągniesz drzwi.\n* Zamknięte.';
var level13_text_content13 = '* Na co czekasz?\n* Biegnij do obrazu!';


var level13 = {
    preload: function () {
        game.load.image('bg_level13', 'assets/levels/level13.png');

        game.load.image('ailish_sad', 'assets/characters/ail_sad.png');
        game.load.image('ailish_happy', 'assets/characters/ail_happy.png');

        game.load.image('av_ailish_sad', 'assets/avatars/av_ail_sad.png');
        game.load.image('av_ailish_happy', 'assets/avatars/av_ail_happy.png');

        game.load.audio('ailish', 'assets/sounds/talk_ail.ogg');

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

        bg = game.add.sprite(0, 0, 'bg_level13');

        door1 = createTrigger(0, 0, 5, 480);
        door2 = createTrigger(560, 300, 5, 130);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        col_sprites.push(makeRectangle(0, 413, 640, 80, col));
        col_sprites.push(makeRectangle(280, 0, 360, 160, col));
        col_sprites.push(makeRectangle(135, 160, 330, 40, col));
        col_sprites.push(makeRectangle(440, 160, 50, 180, col));
        col_sprites.push(makeRectangle(460, 300, 100, 40, col));
        col_sprites.push(makeRectangle(171, 180, 40, 39, col));

        col.visible = false;

        if(!globalAilishHappy)
            ailish = game.add.sprite(150, 150, 'ailish_sad');
        else
            ailish = game.add.sprite(150, 150, 'ailish_happy');

        ailish_talk = game.add.audio('ailish', 1, true);

        ailish_trigger1 = createTrigger(151, 180, 80, 59);
        ailish_trigger2 = createTrigger(100, 100, 5, 320);
        door_trigger = createTrigger(520, 340, 40, 80);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(24, 200);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 5) {
            stopDrako();
            level13.ailishDialogCutscene();
        }
        else if (dialogState >= 6 && dialogState <= 7) {
            stopDrako();
            level13.ailishDialog2Cutscene();
        }
        else if (dialogState >= 8 && dialogState <= 9) {
            stopDrako();
            level13.doorClosedCutscene();
        }
        else if (dialogState >= 10 && dialogState <= 21) {
            stopDrako();
            level13.ailishDialog3Cutscene();
        }
        else if (dialogState >= 22 && dialogState <= 25) {
            stopDrako();
            level13.ailishDialog4Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(580, 200, 'level12'));
            if (!globalAilishHappy)
                game.physics.arcade.collide(drako, door2);
            else
                game.physics.arcade.collide(drako, door2, doorGenerator(24, 240, 'level14'));

            if (!globalAilishTalkTriggered)
                game.physics.arcade.collide(drako, ailish_trigger2, level13.ailishDialogInit);

            if (!globalPaintingTouched && spaceDown() && game.physics.arcade.overlap(drako, ailish_trigger1))
                level13.ailishDialog2Init();
            else if (!globalAilishHappy && spaceDown() && game.physics.arcade.overlap(drako, ailish_trigger1))
                level13.ailishDialog3Init();
            else if (spaceDown() && game.physics.arcade.overlap(drako, ailish_trigger1))
                level13.ailishDialog4Init();

            if (!globalAilishHappy && spaceDown() && game.physics.arcade.overlap(drako, door_trigger))
                level13.doorClosedDialogInit();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(ailish) {
            ailish.destroy();
            ailish = null;
        }

        if(ailish_trigger1) {
            ailish_trigger1.destroy();
            ailish_trigger1 = null;
        }

        if(ailish_trigger2) {
            ailish_trigger2.destroy();
            ailish_trigger2 = null;
        }

        if(door_trigger) {
            door_trigger.destroy();
            door_trigger = null;
        }

        if(ailish_talk) {
            ailish_talk.destroy();
            ailish_talk = null;
        }
    },

    ailishDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ailish_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        globalAilishTalkTriggered = true;
    },

    ailishDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level13_text_content1, ailish_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level13_text_content2, ailish_talk);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level13_text_content3, ailish_talk);
        else if (dialogState == 5)
            textFinishWaiter();
    },

    ailishDialog2Init: function() {
        dialogState = 6;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ailish_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 7 });
        lockSpace(0.3);
    },

    ailishDialog2Cutscene: function() {
        if (dialogState == 6)
            renderText(text, level13_text_content13, ailish_talk);
        else if (dialogState == 7)
            textFinishWaiter();
    },

    ailishDialog3Init: function() {
        dialogState = 10;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ailish_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 11 });
        globalAilishHappy = true;
        ailish.loadTexture('ailish_happy');
    },

    ailishDialog3Cutscene: function() {
        if (dialogState == 10)
            renderText(text, level13_text_content4, ailish_talk);
        else if (dialogState == 11)
            textWaiter(12, 13, text);
        else if (dialogState == 12)
            renderText(text, level13_text_content5, ailish_talk);
        else if (dialogState == 13)
            textWaiter(14, 15, text);
        else if (dialogState == 14)
            renderText(text, level13_text_content6, ailish_talk);
        else if (dialogState == 15)
            textWaiter(16, 17, text);
        else if (dialogState == 16)
            renderText(text, level13_text_content7, ailish_talk);
        else if (dialogState == 17)
            textWaiter(18, 19, text);
        else if (dialogState == 18)
            renderText(text, level13_text_content8, ailish_talk);
        else if (dialogState == 19)
            textWaiter(20, 21, text);
        else if (dialogState == 20)
            renderText(text, level13_text_content9, ailish_talk);
        else if (dialogState == 21)
            textWaiter(22, 23, text);
    },

    ailishDialog4Init: function() {
        dialogState = 22;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_ailish_happy');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 23 });
    },

    ailishDialog4Cutscene: function() {
        if (dialogState == 22)
            renderText(text, level13_text_content10, ailish_talk);
        else if (dialogState == 23)
            textWaiter(24, 25, text);
        else if (dialogState == 24)
            renderText(text, level13_text_content11, ailish_talk);
        else if (dialogState == 25)
            textFinishWaiter();
    },

    doorClosedDialogInit: function() {
        dialogState = 8;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 9 });
        lockSpace(0.3);
    },

    doorClosedCutscene: function() {
        if (dialogState == 8)
            renderText(text, level13_text_content12);
        else if (dialogState == 9)
            textFinishWaiter();
    }
};
