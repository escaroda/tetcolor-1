Meteor.publish('publicGames', function () {
    return Games.find({userId: {$exists: false}});
});

Meteor.publish('privateGames', function () {
    if (this.userId) {
        return Games.find({userId: this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish("games", function () {
    return Games.find({});
});
Meteor.publish("figures", function () {
    return Figures.find({});
});

Meteor.publish("gameFigures", function () {
    //TODO filter by permission
    return GameFigures.find({});
});