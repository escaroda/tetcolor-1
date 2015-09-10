Clock = (function () {
    var timeoutId = null,
        currentGameSpeed = 1000,
        processTick = function () {
            GAME.moveDown();
        };
    return {
        init: function () {
            console.log('init clock');

            this.start();
            return this;
        },
        start: function () {
            if (!timeoutId) {
                timeoutId = setInterval(processTick, currentGameSpeed);
            }
            return this;
        },
        pause: function () {
            clearInterval(timeoutId);
            timeoutId = null;
            return this;
        }
    }
}());