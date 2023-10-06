var _a, _b, _c, _d;
var ScoreGenerator = /** @class */ (function () {
    function ScoreGenerator() {
        var _this = this;
        this.currentPlayer = 1;
        this.currentTeam = Math.random() < 0.5 ? 1 : 2;
        this.currentTurn = 1;
        this.currentTotal = 0;
        this.completeTotal = 0;
        this.teamOneSum = 0;
        this.teamTwoSum = 0;
        this.teamChances = 0;
        this.counterStarted = false;
        this.counter = 0;
        this.counterIncrement = function () {
            if (_this.counterStarted === false) {
                _this.counterStarted = true;
                setInterval(function () {
                    if (_this.teamChances < 2) {
                        _this.counter++;
                        var p = document.querySelector(".timer");
                        if (p !== null) {
                            p.innerHTML = _this.counter.toString();
                        }
                        if (_this.counter === 30) {
                            _this.counter = 0;
                            _this.currentPlayer = 10;
                            _this.disableButtonsForTeam(_this.currentTeam === 1 ? 2 : 1);
                            _this.switchPlayerAndTeam();
                        }
                    }
                }, 1000);
            }
        };
        this.generateRandomScore = function () {
            return Math.floor(Math.random() * 7);
        };
        this.generateResult = function () {
            if (_this.teamOneSum !== 0 && _this.teamTwoSum !== 0) {
                var el = document.querySelector(".results");
                if (_this.teamOneSum > _this.teamTwoSum) {
                    if (el !== null) {
                        el.innerHTML = "Team One Won! ";
                    }
                }
                else if (_this.teamOneSum < _this.teamTwoSum) {
                    if (el !== null) {
                        el.innerHTML = "Team Two Won! ";
                    }
                }
                else {
                    if (el !== null) {
                        el.innerHTML = "Match Draw!";
                    }
                }
            }
        };
        this.resetValues = function () {
            _this.counter = 0;
            _this.currentPlayer = 1;
            _this.currentTeam = Math.random() < 0.5 ? 1 : 2;
            _this.currentTurn = 1;
            _this.currentTotal = 0;
            _this.completeTotal = 0;
            _this.teamOneSum = 0;
            _this.teamTwoSum = 0;
            _this.disableButtonsForTeam(_this.currentTeam === 1 ? 1 : 2);
            var el = document.querySelector(".team-one");
            if (el !== null) {
                el.innerHTML = "0";
            }
            el = document.querySelector(".team-two");
            if (el !== null) {
                el.innerHTML = "0";
            }
            el = document.querySelector(".results");
            if (el !== null) {
                el.innerHTML = "";
            }
            for (var i = 1; i <= 2; i++) {
                for (var j = 1; j <= 6; j++) {
                    for (var k = 1; k <= 10; k++) {
                        var currMember = "t".concat(i).concat(j, "p").concat(k);
                        var element = document.querySelector(".".concat(currMember));
                        if (element !== null) {
                            element.innerHTML = "";
                        }
                    }
                }
            }
            for (var i = 1; i <= 2; i++) {
                for (var j = 1; j <= 10; j++) {
                    var currTotal = "t".concat(i, "totalp").concat(j);
                    var element = document.querySelector(".".concat(currTotal));
                    if (element !== null) {
                        element.innerHTML = "";
                    }
                }
            }
        };
        this.switchPlayerAndTeam = function () {
            if (_this.currentPlayer === 10 &&
                (_this.teamOneSum === 0 || _this.teamTwoSum === 0)) {
                _this.teamChances += 1;
                _this.currentPlayer = 1;
                if (_this.currentTeam === 1) {
                    _this.teamOneSum = _this.completeTotal;
                    var el = document.querySelector(".team-one");
                    if (el !== null) {
                        el.innerHTML = _this.teamOneSum.toString();
                    }
                }
                else {
                    _this.teamTwoSum = _this.completeTotal;
                    var el = document.querySelector(".team-two");
                    if (el !== null) {
                        el.innerHTML = _this.teamTwoSum.toString();
                    }
                }
                _this.completeTotal = 0;
                _this.currentTeam = _this.currentTeam === 1 ? 2 : 1;
                _this.counter = 0;
                _this.counterStarted = false;
            }
            else {
                _this.currentPlayer++;
            }
        };
        this.switchTurn = function () {
            _this.currentTurn++;
            if (_this.currentTurn > 6) {
                _this.currentTurn = 1;
                _this.switchPlayerAndTeam();
                _this.currentTotal = 0;
            }
        };
        this.generateScore = function () {
            if (_this.teamOneSum === 0 || _this.teamTwoSum === 0) {
                _this.disableButtonsForTeam(_this.currentTeam === 1 ? 1 : 2);
                if (_this.counter === 0) {
                    _this.counterIncrement();
                }
                var totalScore = 0;
                var foundZero = false;
                for (var k = 1; k <= 6; k++) {
                    if (k === _this.currentTurn) {
                        var currScore = _this.generateRandomScore();
                        totalScore += currScore;
                        _this.currentTotal += currScore;
                        _this.completeTotal += currScore;
                        var currMember = "t".concat(_this.currentTeam).concat(k, "p").concat(_this.currentPlayer);
                        var element = document.querySelector(".".concat(currMember));
                        if (element !== null) {
                            if (currScore === 0) {
                                element.innerHTML = "WT";
                                _this.currentTotal = 0;
                                _this.currentTurn = 1;
                                _this.switchPlayerAndTeam();
                                foundZero = true;
                                break;
                            }
                            else {
                                element.innerHTML = currScore.toString();
                            }
                        }
                    }
                }
                var currTotal = "t".concat(_this.currentTeam, "totalp").concat(_this.currentPlayer);
                var totalElement = document.querySelector(".".concat(currTotal));
                if (totalElement !== null) {
                    totalElement.innerHTML = _this.currentTotal.toString();
                }
                if (!foundZero) {
                    _this.switchTurn();
                }
            }
        };
    }
    ScoreGenerator.prototype.disableButtonsForTeam = function (team) {
        var buttonOne = document.querySelector(".button-one");
        var buttonTwo = document.querySelector(".button-two");
        if (this.teamTwoSum !== 0 && this.teamOneSum !== 0) {
            buttonOne.disabled = true;
            buttonTwo.disabled = true;
        }
        else if (team === 1) {
            buttonTwo.disabled = true;
            buttonOne.disabled = false;
        }
        else {
            buttonOne.disabled = true;
            buttonTwo.disabled = false;
        }
    };
    return ScoreGenerator;
}());
var scoreGenerator = new ScoreGenerator();
scoreGenerator.disableButtonsForTeam(scoreGenerator.currentTeam);
(_a = document
    .querySelector(".button-one")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", scoreGenerator.generateScore);
(_b = document
    .querySelector(".button-two")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", scoreGenerator.generateScore);
(_c = document
    .querySelector(".generate-result-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", scoreGenerator.generateResult);
(_d = document
    .querySelector(".reset-button")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", scoreGenerator.resetValues);
