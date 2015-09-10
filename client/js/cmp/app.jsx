Ctx = Morearty.createContext({
  initialState: {
    phase: PHASE.NOT_STARTED,
    score: 0,
    stage: {},
    figure: {
      position: [0,4]
    }
  }
});

App = React.createClass({
  displayName: 'App',

  mixins: [Morearty.Mixin],

  componentDidMount: function () {
    var binding = this.getDefaultBinding();
    //binding.set('nowShowing', NOW_SHOWING.COMPLETED);
  },

  render: function () {
    var binding = this.getDefaultBinding();
    return (
        <div className="test">
          <Score binding={binding} />
        </div>
    );
  }
});


Score = React.createClass({
  displayName: 'Score',

  mixins: [Morearty.Mixin],

  render: function () {
    var binding = this.getDefaultBinding();
    return (
        <div className="score">
          {binding.get("score")}
        </div>
    );
  }
});

Figure = React.createClass({
  displayName: 'Figure',
  render: function () {
    var binding = this.getDefaultBinding();
    return (
        <div className="element-matrix">
          {binding.get("score")}
        </div>
    );
  }
});

Score = React.createClass({
  displayName: 'Score',

  mixins: [Morearty.Mixin],

  render: function () {
    var binding = this.getDefaultBinding();
    return (
        <div className="score">
          {binding.get("score")}
        </div>
    );
  }
});
