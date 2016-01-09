function makeRectangle(x, y, a, b, group) {
    var obj = game.add.bitmapData(a, b);

    obj.ctx.rect(0, 0, a, b);
    obj.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    obj.ctx.fill();

    obj_sprite = game.add.sprite(x, y, obj, 0, group);
    obj_sprite.body.immovable = true;
}

var MOVE_SPEED = 170;

function moveDrako() {
    drako.body.velocity.x = 0;
    drako.body.velocity.y = 0;

    if (cursors.left.isDown) {
        drako.body.velocity.x = -MOVE_SPEED;
        drako.animations.play('left');
    }
    else if (cursors.right.isDown) {
        drako.body.velocity.x = MOVE_SPEED;
        drako.animations.play('right');
    }

    if (cursors.down.isDown) {
        drako.body.velocity.y = MOVE_SPEED;
        if (!cursors.left.isDown && !cursors.right.isDown) drako.animations.play('down');
    }
    else if (cursors.up.isDown) {
        drako.body.velocity.y = -MOVE_SPEED;
        if (!cursors.left.isDown && !cursors.right.isDown) drako.animations.play('up');
    }

    if (!cursors.up.isDown && !cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
        drako.animations.stop();
        drako.frame -= drako.frame % 2;
    }
}

function stopDrako() {
    drako.body.velocity.x = 0;
    drako.body.velocity.y = 0;
    drako.animations.stop();
    drako.frame -= drako.frame % 2;
}

function createDrako(x, y) {
    drako = game.add.sprite(x, y, 'drako');
    game.physics.arcade.enable(drako);

    drako.body.collideWorldBounds = true;
    drako.animations.add('down', [0, 1], 10, true);
    drako.animations.add('up', [2, 3], 10, true);
    drako.animations.add('right', [4, 5], 10, true);
    drako.animations.add('left', [6, 7], 10, true);

    drako.body.setSize(25, 30, 6, 30);
}

function genericCleanup() {
    if(bg)
    {
        bg.destroy();
        bg = null;
    }

    if(col_sprites) {
        col_sprites.forEach(function (e) {
            if(e) e.destroy()
        });
        col_sprites = null;
    }

    if(drako)
    {
        drako.destroy();
        drako = null;
    }
}

function loadTransitionPlugin() {
    if(!transitionPlugin) {
        transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);

        transitionPlugin.settings({
            duration: 1000,

            ease: Phaser.Easing.Exponential.InOut,

            properties: { alpha: 0 }
        });
    }
}

function setLoadBlock() {
    loadBlock = true;
    game.time.events.add(Phaser.Timer.SECOND * 0.7, unlockBlock);

}

function unlockBlock() {
    loadBlock = false;
}
