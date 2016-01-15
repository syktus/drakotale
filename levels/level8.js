var shoe_trigger, washmachine_trigger, nokia_trigger, nokia_col, hidden_door_trigger;
var nokia;

var level8_text_content1 = '* Wzdych.\n* Miałeś chamie złoty róg,\n   ostał ci się ino but...';
var level8_text_content2 = '* Który pamięta dni noszenia go...\n   ale prania nie pamięta.';
var level8_text_content3 = '* A OBOK STOI PRALKA.\n   Ironio, ty wredna kobieto...';
var level8_text_content4 = 'Pralka.\nPierze ubrania, myśli i pieniądze.';
var level8_text_content5 = 'W ścianie są jakieś podejrzane\nwyżłobienia...';
var level8_text_content6 = 'Tutaj ewidentnie są sekretne drzwi.\nAle czegoś jeszcze brakuje,\nżeby je otworzyć.';
var level8_text_content7 = 'Legendy twierdzą, że jest to\nnajtwardszy przedmiot na świecie...' ;
var level8_text_content8 = '* wrrrruuum pioru pioru *';

var level8 = {
    preload: function () {
        game.load.image('bg_level8a', 'assets/levels/level8a.png');
        game.load.image('bg_level8b', 'assets/levels/level8b.png');

        game.load.image('nokia', 'assets/items/item2.png');
        game.load.image('nokia_carry', 'assets/items/item2_carry.png');

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

        if (!globalClothTaken)
            bg = game.add.sprite(0, 0, 'bg_level8a');
        else
            bg = game.add.sprite(0, 0, 'bg_level8b');

        door1 = createTrigger(635, 160, 5, 135);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 160, 112, 480, col));
        col_sprites.push(makeRectangle(0, 0, 640, 160, col));
        col_sprites.push(makeRectangle(112, 413, 416, 80, col));
        col_sprites.push(makeRectangle(540, 160, 140, 36, col));
        col_sprites.push(makeRectangle(528, 292, 112, 200, col));
        col_sprites.push(makeRectangle(209, 100, 94, 70, col));
        col_sprites.push(makeRectangle(112, 230, 130, 220, col));
        col_sprites.push(makeRectangle(240, 340, 150, 100, col));
        col_sprites.push(makeRectangle(240, 290, 50, 50, col));

        col.visible = false;

        shoe_trigger = createTrigger(290, 320, 140, 100);

        washmachine_trigger = createTrigger(219, 100, 74, 90);

        hidden_door_trigger = createTrigger(460, 160, 70, 20);

        if (!globalNokiaTaken) {
            nokia_col = createTrigger(350, 220, 124, 57);
            nokia = game.add.sprite(350, 220, 'nokia');
            nokia_trigger = createTrigger(330, 200, 164, 97);
        }

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(580, 200);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 1) {
            stopDrako();
            level8.washmachineInteractInactive();
        }
        else if (dialogState >= 2 && dialogState <= 7) {
            stopDrako();
            level8.shoeDialogCutscene();
        }
        else if (dialogState >= 8 && dialogState <= 13) {
            stopDrako();
            level8.nokiaDialogCutscene();
        }
        else if (dialogState >= 14 && dialogState <= 15) {
            stopDrako();
            level8.hiddenDoorDialogCutscene();
        }
        else if (dialogState >= 16 && dialogState <= 20) {
            stopDrako();
            level8.washmachineInteractActive();
        }
        else if (dialogState >= 21 && dialogState <= 22) {
            stopDrako();
            level8.hiddenDoorDialog2Cutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(24, 200, 'level7'));

            if (!globalNokiaTaken)
                game.physics.arcade.collide(drako, nokia_col);

            if (!globalNokiaTaken && spaceDown() && game.physics.arcade.overlap(drako, nokia_trigger))
                level8.nokiaDialogInit();

            if (!globalClothTaken && spaceDown() && game.physics.arcade.overlap(drako, washmachine_trigger))
                level8.washmachineDialogInit();
            else if (!globalClothWashed && spaceDown() && game.physics.arcade.overlap(drako, washmachine_trigger))
                level8.washmachineDialog2Init();
            else if (spaceDown() && game.physics.arcade.overlap(drako, washmachine_trigger))
                level8.washmachineDialogInit();


            if (spaceDown() && game.physics.arcade.overlap(drako, shoe_trigger))
                level8.shoeDialogInit();

            if (!globalClothTaken && spaceDown() && game.physics.arcade.overlap(drako, hidden_door_trigger))
                level8.hiddenDoorDialogInit();
            else if (spaceDown() && game.physics.arcade.overlap(drako, hidden_door_trigger))
                level8.hiddenDoorDialog2Init();

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();

        if(nokia) {
            nokia.destroy();
            nokia = null;
        }

        if(nokia_trigger) {
            nokia_trigger.destroy();
            nokia_trigger = null;
        }

        if(nokia_col) {
            nokia_col.destroy();
            nokia_col = null;
        }

        if(shoe_trigger) {
            shoe_trigger.destroy();
            shoe_trigger = null;
        }

        if(hidden_door_trigger) {
            hidden_door_trigger.destroy();
            hidden_door_trigger = null;
        }

        if(washmachine_trigger) {
            washmachine_trigger.destroy();
            washmachine_trigger = null;
        }
    },

    washmachineDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    washmachineInteractInactive: function() {
        if (dialogState == 0)
            renderText(text, level8_text_content4);
        else if (dialogState == 1)
            textFinishWaiter();
    },

    washmachineDialog2Init: function() {
        dialogState = 16;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 17 });
        lockSpace(0.3);
    },

    washmachineInteractActive: function() {
        if (dialogState == 16)
            renderText(text, level8_text_content8);
        else if (dialogState == 17){
            globalClothWashed = true;
            dropItem();
            dialogState = 18;
        }
        else if (dialogState == 18)
            genericWaiter(19);
        else if (dialogState == 19) {
            takeItem(ITEM_CLOTH_CLEAN);
            dialogState = 20;
        }
        else if (dialogState == 20)
            choiceFinish();
    },

    shoeDialogInit: function() {
        dialogState = 2;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 3 });
        lockSpace(0.3);
    },

    shoeDialogCutscene: function() {
        if (dialogState == 2)
            renderText(text, level8_text_content1);
        else if (dialogState == 3)
            textWaiter(4, 5, text);
        else if (dialogState == 4)
            renderText(text, level8_text_content2);
        else if (dialogState == 5)
            textWaiter(6, 7, text);
        else if (dialogState == 6)
            renderText(text, level8_text_content3);
        else if (dialogState == 7)
            textFinishWaiter();
    },

    nokiaDialogInit: function() {
        dialogState = 8;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 9 });
        lockSpace(0.3);
    },

    nokiaDialogCutscene: function() {
        if (dialogState == 8)
            renderText(text, level8_text_content7);
        else if (dialogState == 9) {
            setupChoice(406, true);
            dialogState = 10;
        }
        else if (dialogState == 10)
            renderChoice(choice1, choice2, 'WEŹ', 'ZOSTAW', 11);
        else if (dialogState == 11)
            choiceWaiter(12, 13);
        else if (dialogState == 12) {
            takeItem(ITEM_NOKIA);
            globalNokiaTaken = true;
            nokia.visible = false;
            dialogState = 13;
        }
        else if (dialogState == 13)
            choiceFinish();
    },

    hiddenDoorDialogInit: function() {
        dialogState = 14;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 15 });
        lockSpace(0.3);
    },

    hiddenDoorDialogCutscene: function() {
        if (dialogState == 14)
            renderText(text, level8_text_content5);
        else if (dialogState == 15)
            textFinishWaiter();
    },

    hiddenDoorDialog2Init: function() {
        dialogState = 21;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 22 });
        lockSpace(0.3);
    },

    hiddenDoorDialog2Cutscene: function() {
        if (dialogState == 21)
            renderText(text, level8_text_content6);
        else if (dialogState == 22)
            textFinishWaiter();
    }
};
