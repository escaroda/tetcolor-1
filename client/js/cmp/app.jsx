Ctx = Morearty.createContext({
    initialState: {
        gamePhase: PHASE.NOT_STARTED,
        level: 1,
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
                    <Stage binding={binding.sub("stage")} />
                    <GameFigure binding={binding.sub("figure")}/>
                </div>
                <div className="info-field">
                    <Score binding={binding.sub("score")}/>
                    <Controls />
                </div>
            </div>
        );
    }
});


GameFigure = React.createClass({
    displayName: 'gameFigure',
    mixins: [Morearty.Mixin],
    render: function () {
        var binding = this.getDefaultBinding(),
            figure = MatrixHelper.rotateMatrix(GAME.getCurrentFigureMatrix(), binding.get("rotation"));
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
                <div className={"block p2_2 c" + figure[2][2]}></div>
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
            <h2 className="score">
                Your score: <span className="number">{binding.get()}</span>
            </h2>
        );
    }
});

Controls = React.createClass({
    displayName: 'Controls',
    mixins: [Morearty.Mixin],

    render: function () {
        return (
            <div className="controls">
                <button onClick={()=>Clock.start()} className="start">Start</button>
                <button onClick={()=>Clock.pause()} className="pause">Stop tick</button>
            </div>
        );
    }
});



Stage = React.createClass({
    displayName: 'Stage',
    mixins: [Morearty.Mixin],
    render: function () {
        var matrix = this.getDefaultBinding().toJS(),
            acc = [];
        _.flatten(matrix).forEach(function (item, index) {
                var posCls = "p" + index % 9 + "_" + Math.floor(index / 9);
                acc.push(React.createElement("div", {className: posCls + " block c" + item, key: posCls}));
        });
        return React.createElement.apply(React, ["div", {className: "stage"}].concat(acc));
    }
});