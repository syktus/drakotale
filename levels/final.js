var finalSlide;
var slide, slide2, tween;

var final = {
    preload: function () {
        if (debugMode) {
            for (var i = 1; i <= 66; i++) {
                game.load.image('final' + i, 'assets/final/final' + i + '.png');
            }

            loadTransitionPlugin();
        }
    },

    create: function () {
        finalSlide = 1;
        slide = game.add.sprite(0, 0, 'final1');
        slide2 = game.add.sprite(0, 0, 'final2');
        slide2.alpha = 0;
    },

    update: function () {
        if(spaceDown() && finalSlide <= 65) {
            lockSpace(0.5);
            tween = game.add.tween(slide2).to({alpha: 1}, 2000, "Linear", true);
            tween.onComplete.add(function() {
                tween.onComplete.removeAll();
                finalSlide++;
                slide.loadTexture('final' + finalSlide);
                slide2.alpha = 0;
                if (finalSlide <= 65) slide2.loadTexture('final' + (finalSlide+1));
            });
        }
    },

    shutdown: function () {
        if(slide) {
            slide.destroy();
            slide = null;
        }

        if(slide2) {
            slide2.destroy();
            slide2 = null;
        }
    }
};
