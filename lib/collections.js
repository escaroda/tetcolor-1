Games = new Mongo.Collection("games", {
    transform: function (doc) {
        return new GameModel(doc);
    }
});

Games.defaultName = function () {
    return "Game " + moment().format("YYYY-MM-DD_hh:mm:ss");
};

Figures = new Mongo.Collection("figures",{
    transform : function(doc) {
        return new FigureModel(doc);
    }
});