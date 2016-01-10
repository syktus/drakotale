var level1 = {
    preload: function() {
        game.load.image('bg_level1', 'assets/level1.png');
        game.load.image('bg_level2', 'assets/level2.png');

        game.load.image('pin1', 'assets/pin1.png');
        game.load.image('ramka', 'assets/ramka.png');

        game.load.spritesheet('drako', 'assets/drako.png', 36, 60);

        loadTransitionPlugin();
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        doorActivated = false;

        if(!cursors)
            cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        bg = game.add.sprite(0, 0, 'bg_level1');

        col = game.add.group();

        game.physics.arcade.enable(col);
        col.enableBody = true;
        col.physicsBodyType = Phaser.Physics.ARCADE;

        col_sprites = [];

        col_sprites.push(makeRectangle(0, 0, 244, 100, col));
        col_sprites.push(makeRectangle(0, 100, 120, 40, col));
        col_sprites.push(makeRectangle(161, 100, 60, 40, col));
        col_sprites.push(makeRectangle(0, 140, 40, 300, col));
        col_sprites.push(makeRectangle(0, 340, 80, 80, col));
        col_sprites.push(makeRectangle(0, 380, 120, 80, col));
        col_sprites.push(makeRectangle(0, 420, 160, 80, col));
        col_sprites.push(makeRectangle(0, 460, 640, 20, col));
        col_sprites.push(makeRectangle(440, 420, 100, 80, col));
        col_sprites.push(makeRectangle(480, 380, 100, 60, col));
        col_sprites.push(makeRectangle(342, 0, 244, 100, col));
        col_sprites.push(makeRectangle(480, 100, 244, 40, col));
        col_sprites.push(makeRectangle(560, 100, 244, 300, col));

        col.visible = false;

        door1 = game.add.group();
        door1.enableBody = true;
        door1.physicsBodyType = Phaser.Physics.ARCADE;
        door1.visible = false;

        makeRectangle(244, 0, 96, 5, door1);

        if(nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(280, 220);

        setLoadBlock();
    },

    update: function() {
        if(loadBlock) return;

        game.physics.arcade.collide(drako, col);
        game.physics.arcade.collide(drako, door1, doorGenerator(302, 400, 'level1'));

        moveDrako();
    },

    shutdown: function() {
        genericCleanup();
    }
};

