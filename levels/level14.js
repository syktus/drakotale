var drako2_trigger;
var drako2, t1;

var level14_text_content1 = '* Światło jest zamglone.\n   Słyszysz dźwięki, ale\n   nie możesz ich rozpoznać. *';
var level14_text_content2 = '* Odgadłaś już?\n* Jak pokonać barierę?\n* To mogło być oczywiste...';
var level14_text_content3 = '* ...albo wcale nie.\n* Tak czy siak...\n* Nie uda ci się.';
var level14_text_content4 = '* Wiesz to, prawda?\n* Wiemy to, prawda?';
var level14_text_content5 = '* Bo kluczem do tej bariery\n   jest szczęście wszystkich.';
var level14_text_content6 = '* A wszyscy nie mogą\n   być szczęśliwi.';
var level14_text_content7 = '* Ale ile byś im nie\n   pomagała, zawsze znajdą\n   się nowe problemy.';
var level14_text_content8 = '* Ile bym im nie pomagała,\n   zawsze wszytsko zwali\n   mi się na głowę!';
var level14_text_content9 = '* J A   N I E   M O G Ę\n* B Y Ć   S Z C Z Ę Ś L I W A.';
var level14_text_content10 = '* W I Ę C   T Y   T E Ż\n* N I E   B Ę D Z I E S Z.';


var level14 = {
    preload: function () {
        if (debugMode) {
            game.load.image('bg_level14', 'assets/levels/level14.png');

            game.load.image('drako2', 'assets/characters/drakosad_sprite.png');

            game.load.image('heart', 'assets/misc/heart.png');
            game.load.image('ramka', 'assets/misc/ramka.png');
            game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

            game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');

            loadTransitionPlugin();
        }
    },

    create: function () {
        if (music_overworld.isPlaying) music_overworld.stop();
        if (!(music_level14.isPlaying)) music_level14.play();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        bg = game.add.sprite(0, 0, 'bg_level14');

        door1 = createTrigger(0, 0, 5, 480);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 640, 160, col));

        col.visible = false;

        drako2 = game.add.sprite(24, 240, 'drako2');
        drako2.alpha = 0;

        drako2_trigger = createTrigger(360, 0, 10, 480);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(24, 240);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 21) {
            stopDrako();
            level14.drakoCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(504, 320, 'level13'));

            game.physics.arcade.collide(drako, drako2_trigger, level14.drakoDialogInit);

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(drako2) {
            drako2.destroy();
            drako2 = null;
        }

        if(drako2_trigger) {
            drako2_trigger.destroy();
            drako2_trigger = null;
        }
    },

    drakoDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    drakoCutscene: function() {
        if (dialogState == 0)
            renderText(text, level14_text_content1);
        else if (dialogState == 1)
            textWaiter(2, 4, text);
        else if (dialogState == 2) {
            t1 = game.add.tween(drako2).to( { alpha: 1 }, 2000, "Linear", true);
            t1.onComplete.add(function() {
                t1.onComplete.removeAll();
                dialogState = 3;
            });
        }
        else if (dialogState == 3)
            renderText(text, level14_text_content2);
        else if (dialogState == 4)
            textWaiter(5, 6, text);
        else if (dialogState == 5)
            renderText(text, level14_text_content3);
        else if (dialogState == 6)
            textWaiter(7, 8, text);
        else if (dialogState == 7)
            renderText(text, level14_text_content4);
        else if (dialogState == 8)
            textWaiter(9, 10, text);
        else if (dialogState == 9)
            renderText(text, level14_text_content5);
        else if (dialogState == 10)
            textWaiter(11, 12, text);
        else if (dialogState == 11)
            renderText(text, level14_text_content6);
        else if (dialogState == 12)
            textWaiter(13, 14, text);
        else if (dialogState == 13)
            renderText(text, level14_text_content7);
        else if (dialogState == 14)
            textWaiter(15, 16, text);
        else if (dialogState == 15)
            renderText(text, level14_text_content8);
        else if (dialogState == 16)
            textWaiter(17, 18, text);
        else if (dialogState == 17)
            renderText(text, level14_text_content9);
        else if (dialogState == 18)
            textWaiter(19, 20, text);
        else if (dialogState == 19)
            renderText(text, level14_text_content10);
        else if (dialogState == 20)
            genericWaiter(21);
        else if (dialogState == 21)
        {
            spaceIsLocked = false;
            transitionPlugin.to('final');
        }
    }
};
