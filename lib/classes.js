MatrixHelper = {
    rotateMatrix: function (array, rotation) {
        rotation = rotation % 4;
        if (rotation === 0) {
            return array;
        } else if (rotation === 1) {
            return this.rotateMatrixOnce(array);
        } else if (rotation === 2) {
            return this.rotateMatrixOnce(this.rotateMatrixOnce(array));
        } else if (rotation === 3) {
            return this.rotateMatrixOnce(this.rotateMatrixOnce(this.rotateMatrixOnce(array)));
        }
    },
    rotateMatrixOnce: function (array) {
        var transpose = function (arr) {
                return arr[0].map(function (col, i) {
                    return arr.map(function (row) {
                        return row[i]
                    })
                });
            },
            reverse = function (arr) {
                var resultArr = [];
                arr.forEach(function (entry) {
                    resultArr.push(entry.reverse());
                });
                return resultArr;
            };

        var arr2 = transpose(array);
        return reverse(arr2);
    },
    checkConflicts: function (matrixX, matrixY, matrix, container) {
        return _.any(matrix, function (matrixRow, y) {
            return _.any(matrixRow, function (matrixCell, x) {
                var containerCell = container[matrixY + y][matrixX + x];
                return containerCell !== 0 && matrixCell !== 0;
            });
        });
    },
    mergeMatrix: function (matrixX, matrixY, matrix, targetContainer) {
        _.each(matrix, function (matrixRow, y) {
            _.each(matrixRow, function (matrixCell, x) {
                if (matrixCell > 0) {
                    targetContainer[matrixY + y][matrixX + x] = matrixCell;
                }
            });
        });
        return targetContainer;
    }
};
var getMatrix = function () {
    var w = this.matrixWidth,
        h = this.matrixHeight,
        matrix = this.matrix.split("");

    return _.map(_.range(0, h), function (i) {
        return _.map(matrix.splice(0, w), function (j) {
            return j === "#" ? -1 : parseInt(j);
        }.bind(this));
    }.bind(this));
};

FigureModel = function (doc) {
    _.extend(this, doc);

};
_.extend(FigureModel.prototype, {
    getMatrix: getMatrix
});

GameModel = function (doc) {
    _.extend(this, doc);
    this.initialize();
};

_.extend(GameModel.prototype, {
    initialize: function () {
        this.matrixWidth = 9;
        this.matrixHeight = 19;

    },
    _getFigures: function () {
        return GameFigures.find({game_id: this._id});
    },
    _currentFigureIndex: function () {
        return BINDING.get("figure.index") || 0;
    },
    _currentFigureX: function () {
        return BINDING.get("figure.x") || 0;
    },
    _currentFigureY: function () {
        return BINDING.get("figure.y") || 0;
    },
    _currentFigureRotation: function () {
        return BINDING.get("figure.rotation") || 0;
    },
    _checkFigures: function () {

        if (this._currentFigureIndex() + 2 >= this._getFigures().count()) {
            //TODO Add more random figures
            var allFigures = Figures.find().fetch();
            var itemsToGenerate = 10;
            _.each(_.range(0, itemsToGenerate), function () {
                var randomFigure = allFigures[_.random(0, allFigures.length - 1)];
                if (randomFigure) {
                    var newMatrix = _.map(randomFigure.matrix, function (i) {
                        return i > 0 ? Colors[_.random(0, Colors.length - 1)] : "0";
                    }).join("");

                    GameFigures.insert({
                        game_id: this._id,
                        figure_id: randomFigure._id,
                        matrix: newMatrix,
                        matrixWidth: randomFigure.matrixWidth,
                        matrixHeight: randomFigure.matrixHeight
                    });
                }
            }.bind(this));
        }
    },
    setMatrix: function (matrix) {
        this.matrix = _.map(matrix, function (matrixRow, y) {
            return _.map(matrixRow, function (matrixCell, x) {
                return matrixCell == -1 ? "#" : matrixCell;
            }).join("");
        }).join("");
    },
    getMatrix: function () {
        this.matrix = this.matrix || this._defaultMatrix();
        return getMatrix.call(this);
    },
    /**
     *
     * @returns {FigureModel}
     */
    getCurrentFigure: function () {
        this._checkFigures();
        return GameFigures.findOne({game_id: this._id}, {skip: this._currentFigureIndex()});
    },
    getNextFigure: function () {
        this._checkFigures();
        return GameFigures.findOne({game_id: this._id}, {skip: this._currentFigureIndex() + 1});
    },
    getNextFigureMatrix: function () {
        return this.getNextFigure().getMatrix();
    },
    getCurrentFigureMatrix: function () {
        return this.getCurrentFigure().getMatrix();
    },
    _mutateFigure: function (obj) {
        var atom = BINDING.sub("figure").atomically();
        _.each(obj, function (v, k) {
            atom.set(k, v);
        });
        atom.commit();
    },
    startGame: function () {
        BINDING.set("stage", this.getMatrix());
        this.takeFigure();
    },
    takeFigure: function () {
        var update = {
                x: Math.floor((this.matrixWidth - 1.5) / 2),
                y: 0,
                rotation: 0,
                index: this._currentFigureIndex() + 1
            },
            hasConflicts = MatrixHelper.checkConflicts(
                update.x,
                update.y,
                MatrixHelper.rotateMatrix(this.getCurrentFigureMatrix(), update.rotation),
                this.getMatrix()
            );

        if (!hasConflicts) {
            this._mutateFigure(update);
        } else {
            Clock.pause();
            console.log("GAME END");
        }
    },
    _transformCurrentFigureMatrix: function (deltaX, deltaY, deltaR, skipMutation) {
        var newX = this._currentFigureX() + deltaX,
            newY = this._currentFigureY() + deltaY,
            newRotation = (this._currentFigureRotation() + deltaR + 4) % 4,
            rotatedMatrix = MatrixHelper.rotateMatrix(this.getCurrentFigureMatrix(), newRotation),
            hasConflicts = MatrixHelper.checkConflicts(
                newX,
                newY,
                rotatedMatrix,
                this.getMatrix()
            );
        if (!hasConflicts) {
            var update = {};
            if (deltaX === -1 || deltaX >= 0) {
                update.x = newX;
            }
            if (deltaY === -1 || deltaY >= 0) {
                update.y = newY;
            }
            if (deltaR === -1 || deltaR >= 1) {
                update.rotation = newRotation;
            }
            if (!skipMutation) {
                this._mutateFigure(update);
            }
            return update;
        }
    },
    rotateFigure: function () {
        this._transformCurrentFigureMatrix(0, 0, 1);
    },
    moveLeft: function () {
        this._transformCurrentFigureMatrix(-1, 0, 0);
    },
    moveRight: function () {
        this._transformCurrentFigureMatrix(1, 0, 0);
    },
    moveDown: function () {
        var hasConflicts = !this._transformCurrentFigureMatrix(0, 1, 0);
        if (hasConflicts) {
            Clock.quickTick();
            this._mergeMatrix();
            this.takeFigure();
        }
    },
    moveDrop: function () {
        var steps = 0, lastPos, res;
        while (res = this._transformCurrentFigureMatrix(0, ++steps, 0, true)) {
            lastPos = res;
        }
        this._mutateFigure(lastPos);
    },
    _mergeMatrix: function () {
        var mergedMatrix = MatrixHelper.mergeMatrix(
            this._currentFigureX(),
            this._currentFigureY(),
            MatrixHelper.rotateMatrix(this.getCurrentFigureMatrix(), this._currentFigureRotation()),
            this.getMatrix()
        );
        this.setMatrix(mergedMatrix);
        BINDING.set("stage", this.getMatrix());
    },
    burnSticks: function (sticks) {
        var matrix = this.getMatrix();
        sticks.forEach(function (stick) {
            stick.position.forEach(function (pos) {
                var revertedCoords = pos.split("-"),
                    coords = {
                        x: 18 - revertedCoords[0],
                        y: revertedCoords[1]
                    };
                matrix[coords.x][coords.y] = 0;
            });
        });
        this.setMatrix(matrix);
    },
    shiftSticks: function (sticks) {
        var matrix = this.getMatrix();
        sticks.forEach(function (stick) {
            stick.position.forEach(function (pos) {
                var revertedCoords = pos.split("-"),
                    coords = {
                        x: 18 - revertedCoords[0],
                        y: revertedCoords[1]
                    };
                while (coords.x) {
                    matrix[coords.x][coords.y] = matrix[coords.x - 1][coords.y];
                    coords.x--;
                }
            });
        });
        this.setMatrix(matrix);
    },
    reduceStage: function reduceStage() {
        // clone and reverse
        var sticks = [],
            checkTop = function (rowIndex, cellIndex) {
                var length = 0,
                    stickPosition = [],
                    cellColor = matrix[rowIndex][cellIndex];
                if (!cellColor) {
                    return;
                }
                while (matrix[rowIndex] && (matrix[rowIndex][cellIndex] === cellColor)) {
                    stickPosition.push(rowIndex + "-" + cellIndex);
                    rowIndex++;
                    length++;
                }
                if (length >= 3) {
                    sticks.push({position: stickPosition, length: length});
                }
            },
            checkRight = function (rowIndex, cellIndex) {
                var length = 0,
                    stickPosition = [],
                    cellColor = matrix[rowIndex][cellIndex];
                if (!cellColor) {
                    return;
                }
                while (matrix[rowIndex][cellIndex] === cellColor) {
                    stickPosition.push(rowIndex + "-" + cellIndex);
                    cellIndex++;
                    length++;
                }
                if (length >= 3) {
                    sticks.push({position: stickPosition, length: length});
                }
            },
            checkTopRight = function (rowIndex, cellIndex) {
                var length = 0,
                    stickPosition = [],
                    cellColor = matrix[rowIndex][cellIndex];
                if (!cellColor) {
                    return;
                }
                while (matrix[rowIndex] && (matrix[rowIndex][cellIndex] === cellColor)) {
                    stickPosition.push(rowIndex + "-" + cellIndex);
                    rowIndex++;
                    cellIndex++;
                    length++;
                }
                if (length >= 3) {
                    sticks.push({position: stickPosition, length: length});
                }
            },
            checkTopLeft = function (rowIndex, cellIndex) {
                var length = 0,
                    stickPosition = [],
                    cellColor = matrix[rowIndex][cellIndex];
                if (!cellColor) {
                    return;
                }
                while (matrix[rowIndex] && (matrix[rowIndex][cellIndex] === cellColor)) {
                    stickPosition.push(rowIndex + "-" + cellIndex);
                    rowIndex++;
                    cellIndex--;
                    length++;
                }
                if (length >= 3) {
                    sticks.push({position: stickPosition, length: length});
                }
            },
            matrix = _.clone(this.getMatrix()).reverse();
        matrix.forEach(function (row, rowIndex) {
            if (rowIndex === 0) return;
            row.forEach(function (cell, cellIndex) {
                if (cellIndex === 0 || cellIndex === 8) return;
                checkTop(rowIndex, cellIndex);
                checkRight(rowIndex, cellIndex);
                checkTopRight(rowIndex, cellIndex);
                checkTopLeft(rowIndex, cellIndex);
            });
        });
        console.log(sticks);
        if (sticks.length) {
            this.burnSticks(sticks);
            this.shiftSticks(sticks);
            BINDING.set("stage", this.getMatrix());
            this.reduceStage();
        }
        return sticks;
    },

    _defaultMatrix: function () {
        return _.map(_.range(0, this.matrixHeight), function (row) {
            return _.map(_.range(0, this.matrixWidth), function (col) {
                return row === this.matrixHeight - 1 || col === 0 || col === this.matrixWidth - 1 ? "#" : "0";
            }.bind(this)).join("");
        }.bind(this)).join("");
    }
});