// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Clock = (function () {
    var timeoutId = null,
        processTick = function () {

        };
    return {
        start: function () {

        },
        pause: function () {

        }
    }
}());

Template.game.onRendered(function () {
    if (firstRender) {

        window.GAME = this;

        Bootstrap = React.createFactory(Ctx.bootstrap(App));
        React.render(
            Bootstrap(),
            document.getElementById('root')
        );

        // Released in app-body.js
        listFadeInHold = LaunchScreen.hold();

        // Handle for launch screen defined in app-body.js
        listRenderHold.release();

        firstRender = false;
    }

    var el = this.find('.figure'),
        elPos = [0, 0],
        blockSize = 30,

        handleRight = function () {
            BINDING.set("figure.x", BINDING.get("figure.x") - 0 + 1);
            elPos[0] += 1;
        },
        handleLeft = function () {
            BINDING.set("figure.x", BINDING.get("figure.x") - 1);
            elPos[0] -= 1;
        },
        handleDown = function () {
            BINDING.set("figure.y", BINDING.get("figure.y") + 1);
            elPos[1] += 1;
        };

    $('body').on('keydown', function (event) {
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
            handleDown();
            break;
        case 32:
            console.log('spacebar');
        }

        el.style.transform = "translate(" + blockSize * elPos[0] + "px, " + blockSize * elPos[1] + "px)"
    });
});

Template.game.helpers({

});


Template.game.events({
    'body keypress': function (e) {
        console.log('key', e);
    }
});