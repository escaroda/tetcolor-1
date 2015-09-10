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

    Clock.init();

    $('body').on('keydown', function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        switch (event.which) {
        case 39:
            console.log('right');
            GAME.moveRight();
            break;
        case 37:
            console.log('left');
            GAME.moveLeft();
            break;
        case 38:
            console.log('up');
            break;
        case 40:
            console.log('down');
            GAME.moveDown();
            break;
        case 32:
            console.log('spacebar');
        }
    });
});

Template.game.helpers({

});


Template.game.events({
    'body keypress': function (e) {
        console.log('key', e);
    }
});