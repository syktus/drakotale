var level3_text_content1 = 'Papuga Katarzynka.\n Wygląda na samotną.';


var level3 = {
    preload: function () {
        game.load.image('bg_level3', 'assets/level3.png');

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

        bg = game.add.sprite(0, 0, 'bg_level3');

        door1 = game.add.group();
        door1.enableBody = true;
        door1.physicsBodyType = Phaser.Physics.ARCADE;
        door1.visible = false;

        makeRectangle(0, 475, 640, 5, door1);

        door2 = game.add.group();
        door2.enableBody = true;
        door2.physicsBodyType = Phaser.Physics.ARCADE;
        door2.visible = false;

        makeRectangle(280, 160, 80, 5, door2);

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(240, 0, 40, 200, col));
        col_sprites.push(makeRectangle(360, 0, 40, 200, col));

        col.visible = false;

        if (nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(302, 400);

        dialogState = -1;

        setLoadBlock();
    },

    update: function () {
        if (loadBlock) return;

        if (dialogState >= 0 && dialogState <= 25) {
            stopDrako();
            level3.playCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 20, 'level2'));
            game.physics.arcade.collide(drako, door2/*, doorGenerator(302, 20, 'level2')*/);

            moveDrako();
        }
    },

    shutdown: function () {
        genericCleanup();
    }
}
