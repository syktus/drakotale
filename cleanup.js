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

    if(col) {
        col.destroy();
        col = null;
    }

    if(door1) {
        door1.destroy();
        door1 = null;
    }

    if(door2) {
        door2.destroy();
        door2 = null;
    }

    if(drako)
    {
        drako.destroy();
        drako = null;
    }

    if(border) {
        border.destroy();
        border = null;
    }

    if(text) {
        text.destroy();
        text = null;
    }

    if(avatar) {
        avatar.destroy();
        avatar = null;
    }

    if (choice1) {
        choice1.destroy();
        choice1 = null;
    }

    if (choice2) {
        choice1.destroy();
        choice1 = null;
    }

    if (heart) {
        heart.destroy();
        heart = null;
    }
}
