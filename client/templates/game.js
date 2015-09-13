// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Template.game.onRendered(function () {
    if (firstRender) {

        window.GAME = this.data;

        Bootstrap = React.createFactory(Ctx.bootstrap(App));

        React.render(
            Bootstrap(),
            document.getElementById('root')
        );

        GAME.startGame();

        // Released in app-body.js
        listFadeInHold = LaunchScreen.hold();

        // Handle for launch screen defined in app-body.js
        listRenderHold.release();

        firstRender = false;
    }

    $('body').on('keydown', function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        switch (event.which) {
        case 39:
            GAME.moveRight();
            break;
        case 37:
            GAME.moveLeft();
            break;
        case 38:
            GAME.rotateFigure();
            break;
        case 40:
            GAME.moveDown();
            break;
        case 32:
            GAME.moveDrop();
            break;
        }
    });

    $(this.find(".game-field")).touchwipe({
        wipeDown: function () {
            GAME.rotateFigure();
        },
        wipeUp: function () {
            GAME.moveDown();
        },
        wipeLeft: function () {
            GAME.moveLeft();
        },
        wipeRight: function () {
            GAME.moveRight();
        },
        preventDefaultEvents: false
    }).click(function(){
        GAME.moveDrop();
    });
});

Template.game.helpers({});

Template.game.events({});