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
    showCarryItem();
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

            if(string[nextLetterIndex] == 'ą' && t.font != 'times_new_misza')
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
            if (sound && sound.isPlaying) sound.onLoop.add(function() { sound.stop(); sound.onLoop.removeAll(); });
            if (textFinishedCallback) textFinishedCallback();
        }
    }
}

var leftChoiceFilled;

function setupChoice(y, wide) {
    if (typeof(wide) === 'undefined') wide = false;
    if (!choice1) {
        if (!wide) choice1 = game.add.bitmapText(204, y, 'determination_font', '', 29);
        else choice1 = game.add.bitmapText(87, y, 'determination_font', '', 29);
    }
    else choice1.y = y;

    if (!choice2) {
        if (!wide) choice2 = game.add.bitmapText(400, y, 'determination_font', '', 29);
        else choice2 = game.add.bitmapText(283, y, 'determination_font', '', 29);
    }
    else choice2.y = y;

    choiceState = 0;

    if (!heart) {
        if (!wide) heart = game.add.sprite(174, y+8, 'heart');
        else heart = game.add.sprite(62, y+8, 'heart');
    }
    else {
        if (!wide) heart.x = 174;
        else heart = 62;
        heart.y = y+8;
    }

    heart.visible = false;
    initChoice();
}

function initChoice() {
    nextLetterIndex = 0;
    nextLetterTime = 0;
    leftChoiceFilled = false;
}

function renderChoice(c1, c2, s1, s2, nextState) {
    if (game.time.now > nextLetterTime) {
        if (!leftChoiceFilled) {
            if (nextLetterIndex < s1.length) {
                if(s1[nextLetterIndex] == ' ') {
                    c1.setText(c1.text + '  ');
                    nextLetterIndex++;
                }

                c1.setText(c1.text + s1[nextLetterIndex]);
                nextLetterIndex++;
            }
            else {
                nextLetterIndex = 0;
                leftChoiceFilled = true;
            }
        }
        else {
            if (nextLetterIndex < s2.length) {
                if(s2[nextLetterIndex] == ' ') {
                    c2.setText(c2.text + '  ');
                    nextLetterIndex++;
                }

                c2.setText(c2.text + s2[nextLetterIndex]);
                nextLetterIndex++;
            }
            else {
                dialogState = nextState;
                heart.visible = true;
            }
        }
        if (spaceDown())
            nextLetterTime = game.time.now;
        else
            nextLetterTime = game.time.now + 40;
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
        lockSpace(0.3);
        dialogState = transitionState;
        displayText(t, function () {
            dialogState = nextState;
        });
    }
}

function textFinishWaiter() {
    if (spaceDown()) {
        lockSpace();
        if (text) {
            text.destroy();
            text = null;
        }

        if (border) {
            border.destroy();
            border = null;
        }

        if (choice1) {
            choice1.destroy();
            choice1 = null;
        }

        if (choice2) {
            choice2.destroy();
            choice2 = null;
        }

        if (heart) {
            heart.destroy();
            heart = null;
        }

        if (avatar)  {
            avatar.destroy();
            avatar = null;
        }
        dialogState = -1;
    }
}

function choiceFinish() {
    if (text) {
        text.destroy();
        text = null;
    }

    if (border) {
        border.destroy();
        border = null;
    }

    if (choice1) {
        choice1.destroy();
        choice1 = null;
    }

    if (choice2) {
        choice2.destroy();
        choice2 = null;
    }

    if (heart) {
        heart.destroy();
        heart = null;
    }

    if (avatar)  {
        avatar.destroy();
        avatar = null;
    }
    dialogState = -1;
}

function genericWaiter(transitionState) {
    if (spaceDown()) {
        lockSpace(0.3);
        dialogState = transitionState;
    }
}

var choiceState;
function choiceWaiter(firstChoiceState, secondChoiceState) {
    if (spaceDown()) {
        if (choiceState == 0)
            dialogState = firstChoiceState;
        else
            dialogState = secondChoiceState;

        heart.visible = false;
        choice1.setText('');
        choice2.setText('');
        lockSpace(0.3);
    }
    else if (choiceState == 0 && cursors.right.isDown) {
        choiceState = 1;
        heart.x += 196;
    }
    else if (choiceState == 1 && cursors.left.isDown) {
        choiceState = 0;
        heart.x -= 196;
    }
}

function choiceWaiter4(firstChoiceState, secondChoiceState, thirdChoiceState, fourthChoiceState) {
    if (spaceDown()) {
        if (choiceState == 0)
            dialogState = firstChoiceState;
        else if (choiceState == 1)
            dialogState = secondChoiceState;
        else if (choiceState == 2)
            dialogState = thirdChoiceState;
        else
            dialogState = fourthChoiceState;

        heart.visible = false;
        choice1.setText('');
        choice2.setText('');
        lockSpace(0.3);
    }
    else if (choiceState == 0 && cursors.right.isDown) {
        choiceState = 1;
        heart.x += 196;
    }
    else if (choiceState == 0 && cursors.down.isDown) {
        choiceState = 2;
        heart.y += 58;
    }
    else if (choiceState == 1 && cursors.left.isDown) {
        choiceState = 0;
        heart.x -= 196;
    }
    else if (choiceState == 1 && cursors.down.isDown) {
        choiceState = 3;
        heart.y += 58;
    }
    else if (choiceState == 2 && cursors.right.isDown) {
        choiceState = 3;
        heart.x += 196;
    }
    else if (choiceState == 2 && cursors.up.isDown) {
        choiceState = 0;
        heart.y -= 58;
    }
    else if (choiceState == 3 && cursors.left.isDown) {
        choiceState = 2;
        heart.x -= 196;
    }
    else if (choiceState == 3 && cursors.up.isDown) {
        choiceState = 1;
        heart.y -= 58;
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
