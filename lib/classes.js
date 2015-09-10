var getMatrix = function () {
    var w = this.matrixWidth,
        h = this.matrixHeight,
        matrix = this.matrix.split("");

    return _.map(_.range(0, h), function (i) {
        return _.map(matrix.splice(0, w), function (j) {
            return j === "#" ? -1 : parseInt(j);
        }.bind(this));
    }.bind(this));
};
var debugMatrix = function () {
    return _.map(this.getMatrix(), function (row) {
        return row.join("").replace(/-1/g, "#");
    }).join("\r\n");
}

GameFigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameFigureModel.prototype, {
    initialize: function () {
        this.rotation = this.rotation || 0;
        this.x = this.x || 0;
        this.y = this.y || 0;
    },
    getMatrix: getMatrix,
    debugMatrix: debugMatrix,
    setPosition: function () {

    }
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

    },
    _getFigures: function () {
        return this.figures || (this.figures = GameFigures.find({game_id: this._id}));
    },
    _currentFigureIndex: function () {
        return BINDING.get("figure.index") || 0;
    },
    _checkItems: function () {
        this._checkFigures();

    },
    _checkFigures: function () {
        if (this._currentFigureIndex() + 1 >= this._getFigures().count()) {
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
        this.matrix = this.matrix || this._defaultMatrix();
        return getMatrix.call(this);
    },
    debugMatrix: debugMatrix,
    /**
     *
     * @returns {FigureModel}
     */
    getCurrentFigure: function () {
        this._checkFigures();
        return GameFigures.findOne({game_id: this._id}, {skip: this._currentFigureIndex()});
    },
    getCurrentFigureMatrix: function () {
        return this.getCurrentFigure().getMatrix();
    },
    _mutateFigure: function (obj) {
        var atom = BINDING.sub("figure").atomically();
        _.each(obj, function (v, k) {
            atom.set(k, v);
        });
        atom.commit();
    },
    startGame: function () {
        this._mutateFigure({
            x: Math.floor(this.matrixWidth / 2),
            y: 0,
            rotation: 0,
            index: 0
        });
    },
    takeFigure: function () {

    },
    rotateFigure: function () {

    },
    moveLeft: function () {

    },
    moveRight: function () {

    },
    moveDown: function () {
    },
    moveDrop: function () {

    },


    _defaultMatrix: function () {
        return _.map(_.range(0, this.matrixHeight), function (row) {
            return _.map(_.range(0, this.matrixWidth), function (col) {
                return row === this.matrixHeight - 1 || col === 0 || col === this.matrixWidth - 1 ? "#" : "0";
            }.bind(this)).join("");
        }.bind(this)).join("");
    }
});
