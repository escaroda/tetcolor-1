Ctx = Morearty.createContext({
  initialState: {
    gamePhase: PHASE.NOT_STARTED,
    score: 0,
    stage: {},
    figure: {
      index: null,
      x: 4,
      y: 0,
      figure_id: null,
      rotation: 0 // 0...3
    }
  }
});
BINDING = Ctx.getBinding();

App = React.createClass({
  displayName: 'App',
  mixins: [Morearty.Mixin],

  componentDidMount: function () {
    var binding = this.getDefaultBinding();
    Morearty.History.init(binding);
    //binding.set('nowShowing', NOW_SHOWING.COMPLETED);
  },


  render: function () {
    var binding = this.getDefaultBinding();
    return (
        <div>
          <div className="game-field">
            <Stage />
            <GameFigure binding={binding.sub("figure")} />
          </div>
          <Score binding={binding.sub("score")} />
        </div>
    );
  }
});


GameFigure = React.createClass({
  displayName: 'gameFigure',
  mixins: [Morearty.Mixin],
  render: function () {
    var binding = this.getDefaultBinding(),
        figure = GAME.getCurrentFigureMatrix();
    return (
        <div className={"figure p" + binding.get("x") + "_" + binding.get("y")}>
          <div className={"block p0_0 c" + figure[0][0]}></div>
          <div className={"block p1_0 c" + figure[0][1]}></div>
          <div className={"block p2_0 c" + figure[0][2]}></div>
          <div className={"block p0_1 c" + figure[1][0]}></div>
          <div className={"block p1_1 c" + figure[1][1]}></div>
          <div className={"block p2_1 c" + figure[1][2]}></div>
          <div className={"block p0_2 c" + figure[2][0]}></div>
          <div className={"block p1_2 c" + figure[2][1]}></div>
          <div className={"block p2_2 c" + figure[2][3]}></div>
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
          {binding.get()}
        </div>
    );
  }
});

Stage = React.createClass({
  displayName: 'Stage',
  mixins: [Morearty.Mixin],
  render: function () {
    return (
        <div className="stage">
          <div className="p0_18 block c-1"></div>
          <div className="p1_18 block c-1"></div>
          <div className="p2_18 block c-1"></div>
          <div className="p3_18 block c-1"></div>
          <div className="p4_18 block c-1"></div>
          <div className="p5_18 block c-1"></div>
          <div className="p6_18 block c-1"></div>
          <div className="p7_18 block c-1"></div>
          <div className="p8_18 block c-1"></div>
          <div className="p9_18 block c-1"></div>
          <div className="p0_0 block c-1"></div>
          <div className="p0_1 block c-1"></div>
          <div className="p0_2 block c-1"></div>
          <div className="p0_3 block c-1"></div>
          <div className="p0_4 block c-1"></div>
          <div className="p0_5 block c-1"></div>
          <div className="p0_6 block c-1"></div>
          <div className="p0_7 block c-1"></div>
          <div className="p0_8 block c-1"></div>
          <div className="p0_9 block c-1"></div>
          <div className="p0_10 block c-1"></div>
          <div className="p0_11 block c-1"></div>
          <div className="p0_12 block c-1"></div>
          <div className="p0_13 block c-1"></div>
          <div className="p0_14 block c-1"></div>
          <div className="p0_15 block c-1"></div>
          <div className="p0_16 block c-1"></div>
          <div className="p0_17 block c-1"></div>
          <div className="p0_18 block c-1"></div>
          <div className="p9_0 block c-1"></div>
          <div className="p9_1 block c-1"></div>
          <div className="p9_2 block c-1"></div>
          <div className="p9_3 block c-1"></div>
          <div className="p9_4 block c-1"></div>
          <div className="p9_5 block c-1"></div>
          <div className="p9_6 block c-1"></div>
          <div className="p9_7 block c-1"></div>
          <div className="p9_8 block c-1"></div>
          <div className="p9_9 block c-1"></div>
          <div className="p9_10 block c-1"></div>
          <div className="p9_11 block c-1"></div>
          <div className="p9_12 block c-1"></div>
          <div className="p9_13 block c-1"></div>
          <div className="p9_14 block c-1"></div>
          <div className="p9_15 block c-1"></div>
          <div className="p9_16 block c-1"></div>
          <div className="p9_17 block c-1"></div>
          <div className="p9_18 block c-1"></div>
        </div>
    );
  }
});