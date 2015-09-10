//var React = require('react');
//var app = require('./app');
//var App = app.App, Ctx = app.Ctx;

//Bootstrap = React.createFactory(Ctx.bootstrap(App));
Bootstrap = React.createFactory(Ctx.bootstrap(App));
//;
Template.game.rendered = function () {
  React.render(
      Bootstrap(),
      document.getElementById('root')
  );
    //React.render(<Dump></Dump>, document.getElementById('root'));
};
