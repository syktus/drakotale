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

var nextLetterTime = 0;
var nextLetterIndex = 0;
var textFinishedCallback = null;

function displayText(t, callback) {
    nextLetterIndex = 0;
    nextLetterTime = 0;
    textFinishedCallback = callback;
    t.setText('');
}

function renderText(t, string, sound, textSpeed) {
    if (typeof(textSpeed) === 'undefined') textSpeed = 40;
    if (sound && !sound.isPlaying) sound.play();
    if (game.time.now > nextLetterTime) {
        if (nextLetterIndex < string.length) {
            if(string[nextLetterIndex] == ' ') {
                t.setText(t.text + '  ');
                nextLetterIndex++;
            }

            if(string[nextLetterIndex] == 'ą')
                t.setText(t.text + 'ą ');
            else
                t.setText(t.text + string[nextLetterIndex]);

            nextLetterIndex++;
            if (spaceDown())
                nextLetterTime = game.time.now;
            else
                nextLetterTime = game.time.now + textSpeed;
        }
        else {
            if (sound && sound.isPlaying) sound.onLoop.add(function() { sound.stop() });
            if (textFinishedCallback) textFinishedCallback();
        }
    }
}

var spaceIsLocked = false;

function lockSpace(time) {
    if (typeof(time) === 'undefined') time = 0.5;
    spaceIsLocked = true;
    game.time.events.add(Phaser.Timer.SECOND * time, function() { spaceIsLocked = false; });
}

function spaceDown() {
    return !spaceIsLocked && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
}

function textWaiter(transitionState, nextState, t) {
    if (spaceDown()) {
        dialogState = transitionState;
        displayText(t, function () {
            dialogState = nextState;
        });
    }
}

function textFinishWaiter(t, b) {
    if (spaceDown()) {
        lockSpace();
        t.destroy();
        border = null;
        b.destroy();
        text = null;
        dialogState = -1;
    }
}

function doorGenerator(x, y, level) {
    return function() {
        if(!doorActivated) {
            doorActivated = true;
            nextDrakoX = x;
            nextDrakoY = y;
            transitionPlugin.to(level);
        }
    }
}

function setLoadBlock() {
    loadBlock = true;
    game.time.events.add(Phaser.Timer.SECOND * 0.7, unlockBlock);
}

function unlockBlock() {
    loadBlock = false;
}

function createTrigger(x, y, a, b, visible) {
    if (typeof(visible) === 'undefined') visible = false;

    var obj = game.add.group();
    obj.enableBody = true;
    obj.physicsBodyType = Phaser.Physics.ARCADE;
    obj.visible = visible;

    makeRectangle(x, y, a, b, obj);

    return obj;
}
