Clock = (function () {
    var timeoutId = null,
        currentGameSpeed = function () {
            return 1000 / BINDING.get('level');
        },
        processTick = function () {
            GAME.moveDown();
        };

    BINDING.addListener('level', function (changes) {
        console.log(changes);
        clearInterval(timeoutId);
        timeoutId = setInterval(processTick, currentGameSpeed());
    });

    return {
        start: function (speedRatio) {
            speedRatio = speedRatio || 1;
            if (!timeoutId) {
                timeoutId = setInterval(processTick, currentGameSpeed() * speedRatio);
            }
            return this;
        },
        pause: function () {
            clearInterval(timeoutId);
            timeoutId = null;
            return this;
        },
        quickTick: function() {
            this.pause().start(0.2);
        }
    }
}());