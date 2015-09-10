// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Games.find().count() === 0) {

  }
});
