var pin_dialog_trigger;
var pin, mlody;
var pin_talk, pin_talk2, mlody_talk;

var penguinEscaping = false, mlodyEntering = false, mlodyLeaving = false;

var level2_text_content1 = '* Siemaneczko słon-NIP! -neczko!\n* Jestem Pinguey.\n* Pinguey Pingwin!';
var level2_text_content2 = '* Kurczę, troszkę zagubiona się wydajesz!\n   Nowa tutaj, co? NIP! Ale nie martw się!';
var level2_text_content3 = '* Pom-NIP-mogę Ci!\n* Pingwiny to bardzo przyjazne stworzenia!';
var level2_text_content4 = '* Które bardzo lubią dzieci.\n* Najlepiej nadziewane,\n* na zimno NIP! Jak zemsta...';
var level2_text_content5 = '* ...?\n   NIIIIIIP! czujesz ciepły powiew?\n   NIE! TYLKO NNIP -IE CIEPŁO!';
var level2_text_content6 = '* Moje arktyczne serce nie wytrzyma tego!\n   NIP! Teraz ci się udało,\n   ale nigdy stąd nie wyjdziesz!';
var level2_text_content7 = '* A wiesz dlaczego?\n* BO NIGDY NIE USZCZĘŚLIWISZ WSZYSTKICH!';
var level2_text_content8 = '* NIPNIPNIPNIPNIP!';
var level2_text_content9 = '* ...?\n* ...cześć...';
var level2_text_content10 = '* Spodziewałem się mrożonych brokułów.\n   Ale nie mrożonej babki w okularach.\n   Cho no ze mną.';


var level2 = {
    preload: function() {
        if (debugMode) {
            game.load.image('bg_level2', 'assets/levels/level2.png');

            game.load.image('pin1', 'assets/characters/pin1.png');
            game.load.image('pin2', 'assets/characters/pin2.png');
            game.load.image('pin3', 'assets/characters/pin3.png');
            game.load.image('pin4', 'assets/characters/pin4.png');

            game.load.image('mlody_suszy', 'assets/characters/mlody_suszy.png');

            game.load.audio('pin', 'assets/sounds/talk_pin.ogg');
            game.load.audio('pin_slow', 'assets/sounds/talk_pin2.ogg');
            game.load.audio('mlody', 'assets/sounds/talk_mlo.ogg');

            game.load.image('ramka', 'assets/misc/ramka.png');
            game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

            game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');

            loadTransitionPlugin();
        }
    },

    create: function() {
        if (music_overworld.isPlaying) music_overworld.stop();
        if (!(music_level2.isPlaying)) music_level2.play();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if(!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        bg = game.add.sprite(0, 0, 'bg_level2');

        door1 = createTrigger(0, 475, 640, 5);
        door2 = createTrigger(0, 0, 640, 5);

        if (!globalPenguinCutsceneTriggered) {
            pin_dialog_trigger = createTrigger(0, 325, 640, 5);

            pin = game.add.sprite(265, 168, 'pin1');

            pin_talk = game.add.audio('pin', 1, true);
            pin_talk2 = game.add.audio('pin_slow', 1, true);
            mlody_talk = game.add.audio('mlody', 1, true);
        }

        if(nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        dialogState = -1;

        setLoadBlock();
    },

    update: function() {
        if(loadBlock) return;

        if(dialogState >= 0 && dialogState <= 25) {
            stopDrako();
            level2.playCutscene();
        }
        else {
            game.physics.arcade.collide(drako, door1, doorGenerator(275, 20, 'level1'));
            game.physics.arcade.collide(drako, door2, doorGenerator(302, 400, 'level3'));

            if(pin_dialog_trigger)
                game.physics.arcade.collide(drako, pin_dialog_trigger, level2.pinDialogInit);

            moveDrako();
        }

        level2.runAnimations();
    },

    shutdown: function() {
        genericCleanup();

        if(pin) {
            pin.destroy();
            pin = null;
        }

        if(mlody) {
            mlody.destroy();
            mlody = null;
        }

        if(pin_talk) {
            pin_talk.destroy();
            pin_talk = null;
        }

        if(pin_talk2) {
            pin_talk2.destroy();
            pin_talk2 = null;
        }
    },

    pinDialogInit: function() {
        globalPenguinCutsceneTriggered = true;
        dialogState = 0;
        border = game.add.sprite(31, 10, 'ramka');
        text = game.add.bitmapText(62, 40, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
    },

    playCutscene: function() {
        if (dialogState == 0)
            renderText(text, level2_text_content1, pin_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level2_text_content2, pin_talk);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level2_text_content3, pin_talk);
        else if (dialogState == 5)
            textWaiter(6, 7, text);
        else if (dialogState == 6) {
            if (pin.key != 'pin2') pin.loadTexture('pin2');
            renderText(text, level2_text_content4, pin_talk2, 160);
        }
        else if (dialogState == 7)
            textWaiter(8, 9, text);
        else if (dialogState == 8) {
            if (pin.key != 'pin4') pin.loadTexture('pin4');
            renderText(text, level2_text_content5, pin_talk);
        }
        else if (dialogState == 9)
            textWaiter(10, 11, text);
        else if (dialogState == 10)
            renderText(text, level2_text_content6, pin_talk);
        else if (dialogState == 11)
            textWaiter(12, 13, text);
        else if (dialogState == 12) {
            if (pin.key != 'pin3') pin.loadTexture('pin3');
            renderText(text, level2_text_content7, pin_talk2, 160);
        }
        else if (dialogState == 13)
            textWaiter(14, 16, text);
        else if (dialogState == 14) {
            level2.startPenguinEscape();
            dialogState = 15;
        }
        else if (dialogState == 15)
            renderText(text, level2_text_content8, pin_talk);
        else if (dialogState == 16)
            textWaiter(17, 18, text);
        else if (dialogState == 17) {
            level2.startMlodyEntering();
            dialogState = 18;
        }
        else if (dialogState == 18)
            renderText(text, '');
        else if (dialogState == 19) {
            displayText(text, function() { dialogState = 21 });
            dialogState = 20;
        }
        else if (dialogState == 20)
            renderText(text, level2_text_content9, mlody_talk);
        else if (dialogState == 21)
            textWaiter(22, 23, text);
        else if (dialogState == 22)
            renderText(text, level2_text_content10, mlody_talk);
        else if (dialogState == 23) {
            level2.startMlodyLeaving();
            dialogState = 24;
        }
        else if (dialogState == 24) {
            pin_dialog_trigger.destroy();
            pin_dialog_trigger = null;
            dialogState = 25;
        }
        else if (dialogState == 25)
            textFinishWaiter();
    },

    startPenguinEscape: function() {
        penguinEscaping = true;
    },

    startMlodyEntering: function() {
        mlody = game.add.sprite(640, 195, 'mlody_suszy');
        mlodyEntering = true;
    },

    startMlodyLeaving: function() {
        mlodyLeaving = true;
    },

    runAnimations: function() {
        var deltaTime = game.time.elapsed / 1000;

        if (penguinEscaping) {
            pin.x -= 150 * deltaTime;
            if (pin.x < -200) penguinEscaping = false;
        }

        if (mlodyEntering) {
            mlody.x -= 170 * deltaTime;
            if (mlody.x < 272) {
                mlodyEntering = false;
                dialogState = 19;
            }
        }

        if (mlodyLeaving) {
            mlody.y -= 170 * deltaTime;
            if (mlody.y < -70) {
                mlodyLeaving = false;
            }
        }
    }
};

