class ScoreGenerator {
  private currentPlayer = 1;
  public currentTeam = Math.random() < 0.5 ? 1 : 2;
  private currentTurn = 1;
  private currentTotal = 0;
  private completeTotal = 0;
  private teamOneSum = 0;
  private teamTwoSum = 0;
  private teamChances = 0;
  private counterStarted = false;
  private counter = 0;
  constructor() {}

  private counterIncrement = () => {
    if (this.counterStarted === false) {
      this.counterStarted = true;

      setInterval(() => {
        if (this.teamChances < 2) {
          this.counter++;
          var p = document.querySelector(".timer");
          if (p !== null) {
            p.innerHTML = this.counter.toString();
          }

          if (this.counter === 30) {
            this.counter = 0;
            this.currentPlayer = 10;
            this.disableButtonsForTeam(this.currentTeam === 1 ? 2 : 1);
            this.switchPlayerAndTeam();
          }
        }
      }, 1000);
    }
  };

  private generateRandomScore = (): number => {
    return Math.floor(Math.random() * 7);
  };

  public generateResult = () => {
    if (this.teamOneSum !== 0 && this.teamTwoSum !== 0) {
      var el = document.querySelector(".results");

      if (this.teamOneSum > this.teamTwoSum) {
        if (el !== null) {
          el.innerHTML = "Team One Won! ";
        }
      } else if (this.teamOneSum < this.teamTwoSum) {
        if (el !== null) {
          el.innerHTML = "Team Two Won! ";
        }
      } else {
        if (el !== null) {
          el.innerHTML = "Match Draw!";
        }
      }
    }
  };

  public resetValues = () => {
    this.counter = 0;
    this.currentPlayer = 1;
    this.currentTeam = Math.random() < 0.5 ? 1 : 2;
    this.currentTurn = 1;
    this.currentTotal = 0;
    this.completeTotal = 0;
    this.teamOneSum = 0;
    this.teamTwoSum = 0;

    this.disableButtonsForTeam(this.currentTeam === 1 ? 1 : 2);
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
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 6; j++) {
        for (let k = 1; k <= 10; k++) {
          let currMember = `t${i}${j}p${k}`;
          let element = document.querySelector(`.${currMember}`);
          if (element !== null) {
            element.innerHTML = "";
          }
        }
      }
    }


    for(let i=1;i<=2;i++)
    {
      for(let j=1;j<=10;j++)
      {
        let currTotal=`t${i}totalp${j}`
        let element = document.querySelector(`.${currTotal}`)
        if(element!==null)
        {
          element.innerHTML = "";
        }


      }
    }
  };

  private switchPlayerAndTeam = (): void => {
    if (
      this.currentPlayer === 10 &&
      (this.teamOneSum === 0 || this.teamTwoSum === 0)
    ) {
      this.teamChances += 1;
      this.currentPlayer = 1;
      if (this.currentTeam === 1) {
        this.teamOneSum = this.completeTotal;
        var el = document.querySelector(".team-one");
        if (el !== null) {
          el.innerHTML = this.teamOneSum.toString();
        }
      } else {
        this.teamTwoSum = this.completeTotal;
        var el = document.querySelector(".team-two");
        if (el !== null) {
          el.innerHTML = this.teamTwoSum.toString();
        }
      }
      this.completeTotal = 0;
      this.currentTeam = this.currentTeam === 1 ? 2 : 1;
      this.counter = 0;
      this.counterStarted = false;
    } else {
      this.currentPlayer++;
    }
  };

  private switchTurn = (): void => {
    this.currentTurn++;
    if (this.currentTurn > 6) {
      this.currentTurn = 1;
      this.switchPlayerAndTeam();
      this.currentTotal = 0;
    }
  };

  public disableButtonsForTeam(team: number) {
    const buttonOne = document.querySelector(
      ".button-one"
    ) as HTMLButtonElement;
    const buttonTwo = document.querySelector(
      ".button-two"
    ) as HTMLButtonElement;
    if(this.teamTwoSum!==0 && this.teamOneSum!==0)
    {
      buttonOne.disabled = true;
      buttonTwo.disabled = true;

    }
    else if (team === 1) {
      buttonTwo.disabled = true;
      buttonOne.disabled = false;
    } else {
      buttonOne.disabled = true;
      buttonTwo.disabled = false;
    }
  }

  public generateScore = () => {
    if (this.teamOneSum === 0 || this.teamTwoSum === 0) {
      this.disableButtonsForTeam(this.currentTeam === 1 ? 1 : 2);
      if (this.counter === 0) {
        this.counterIncrement();
      }
      let totalScore = 0;
      let foundZero = false;
      for (let k = 1; k <= 6; k++) {
        if (k === this.currentTurn) {
          let currScore = this.generateRandomScore();
          totalScore += currScore;
          this.currentTotal += currScore;
          this.completeTotal += currScore;
          let currMember = `t${this.currentTeam}${k}p${this.currentPlayer}`;
          let element = document.querySelector(`.${currMember}`);

          if (element !== null) {
            if (currScore === 0) {
              element.innerHTML = "WT";
              this.currentTotal = 0;
              this.currentTurn = 1;
              this.switchPlayerAndTeam();
              foundZero = true;

              break;
            } else {
              element.innerHTML = currScore.toString();
            }
          }
        }
      }

      let currTotal = `t${this.currentTeam}totalp${this.currentPlayer}`;
      const totalElement = document.querySelector(`.${currTotal}`);
      if (totalElement !== null) {
        totalElement.innerHTML = this.currentTotal.toString();
      }

      if (!foundZero) {
        this.switchTurn();
      }
    }
  };
}

const scoreGenerator = new ScoreGenerator();
scoreGenerator.disableButtonsForTeam(scoreGenerator.currentTeam);
document
  .querySelector(".button-one")
  ?.addEventListener("click", scoreGenerator.generateScore);
document
  .querySelector(".button-two")
  ?.addEventListener("click", scoreGenerator.generateScore);
document
  .querySelector(".generate-result-button")
  ?.addEventListener("click", scoreGenerator.generateResult);
document
  .querySelector(".reset-button")
  ?.addEventListener("click", scoreGenerator.resetValues);
