var pin_dialog, pinDialogOn = false;
var pin, border, text;

var text_content1 = '* Siemaneczko słon-NIP! -neczko!\n* Jestem Pinguey.\n* Pinguey Pingwin!';
var text_content2 = '* Kurczę, troszkę zagubiona się wydajesz!\n   Nowa tutaj, co? NIP! Ale nie martw się!';
var text_content3 = 'Pom-NIP-mogę ci!  Pingwiny to bardzo przyjazne stworzenia! (pingwin przybiera bardziej kripi forme)' +
    'Które bardzo lubią dzieci. Najlepiej nadziewane, na zimno NIP! Jak zemsta... ...?' +
    'NIIIIIIP! czujesz ciepły powiew NIE! TYLKO NNIP -IE CIEPŁO! Moje arktyczne serce nie wytrzyma tego!' +
    'NIP! Teraz ci się udało, ale nigdy stąd nie wyjdziesz! A wiesz dlaczego?' +
    'BO NIGDY NIE USZCZĘŚLIWISZ WSZYSTKICH! NIPNIPNIPNIPNIP! Pingwin uciekł.';

var level2 = {
    preload: function() {
        game.load.image('bg_level2', 'assets/level2.png');

        game.load.image('pin1', 'assets/pin1.png');
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

        pin_dialog = game.add.group();
        pin_dialog.enableBody = true;
        pin_dialog.physicsBodyType = Phaser.Physics.ARCADE;
        pin_dialog.visible = false;

        makeRectangle(0, 325, 640, 5, pin_dialog);

        pin = game.add.sprite(265, 168, 'pin1');

        if(nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        setLoadBlock();
    },

    update: function() {
        if(loadBlock) return;

        if(pinDialogOn) {
            stopDrako();
            this.playCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(275, 20, 'level1'));
            game.physics.arcade.collide(drako, pin_dialog, this.pinDialogCallback);

            moveDrako();
        }
    },

    shutdown: function() {
        genericCleanup();

        if(pin) {
            pin.destroy();
            pin = null;
        }

        if(border) {
            border.destroy();
            border = null;
        }

        if(text) {
            text.destroy();
            text = null;
        }

    },

    pinDialogCallback: function() {
        pinDialogOn = true;
        border = game.add.sprite(31, 10, 'ramka');
        text = game.add.bitmapText(62, 40, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
    },

    playCutscene: function() {
        if (dialogState == 0)
            renderText(text, text_content1);
        else if (dialogState == 1)
            textWaiter(2, 3, text)();
        else if (dialogState == 2)
            renderText(text, text_content2);
        else if (dialogState == 3)
            textWaiter(4, 5, text)();
        else if (dialogState == 4)
            renderText(text, text_content3);

    }
};

