var level2 = {
    preload: function() {
        game.load.image('bg_level2', 'assets/level2.png');

        game.load.spritesheet('drako', 'assets/drako.png', 36, 60);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        if(!cursors)
            cursors = game.input.keyboard.createCursorKeys();

        bg = game.add.sprite(0, 0, 'bg_level2');

        createDrako(292, 400);
    },

    update: function() {
        game.physics.arcade.collide(drako, col);

        moveDrako();
    },

    shutdown: function() {
        genericCleanup();
    }

};

