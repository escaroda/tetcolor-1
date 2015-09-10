// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;


Template.game.onRendered(function () {
    if (firstRender) {
        // Released in app-body.js
        listFadeInHold = LaunchScreen.hold();

        // Handle for launch screen defined in app-body.js
        listRenderHold.release();

        firstRender = false;
    }
    var el = this.find('.element-matrix'),
        blockSize = 30,

        handleRight = function () {
            el.style.transform = "translate(" + blockSize + "px)"
        },
        handleLeft = function () {
            el.style.transform = "translate(-" + blockSize + "px)"
        };

    $('body').on('keydown', function (e) {
        if (event.which == 13) {
            event.preventDefault();
        }
        console.log('keydown', event.which);
        switch (event.which) {
        case 39:
            console.log('right');
            handleRight();
            break;
        case 37:
            console.log('left');
            handleLeft();
            break;
        case 38:
            console.log('up');
            break;
        case 40:
            console.log('down');
            break;
        case 32:
            console.log('spacebar');
        }
    });
});

Template.game.helpers({
    //heleprs
});


Template.game.events({
    'body keypress': function (e) {
        console.log('key', e);
    }
});