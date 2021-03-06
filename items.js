var ITEM_NONE = 0;
var ITEM_PARROT = 1;
var ITEM_NOKIA = 2;
var ITEM_KAPCIE = 3;
var ITEM_CLOTH_DIRTY = 4;
var ITEM_CLOTH_CLEAN = 5;
var ITEM_CAKE1 = 6;
var ITEM_CAKE2 = 7;
var ITEM_CAKE3 = 8;

var itemSprites = ['', 'parrot_carry', 'nokia_carry', 'kapcie_carry', 'cloth_dirty_carry', 'cloth_carry', 'cake1_carry', 'cake2_carry', 'cake3_carry'];

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
