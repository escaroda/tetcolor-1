Meteor.publish('publicGames', function() {
  return Games.find({userId: {$exists: false}});
});

Meteor.publish('privateGames', function() {
  if (this.userId) {
    return Games.find({userId: this.userId});
  } else {
    this.ready();
  }
});