var painting_trigger;

var level1_text_content1 = 'NAPIS POD OBRAZEM:\n\nLooo0o0o000v11000ve';

var level1 = {
    preload: function() {
        game.load.image('bg_level1', 'assets/levels/level1.png');
        game.load.image('bg_level2', 'assets/levels/level2.png');
        game.load.image('bg_level3', 'assets/levels/level3.png');
        game.load.image('bg_level4', 'assets/levels/level4.png');
        game.load.image('bg_level5a', 'assets/levels/level5a.png');
        game.load.image('bg_level5b', 'assets/levels/level5b.png');
        game.load.image('bg_level5c', 'assets/levels/level5c.png');
        game.load.image('bg_level6', 'assets/levels/level6.png');
        game.load.image('bg_level7', 'assets/levels/level7.png');
        game.load.image('bg_level8a', 'assets/levels/level8a.png');
        game.load.image('bg_level8b', 'assets/levels/level8b.png');
        game.load.image('bg_level9', 'assets/levels/level9.png');
        game.load.image('bg_level10', 'assets/levels/level10.png');
        game.load.image('bg_level11', 'assets/levels/level11.png');
        game.load.image('bg_level12a', 'assets/levels/level12a.png');
        game.load.image('bg_level12b', 'assets/levels/level12b.png');

        /* LEVEL 2 */

        game.load.image('pin1', 'assets/characters/pin1.png');
        game.load.image('pin2', 'assets/characters/pin2.png');
        game.load.image('pin3', 'assets/characters/pin3.png');
        game.load.image('pin4', 'assets/characters/pin4.png');
        game.load.image('mlody_suszy', 'assets/characters/mlody_suszy.png');

        /* LEVEL 3 */

        game.load.image('parrot', 'assets/items/item1.png');
        game.load.image('parrot_carry', 'assets/items/item1_carry.png');

        /* LEVEL 4 */

        game.load.spritesheet('mlody', 'assets/characters/mlody_sprite.png', 46, 65);
        game.load.spritesheet('mlody_head', 'assets/characters/mlody_sprite_head.png', 46, 35);

        game.load.image('av_mlody_sad', 'assets/avatars/av_mlody_sad.png');
        game.load.image('av_mlody_happy', 'assets/avatars/av_mlody_happy.png');

        /* LEVEL 5 */

        game.load.image('nikus', 'assets/characters/kamienikus.png');
        game.load.image('av_nikus', 'assets/avatars/av_nikus.png');

        /* LEVEL 6 */

        game.load.spritesheet('misza', 'assets/characters/misza_sprite.png', 51, 96);
        game.load.spritesheet('misza_gora', 'assets/characters/misza_sprite_gora.png', 51, 56);

        game.load.image('av_misza_sad', 'assets/avatars/av_misza_sad.png');
        game.load.image('av_misza_happy', 'assets/avatars/av_misza_happy.png');

        game.load.image('domek', 'assets/level_doodads/domek.png');
        game.load.image('cage', 'assets/level_doodads/cage.png');

        /* LEVEL 7 */

        game.load.image('ryok_happy', 'assets/characters/ryok_happy.png');
        game.load.image('ryok_sad', 'assets/characters/ryok_sad.png');

        game.load.image('av_ryok_sad', 'assets/avatars/av_ryok_sad.png');
        game.load.image('av_ryok_happy', 'assets/avatars/av_ryok_happy.png');

        /* LEVEL 8 */

        game.load.image('nokia', 'assets/items/item2.png');
        game.load.image('nokia_carry', 'assets/items/item2_carry.png');

        /* LEVEL 9 */

        game.load.image('kapcie', 'assets/items/item3.png');
        game.load.image('kapcie_carry', 'assets/items/item3_carry.png');

        game.load.image('av_miya_sad', 'assets/avatars/av_miya_sad.png');
        game.load.image('av_miya_happy', 'assets/avatars/av_miya_happy.png');

        game.load.spritesheet('miya', 'assets/characters/miya_sprite.png', 37, 70);
        game.load.spritesheet('bunny', 'assets/level_doodads/bunny.png', 50, 53);

        /* LEVEL 10 */

        game.load.spritesheet('kuma', 'assets/characters/kuma_sprite.png', 50, 104);

        game.load.image('av_kuma_sad', 'assets/avatars/av_kuma_sad.png');
        game.load.image('av_kuma_happy', 'assets/avatars/av_kuma_happy.png');

        game.load.image('cloth_dirty_carry', 'assets/items/item4a_carry.png');
        game.load.image('cloth_carry', 'assets/items/item4b_carry.png');

        /* LEVEL 11 */

        game.load.image('cake1', 'assets/items/item5.png');
        game.load.image('cake1_carry', 'assets/items/item5_carry.png');
        game.load.image('cake2', 'assets/items/item6.png');
        game.load.image('cake2_carry', 'assets/items/item6_carry.png');
        game.load.image('cake3', 'assets/items/item7.png');
        game.load.image('cake3_carry', 'assets/items/item7_carry.png');

        game.load.image('av_wilk_sad', 'assets/avatars/av_wilk_sad.png');
        game.load.image('av_wilk_happy', 'assets/avatars/av_wilk_happy.png');

        game.load.spritesheet('wilk', 'assets/characters/wilk_sprite.png', 83, 110);

        game.load.image('death1', 'assets/level_doodads/death1.png');
        game.load.image('death2', 'assets/level_doodads/death2.png');

        /* LEVEL 12 */

        game.load.image('av_tk_sad', 'assets/avatars/av_tk_sad.png');
        game.load.image('av_tk_happy', 'assets/avatars/av_tk_happy.png');

        /* SOUNDS */

        game.load.audio('nip', 'assets/sounds/talk_pin.ogg');
        game.load.audio('nip_slow', 'assets/sounds/talk_pin2.ogg');
        game.load.audio('mlody', 'assets/sounds/talk_mlo.ogg');
        game.load.audio('nikus', 'assets/sounds/talk_nik.ogg');
        game.load.audio('misza', 'assets/sounds/talk_misza.ogg');
        game.load.audio('ryok', 'assets/sounds/talk_ryok.ogg');
        game.load.audio('miya', 'assets/sounds/talk_miya.ogg');
        game.load.audio('kuma', 'assets/sounds/talk_kuma.ogg');
        game.load.audio('wilk', 'assets/sounds/talk_wilk.ogg');
        game.load.audio('tk', 'assets/sounds/talk_tk.ogg');

        /* COMMON */

        game.load.image('heart', 'assets/misc/heart.png');
        game.load.image('ramka', 'assets/misc/ramka.png');
        game.load.spritesheet('drako', 'assets/characters/drako.png', 36, 60);

        game.load.bitmapFont('determination_font', 'assets/fonts/determination_sans_0.png', 'assets/fonts/determination_sans.xml');
        game.load.bitmapFont('times_new_misza', 'assets/fonts/times_new_misza_0.png', 'assets/fonts/times_new_misza.xml');

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

        door1 = createTrigger(244, 0, 96, 5);

        painting_trigger = createTrigger(20, 120, 100, 50);

        if(nextDrakoX && nextDrakoY)
            createDrako(nextDrakoX, nextDrakoY);
        else
            createDrako(280, 220);

        dialogState = -1;

        setLoadBlock();
    },

    update: function() {
        if(loadBlock) return;

        if(dialogState >= 0 && dialogState <= 1) {
            stopDrako();
            level1.paintingCutscene();
        }
        else {
            game.physics.arcade.collide(drako, col);
            game.physics.arcade.collide(drako, door1, doorGenerator(302, 400, 'level2'));

            if (spaceDown() && game.physics.arcade.overlap(drako, painting_trigger))
                level1.paintingDialogInit();

            moveDrako();
        }
    },

    shutdown: function() {
        genericCleanup();

        if (painting_trigger) {
            painting_trigger.destroy();
            painting_trigger = null;
        }
    },

    paintingDialogInit: function() {
        dialogState = 0;
        border = game.add.sprite(31, 318, 'ramka');
        text = game.add.bitmapText(62, 348, 'determination_font', '', 29);
        displayText(text, function() { dialogState = 1 });
        lockSpace(0.3);
    },

    paintingCutscene: function() {
        if (dialogState == 0)
            renderText(text, level1_text_content1);
        else if (dialogState == 1)
            textFinishWaiter();
    }
};

