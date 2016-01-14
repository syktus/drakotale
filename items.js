var ITEM_NONE = 0;
var ITEM_PARROT = 1;
var ITEM_NOKIA = 2;

var itemSprites = ['', 'parrot_carry', 'nokia_carry'];

var takenItem = ITEM_NONE;

function takeItem(item) {
    drako.addChild(game.add.sprite(-7, -36, itemSprites[item]));
    takenItem = item;
}

function showCarryItem() {
    if (takenItem != ITEM_NONE) drako.addChild(game.add.sprite(-7, -36, itemSprites[takenItem]));
}

function dropItem() {
    takenItem = ITEM_NONE;
    drako.removeChildren();
}
