var pin_dialog_trigger;
var pin, mlody;

var penguinEscaping = false, mlodyEntering = false, mlodyLeaving = false;

var level2_text_content1 = '* Siemaneczko słon-NIP! -neczko!\n* Jestem Pinguey.\n* Pinguey Pingwin!';
var level2_text_content2 = '* Kurczę, troszkę zagubiona się wydajesz!\n   Nowa tutaj, co? NIP! Ale nie martw się!';
var level2_text_content3 = '* Pom-NIP-mogę Ci!\n* Pingwiny to bardzo przyjazne stworzenia!';
var level2_text_content4 = '* Które bardzo lubią dzieci.\n* Najlepiej nadziewane,\n* na zimno NIP! Jak zemsta...';
var level2_text_content5 = '*  ...?\n   NIIIIIIP! czujesz ciepły powiew?\n   NIE! TYLKO NNIP -IE CIEPŁO!';
var level2_text_content6 = '* Moje arktyczne serce nie wytrzyma tego!\n   NIP! Teraz ci się udało,\n   ale nigdy stąd nie wyjdziesz!';
var level2_text_content7 = '* A wiesz dlaczego?\n* BO NIGDY NIE USZCZĘŚLIWISZ WSZYSTKICH!';
var level2_text_content8 = '* NIPNIPNIPNIPNIP!';
var level2_text_content9 = '* ...?\n* ...cześć...';
var level2_text_content10 = '* Spodziewałem się mrożonych brokułów.\n   Ale nie mrożonej babki w okularach.\n   Cho no ze mną';


var level2 = {
    preload: function() {
        game.load.image('bg_level2', 'assets/level2.png');

        game.load.image('pin1', 'assets/pin1.png');
        game.load.image('pin2', 'assets/pin2.png');
        game.load.image('pin3', 'assets/pin3.png');
        game.load.image('pin4', 'assets/pin4.png');

        game.load.image('mlody_suszy', 'assets/mlody_suszy.png');

        game.load.image('ramka', 'assets/ramka.png');

        game.load.spritesheet('drako', 'assets/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/determination_sans_0.png', 'assets/determination_sans.xml');

        loadTransitionPlugin();
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if(!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        bg = game.add.sprite(0, 0, 'bg_level2');

        door1 = game.add.group();
        door1.enableBody = true;
        door1.physicsBodyType = Phaser.Physics.ARCADE;
        door1.visible = false;

        makeRectangle(0, 475, 640, 5, door1);

        if (!globalPenguinCutsceneTriggered) {
            pin_dialog_trigger = game.add.group();
            pin_dialog_trigger.enableBody = true;
            pin_dialog_trigger.physicsBodyType = Phaser.Physics.ARCADE;
            pin_dialog_trigger.visible = false;

            makeRectangle(0, 325, 640, 5, pin_dialog_trigger);

            pin = game.add.sprite(265, 168, 'pin1');
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
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(275, 20, 'level1'));
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
            renderText(text, level2_text_content1);
        else if (dialogState == 1)
            textWaiter(2, 3, text)();
        else if (dialogState == 2)
            renderText(text, level2_text_content2);
        else if (dialogState == 3)
            textWaiter(4, 5, text)();
        else if (dialogState == 4)
            renderText(text, level2_text_content3);
        else if (dialogState == 5)
            textWaiter(6, 7, text)();
        else if (dialogState == 6) {
            if (pin.key != 'pin2') pin.loadTexture('pin2');
            renderText(text, level2_text_content4, 160);
        }
        else if (dialogState == 7)
            textWaiter(8, 9, text)();
        else if (dialogState == 8) {
            if (pin.key != 'pin4') pin.loadTexture('pin4');
            renderText(text, level2_text_content5);
        }
        else if (dialogState == 9)
            textWaiter(10, 11, text)();
        else if (dialogState == 10)
            renderText(text, level2_text_content6);
        else if (dialogState == 11)
            textWaiter(12, 13, text)();
        else if (dialogState == 12) {
            if (pin.key != 'pin3') pin.loadTexture('pin3');
            renderText(text, level2_text_content7);
        }
        else if (dialogState == 13)
            textWaiter(14, 16, text)();
        else if (dialogState == 14) {
            level2.startPenguinEscape();
            dialogState = 15;
        }
        else if (dialogState == 15)
            renderText(text, level2_text_content8);
        else if (dialogState == 16)
            textWaiter(17, 18, text)();
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
            renderText(text, level2_text_content9);
        else if (dialogState == 21)
            textWaiter(22, 23, text)();
        else if (dialogState == 22)
            renderText(text, level2_text_content10);
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
            textFinishWaiter(text, border);
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

