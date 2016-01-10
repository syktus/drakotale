var mlody_trigger, computer_trigger;
var mlody, mlody_head, mlody_talk;

var level4_text_content1 = '* Zapraszam.\n* Jestem Myriad.\n* Myriad Pro.';
var level4_text_content2 = '* Syf, ale przynajmniej\n   nie zamarznie się...\n   ...na kość.';
var level4_text_content3 = '* Hehs. No wiesz,\n   bo tam zimno było i w ogóle...\n* Uratowałem cię?';
var level4_text_content4 = '* Spoks, nie ma sprawy!\n* ...\n* Po co mi suszarka?';
var level4_text_content5 = '* A jakoś tak... \n* chciałem poczuć trochę\n   wiatru we włosach.';
var level4_text_content6 = '* I ciepła na skórze...\n* E, w sumie i tak nie mam\n   ani tego ani tego...';

var level4_choice_content1 = ['Ale ty masz włosy', 'Hehe! łysa kupa kości'];

var level4_text_content7 = '* Jesteś u pani!';
var level4_text_content8 = '* Mam...?\n   A myślałem że już\n   wyłysiałem ze starości.';
var level4_text_content9 = '* Yolo, czyli raz sie...\n   biega z suszarką.';
var level4_text_content10 = '* Grat\n   ale jeszcze pociągnie Maple';
var level4_text_content11 = '* Chociaż gry już\n   chyba nie dla mnie...';

var level4_choice_content2 = ['Masz rację', 'Czemu? gry są zawsze spoko'];

var level4_text_content12 = '* ...zaczyna mnie łupać w kościach.';
var level4_text_content13 = '* Serio? Bo ktoś mi powiedział,\n   że tylko dzieciaki grają\n    i że jestem za stary...';

var level4_choice_content3 = ['Jesteś piękny i MŁODY! ', 'Jesteś STARY i brzydki!'];

var level4_text_content14 = '* ...no...chyba... ty.';
var level4_text_content15 = '* Hm... skoro tak mówisz!\n   YOLO!';
var level4_text_content16 = '* To ja pogram...\n   A ty idź dalej!';

var level4 = {
    preload: function () {
        game.load.image('bg_level4', 'assets/level4.png');

        game.load.spritesheet('mlody', 'assets/mlody_sprite.png', 46, 65);
        game.load.spritesheet('mlody_head', 'assets/mlody_sprite_head.png', 46, 35);
        game.load.image('av_mlody_sad', 'assets/av_mlody_sad.png');
        game.load.image('av_mlody_happy', 'assets/av_mlody_happy.png');

        game.load.audio('mlody', 'assets/talk_mlo.ogg');

        game.load.image('ramka', 'assets/ramka.png');
        game.load.spritesheet('drako', 'assets/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/determination_sans_0.png', 'assets/determination_sans.xml');

        loadTransitionPlugin();
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if (!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        bg = game.add.sprite(0, 0, 'bg_level4');

        door1 = createTrigger(0, 475, 640, 5);
        door2 = createTrigger(280, 130, 80, 5);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 280, 160, col));
        col_sprites.push(makeRectangle(0, 160, 160, 40, col));
        col_sprites.push(makeRectangle(0, 200, 120, 80, col));
        col_sprites.push(makeRectangle(0, 280, 160, 40, col));
        col_sprites.push(makeRectangle(0, 320, 240, 320, col));
        col_sprites.push(makeRectangle(360, 0, 280, 160, col));
        col_sprites.push(makeRectangle(480, 160, 160, 40, col));
        col_sprites.push(makeRectangle(520, 200, 120, 80, col));
        col_sprites.push(makeRectangle(480, 280, 160, 40, col));
        col_sprites.push(makeRectangle(400, 320, 240, 320, col));
        col_sprites.push(makeRectangle(380, 160, 80, 20, col));
        col_sprites.push(makeRectangle(200, 230, 46, 40, col));

        col.visible = false;

        mlody = game.add.sprite(200, 200, 'mlody');
        mlody.frame = 1;

        mlody_trigger = createTrigger(240, 320, 160, 5);

        mlody_talk = game.add.audio('mlody', 1, true);

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        mlody_head = game.add.sprite(200, 200, 'mlody_head');
        mlody_head.frame = 1;

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 100) {
            stopDrako();
            level4.mlodyDialogCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 180, 'level3'));
            game.physics.arcade.collide(drako, door2/*, doorGenerator(302, 400, 'level5')*/);

            if (mlody_trigger)
                game.physics.arcade.collide(drako, mlody_trigger, level4.mlodyDialogInit);

            if (spaceDown() && game.physics.arcade.overlap(drako, computer_trigger))
                level4.computerDialogInit();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(mlody) {
            mlody.destroy();
            mlody = null;
        }

        if(mlody_head) {
            mlody_head.destroy();
            mlody_head = null;
        }

        if(mlody_trigger) {
            mlody_trigger.destroy();
            mlody_trigger = null;
        }

        if(computer_trigger) {
            computer_trigger.destroy();
            computer_trigger = null;
        }
    },

    mlodyDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        avatar = game.add.sprite(49, 340, 'av_mlody_sad');
        text = game.add.bitmapText(174, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
    },

    mlodyDialogCutscene: function() {
        if (dialogState == 0)
            renderText(text, level4_text_content1, mlody_talk);
        else if (dialogState == 1)
            textWaiter(2, 3, text);
        else if (dialogState == 2)
            renderText(text, level4_text_content2, mlody_talk);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level4_text_content3, mlody_talk);
        else if (dialogState == 5)
            textWaiter(6, 7, text);
        else if (dialogState == 6)
            renderText(text, level4_text_content4, mlody_talk);
        else if (dialogState == 7)
            textWaiter(8, 9, text);
        else if (dialogState == 8)
            renderText(text, level4_text_content5, mlody_talk);
        else if (dialogState == 9)
            textWaiter(10, 11, text);
        else if (dialogState == 10)
            renderText(text, level4_text_content6, mlody_talk);
    }
};

