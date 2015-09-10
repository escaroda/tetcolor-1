FigureModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};
_.extend(FigureModel.prototype, {
    initialize: function () {

    },
    getMatrix : function(){

    }
});

GameModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameModel.prototype, {
    initialize: function () {
        this._checkItems();
    },
    _checkItems: function () {
        this.currentFigureIndex = this.currentFigureIndex || 0;
        this.stageMatrix = this.stageMatrix || this.defaultMatrix();
        this.figures = this.figures || [];
        this._checkFigures();

    },
    _checkFigures: function () {
        if (this.figures.length + 1 >= this.currentFigureIndex) {
            //TODO Add more random figures
        }
    },
    getMatrix : function() {

    },
    /**
     *
     * @returns {FigureModel}
     */
    getCurrentFigure: function () {
        this.checkFigures();
        var currentFigureId = this.figures[this.currentFigureIndex];
        return Figures.findOne(currentFigureId);
    },
    defaultMatrix: function () {
        //TODO
        return "";
    }
});
