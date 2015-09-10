GameFigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};
/**
 *
 * @param {FigureModel}
 * @return {GameFigureModel}
 */
GameFigureModel.createFromFigure = function (figureModel) {
    var matrix = figureModel.getMatrix();

    //TODO

    return new GameFigureModel();
};

_.extend(GameFigureModel.prototype, {
    initialize: function () {

    },
    getMatrix: function () {
        //TODO
        return [[3, 3, 3], [3, 3, 3], [3, 3, 3]];
    }
});


FigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};
_.extend(FigureModel.prototype, {
    initialize: function () {

    },
    getMatrix: function () {

    }
});

GameModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameModel.prototype, {
    initialize: function () {
        this.figures = GameFigures.find({game_id: this._id});

        this._checkItems();
    },
    _checkItems: function () {
        this.currentFigureIndex = this.currentFigureIndex || 0;
        this.stageMatrix = this.stageMatrix || this.defaultMatrix();
        this._checkFigures();

    },
    _checkFigures: function () {
        if (this.currentFigureIndex + 1 >= this.figures.count()) {
            //TODO Add more random figures
            var allFigures = Figures.find().fetch();
            var itemsToGenerate = 10;
            _.each(_.range(0, itemsToGenerate), function () {
                var randomFigure = allFigures[_.random(0, allFigures.length - 1)];
                if (randomFigure) {
                    var newMatrix = _.map(randomFigure.matrix, function (i) {
                        return i > 0 ? Colors[_.random(0, Colors.length - 1)] : "0";
                    }).join("");

                    GameFigures.insert({
                        game_id: this._id,
                        figure_id: randomFigure._id,
                        matrix: newMatrix
                    });
                }
            }.bind(this));
        }
    },
    getMatrix: function () {

    },
    /**
     *
     * @returns {FigureModel}
     */
    getCurrentFigure: function () {
        this._checkFigures();
        return GameFigures.findOne({game_id: this._id}, {skip: this.currentFigureIndex});
    },
    defaultMatrix: function () {
        //TODO
        return "";
    }
});
