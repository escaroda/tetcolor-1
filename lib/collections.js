Games = new Mongo.Collection("games");

Games.defaultName = function () {
    return "Game " + moment().format("YYYY-MM-DD_hh:mm:ss");
};
