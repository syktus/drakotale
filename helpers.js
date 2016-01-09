function makeRectangle(x, y, a, b, group) {
    var obj = game.add.bitmapData(a, b);

    obj.ctx.rect(0, 0, a, b);
    obj.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    obj.ctx.fill();

    obj_sprite = game.add.sprite(x, y, obj, 0, group);
    obj_sprite.body.immovable = true;
}
