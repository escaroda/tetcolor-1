Games = new Mongo.Collection('games');

// Calculate a default name for a list in the form of 'List A'
Games.defaultName = function () {
    return "Game " + moment().format("YYYY-MM-DD_hh:mm:ss");
};
