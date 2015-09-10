var getMatrix = function () {
    var w = this.matrixWidth,
        h = this.matrixHeight,
        matrix = this.matrix.split("");

    return _.map(_.range(0, h), function (i) {
        return _.map(matrix.splice(0, w), function (j) {
            return j==="#" ? -1 : parseInt(j);
        }.bind(this));
    }.bind(this));
}

GameFigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameFigureModel.prototype, {
    initialize: function () {


    },
    getMatrix: getMatrix
});


FigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};
_.extend(FigureModel.prototype, {
    initialize: function () {

    }
});

GameModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameModel.prototype, {
    initialize: function () {
        this.matrixWidth = 9;
        this.matrixHeight = 19;
        this.figures = GameFigures.find({game_id: this._id});

        this._checkItems();
    },
    _checkItems: function () {
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
                        matrix: newMatrix,
                        matrixWidth: randomFigure.matrixWidth,
                        matrixHeight: randomFigure.matrixHeight
                    });
                }
            }.bind(this));
        }
    },
    getMatrix: function () {
        this.matrix = this.matrix || this.defaultMatrix();
        return getMatrix.call(this);
    },
    /**
     *
     * @returns {FigureModel}
     */
    getCurrentFigure: function () {
        this.currentFigureIndex = this.currentFigureIndex || 0;
        this._checkFigures();
        return GameFigures.findOne({game_id: this._id}, {skip: this.currentFigureIndex});
    },
    defaultMatrix: function () {
        return _.map(_.range(0, this.matrixHeight), function (row) {
            return _.map(_.range(0, this.matrixWidth), function (col) {
                return row === this.matrixHeight - 1 || col === 0 || col === this.matrixWidth - 1 ? "#" : "0";
            }.bind(this)).join("");
        }.bind(this)).join("");
    }
});
