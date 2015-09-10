Clock = (function () {
    var timeoutId = null,
        currentGameSpeed = function () {
            return 1000 / BINDING.get('level');
        },
        processTick = function () {
            GAME.moveDown();
        };
    return {
        start: function () {
            if (!timeoutId) {
                timeoutId = setInterval(processTick, currentGameSpeed());
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