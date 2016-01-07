var screenX = document.body.clientWidth;
var screenY = window.screen.availHeight;
var previousLevel = 0;
reDraw = function(x, y) {
	y = y - 85;
	x = x - 30;
	$("#head").css("max-width", x + "px");
	$("#foot").css("max-width", x + "px");
	$("#body").css("max-width", x + "px");
	$(".icon").css("margin", (x - 248) / 8 + "px").css("font-size", 24 + "px");
	$(".screen").css("width", $("#homeScreen").css("width"));
	$("#allScreens").css("width", $("#homeScreen").width() * 9 + "px");
	$("#mask").css("height", $("#secondside").height() + "px");
	$(".commonBtn").css("height", $("#head").height() + "px").css("line-height", $("#head").height() + "px");
}
var MySigma = function() {
	var eternalGame = new EternalGame(this);
	var timeScoreGame = new TimeScoreGame(this);
	var timeCorrectGame = new TimeCorrectGame(this);
	var timeNumberGame = new TimeNumberGame(this);
	var timeAmountGame = new TimeAmountGame(this);
	this.map = {};
	this.isOldGame = false;
	this.modelName = "";
	this.userScore = 0;
	this.arrayChoose = [];
	this.userSum = 0;
	this.sum = 0;
	this.GAME_START = 1;
	this.GAME_PAUSE = 2;
	this.GAME_OVER = 0;
	this.gameStatus = 0; //游戏状态
	this.getSize = function() {
		var x = screenX; //游戏区域
		var y = screenY; //游戏区域
		if (IsPC()) {
			x = y * 9 / 16;
			reDraw(x, y);
		} else {
			reDraw(x, y);
		}
	}

	this.gameModel = {};

	this.startGame = function() {
		localStorage.hasOldGame = false;
		this.gameModel = eval(this.modelName);
		this.gameModel.startGame();
	}

	this.quitGame = function() {
		this.gameModel = eval(this.modelName);
		this.gameModel.quitGame();
	}

	this.setSum = function() {
		//console.log("choose")
		this.sum = 0;
		var arr = document.getElementsByClassName("numBox");
		var startPoint = Math.floor(Math.random() * arr.length);
		var systemChoose = [];
		systemChoose.push(startPoint);
		for (var i = 0; i < this.map.amount; i++) {
			var tmp = [-this.map.width, -1, 1, this.map.width];
			if (startPoint % this.map.width == 0) {
				tmp = [-this.map.width, 1, this.map.width];
			} else if (startPoint % this.map.width == this.map.width - 1) {
				tmp = [-this.map.width, -1, this.map.width];
			}

			if (startPoint < this.map.width) {
				tmp.splice(0, 1);
			}
			if (startPoint >= arr.length - this.map.width) {
				tmp.splice(tmp.length - 1, 1);
			}
			for (var j = 0; j < tmp.length; j++) {
				if (systemChoose.indexOf(startPoint + tmp[j]) != -1) {
					tmp.splice(j, 1);
				}
			}
			if (tmp.length == 0) {
				for (var j = 0; j < systemChoose.length; j++) {
					this.sum += parseInt($(arr[systemChoose[j]]).text());
					//console.log(systemChoose[j] + "---" + $(arr[systemChoose[j]]).text());
				}
				return this.sum;
			} else {
				var dir = Math.floor(Math.random() * tmp.length);
				var next = startPoint + tmp[dir]; //确定下一个格子的位置
				systemChoose.push(next);
				startPoint = next;
			}
		}
		for (var j = 0; j < systemChoose.length; j++) {
			this.sum += parseInt($(arr[systemChoose[j]]).text());
			//console.log(systemChoose[j] + "---" + $(arr[systemChoose[j]]).text());
		}
		return this.sum;
	}
}

//无尽模式
EternalGame = function(mySigma) {
	this.time = 50;
	this.startGame = function() {
		mySigma.gameStatus = mySigma.GAME_START;
		mySigma.userScore = 0;
		mySigma.userSum = 0;
		mySigma.setSum();
		$("#gameCase").text("Time: " + this.time);
		if (mySigma.isOldGame) {
			var data = JSON.parse(savedGameData);
			mySigma.sum = data.sum;
			mySigma.userScore = data.score;
		}
		$("#sum").text("Sum: " + mySigma.sum);
		$("#score").text("Score: " + mySigma.userScore);
		this.minusTime();
	};

	this.minusTime = function() {
		setTimeout(function() {
			mySigma.gameModel.effect(mySigma.gameModel.time);
			if (mySigma.gameStatus == mySigma.GAME_OVER) {
				return;
			}
			if (mySigma.gameStatus == mySigma.GAME_START) {
				mySigma.gameModel.time--;
			}
			$("#gameCase").text("Time: " + mySigma.gameModel.time);
			if (mySigma.gameModel.time <= 0 || !mySigma.gameModel.time) {
				$("#gameCase").text("Time: " + 0);
				mySigma.gameModel.gameOver();
			} else {
				mySigma.gameModel.minusTime();
			}
		}, 1000);
	}

	this.previousEffect = "shine_blue_5";
	this.effect = function(time) {
		if (time >= 40) {
			if (this.previousEffect != "shine_blue_5") {
				$("#head").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#body").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#foot").removeClass(this.previousEffect).addClass("shine_blue_5");
				this.previousEffect = "shine_blue_5";
			}
		} else if (time >= 30) {
			if (this.previousEffect != "shine_blue_4") {
				$("#head").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_4").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_4";
			}
		} else if (time >= 20) {
			if (this.previousEffect != "shine_blue_3") {
				$("#head").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_3").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_3";
			}
		} else if (time >= 10) {
			if (this.previousEffect != "shine_blue_2") {
				$("#head").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_2").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_2";
			}
		} else if (time >= 5) {
			if (this.previousEffect != "shine_blue_1") {
				$("#head").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_1").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_1";
			}
		} else if (time >= 0) {
			if (this.previousEffect != "shine_blue_0") {
				$("#head").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_0").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_0";
			}
		}
	}

	this.quitGame = function() {
		this.saveGame({
			time: mySigma.gameModel.time,
			score: mySigma.userScore
		});
		mySigma = new MySigma();
		mySigma.gameStatus = this.GAME_OVER;
		mySigma.arrayChoose = [];
		mySigma.sum = 0;
		mySigma.score = 0;
		this.effect(50);
	}

	this.saveGame = function(obj) {
		if (mySigma.gameStatus != mySigma.GAME_OVER) {
			localStorage.hasOldGame = true;
			$("#loadOldBtn").css("display", "");
			console.log("aaa"+mySigma.modelName);
			var arr = $("#gameContainer").children();
			var tmp = [];
			for (var i = 0; i < arr.length; i++) {
				tmp.push(parseInt($(arr[i]).text()));
			}
			var data = {
				gameModel: "eternalGame",
				time: obj.time,
				score: obj.score,
				sum: mySigma.sum,
				numBox: tmp,
			}
			localStorage.savedGameInfo = JSON.stringify(data);
			savedGameData = localStorage.savedGameInfo;
		} else {
			localStorage.hasOldGame = false;
			$("#loadOldBtn").css("display", "none");
		}
	}

	this.gameOver = function() {
		mySigma.gameStatus = mySigma.GAME_OVER;
		$("#dealBtn").text("Retry");
	}

	this.eliminate = function() {
		var chosenList = $(".numBoxChoose");
		mySigma.gameStatus = mySigma.GAME_PAUSE;
		chosenList.animate({
			opacity: '0'
		}, "250", function() {
			mySigma.gameStatus = mySigma.GAME_START;
			var chooseArr = document.getElementsByClassName("numBoxChoose");
			for (var i = 0; i < chooseArr.length; i++) {
				$(chooseArr[i]).text(mySigma.map.number[Math.floor(Math.random() * mySigma.map.number.length)]);
			}
			$(".numBoxChoose").addClass("numBox").removeClass("numBoxChoose");
			$("#sum").text("Sum: " + mySigma.setSum());
		});
		chosenList.animate({
			opacity: '1'
		}, "250");

		if (mySigma.userSum == mySigma.sum) {
			mySigma.userScore += mySigma.sum;
			$("#score").text("Correct: " + mySigma.userScore);
			mySigma.gameModel.time += Math.floor(mySigma.sum / 3 + 1);
			$("#score").text("Score: " + mySigma.userScore);
		} else {
			mySigma.userScore -= mySigma.userSum - mySigma.sum;
			$("#score").text("Score: " + mySigma.userScore);
		}
		mySigma.userSum = 0;
		mySigma.arrayChoose = [];
		if (!hightestScore || mySigma.userScore > hightestScore) {
			hightestScore = mySigma.userScore;
			localStorage.hightestScore = hightestScore;
			$("#title").text("Highest Score: " + hightestScore);
		}
	}
}

//在规定时间内得指定分数模式
TimeScoreGame = function(mySigma) {
	this.time = 50;
	this.startGame = function() {
		this.time = mySigma.map.time;
		mySigma.gameStatus = mySigma.GAME_START;
		mySigma.userScore = 0;
		mySigma.userSum = 0;
		mySigma.setSum();
		$("#gameCase").text("Time: " + this.time);
		if (mySigma.isOldGame) {
			var data = JSON.parse(savedGameData);
			mySigma.sum = data.sum;
			mySigma.userScore = data.score;
		}
		$("#sum").text("Sum: " + mySigma.sum);
		$("#score").text("Score: " + mySigma.userScore);
		this.minusTime();
	};

	this.minusTime = function() {
		setTimeout(function() {
			mySigma.gameModel.effect(mySigma.gameModel.time);
			if (mySigma.gameStatus == mySigma.GAME_OVER) {
				return;
			}
			if (mySigma.gameStatus == mySigma.GAME_START) {
				mySigma.gameModel.time--;
			}
			$("#gameCase").text("Time: " + mySigma.gameModel.time);
			if (mySigma.gameModel.time <= 0 || !mySigma.gameModel.time) {
				$("#gameCase").text("Time: " + 0);
				mySigma.gameModel.gameOver(0);
			} else {
				mySigma.gameModel.minusTime();
			}
		}, 1000);
	}

	this.previousEffect = "shine_blue_5";
	this.effect = function(time) {
		if (time >= 40) {
			if (this.previousEffect != "shine_blue_5") {
				$("#head").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#body").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#foot").removeClass(this.previousEffect).addClass("shine_blue_5");
				this.previousEffect = "shine_blue_5";
			}
		} else if (time >= 30) {
			if (this.previousEffect != "shine_blue_4") {
				$("#head").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_4").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_4";
			}
		} else if (time >= 20) {
			if (this.previousEffect != "shine_blue_3") {
				$("#head").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_3").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_3";
			}
		} else if (time >= 10) {
			if (this.previousEffect != "shine_blue_2") {
				$("#head").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_2").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_2";
			}
		} else if (time >= 5) {
			if (this.previousEffect != "shine_blue_1") {
				$("#head").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_1").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_1";
			}
		} else if (time >= 0) {
			if (this.previousEffect != "shine_blue_0") {
				$("#head").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_0").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_0";
			}
		}
	}

	this.quitGame = function() {
		this.saveGame({
			time: mySigma.gameModel.time,
			score: mySigma.userScore
		});
		mySigma = new MySigma();
		mySigma.gameStatus = this.GAME_OVER;
		mySigma.arrayChoose = [];
		mySigma.sum = 0;
		mySigma.score = 0;
		this.effect(50);
		console.log("quit")
	}

	this.saveGame = function(obj) {
		localStorage.hasOldGame = "false";
		$("#loadOldBtn").css("display", "none");
		console.log(localStorage.hasOldGame)
	}

	this.gameOver = function(result) {
		mySigma.gameStatus = mySigma.GAME_OVER;
		$("#dealBtn").text("Retry");
		if (mySigma.map.level && mySigma.map.level == levelData.level) {
			levelData.level++;
			$("#level" + levelData.level).addClass("unlock").removeClass("lock").text(levelData.level);
		}
		if (result > 0) {
			$("#title").text("Congratulation!");
			$("#gameContainer").empty();
			$("#gameContainer").append("<div class='nextLevel' onclick='nextLevel()'>Next</div>");
			$(".nextLevel").height($(".nextLevel").width() + "px");
			$(".nextLevel").css("margin-top", $(".nextLevel").height() / 2 + "px").css("top", "50%").css("line-height", $(".nextLevel").height() + "px").css("font-size", $(".nextLevel").height() / 3 + "px");
			if (result == 3) {
				$("#gameContainer").append("<div class='starDiv'>★ ★ ★</div>");
				$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★★</p>");
				levelData.star[mySigma.map.level] = 3;
			} else if (result == 2) {
				$("#gameContainer").append("<div class='starDiv'>★ ★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★</p>");
					levelData.star[mySigma.map.level] = 2;
				}
			} else if (result == 1) {
				$("#gameContainer").append("<div class='starDiv'>★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★</p>");
					levelData.star[mySigma.map.level] = 1;
				}
			}
			$(".starDiv").css("font-size", $(".starDiv").width() / 6 + "px");
		} else {
			$("#title").text("You Lose!");
		}
		localStorage.levelData = JSON.stringify(levelData);
		mySigma = null;
	}

	this.eliminate = function() {
		var chosenList = $(".numBoxChoose");
		mySigma.gameStatus = mySigma.GAME_PAUSE;
		chosenList.animate({
			opacity: '0'
		}, "250", function() {
			mySigma.gameStatus = mySigma.GAME_START;
			var chooseArr = document.getElementsByClassName("numBoxChoose");
			for (var i = 0; i < chooseArr.length; i++) {
				$(chooseArr[i]).text(mySigma.map.number[Math.floor(Math.random() * mySigma.map.number.length)]);
			}
			$(".numBoxChoose").addClass("numBox").removeClass("numBoxChoose");
			$("#sum").text("Sum: " + mySigma.setSum());
		});
		chosenList.animate({
			opacity: '1'
		}, "250");

		if (mySigma.userSum == mySigma.sum) {
			mySigma.userScore += mySigma.sum;
			$("#score").text("Score: " + mySigma.userScore);
			if (mySigma.userScore >= mySigma.map.goalScore) {
				if (mySigma.gameModel.time >= mySigma.map.star3) {
					levelData.star[mySigma.map.level] = 3;
					mySigma.gameModel.gameOver(3);
				} else if (mySigma.gameModel.time >= mySigma.map.star2) {
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
						levelData.star[mySigma.map.level] = 2;
					}
					mySigma.gameModel.gameOver(2);
				} else {
					mySigma.gameModel.gameOver(1);
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
						levelData.star[mySigma.map.level] = 1;
					}
				}
				//mySigma = null;
			}
		} else {
			mySigma.userScore -= mySigma.userSum - mySigma.sum;
			$("#score").text("Score: " + mySigma.userScore);
		}
		mySigma.userSum = 0;
		mySigma.arrayChoose = [];
	}
}

//在规定时间内得指定分数模式
TimeCorrectGame = function(mySigma) {
	this.time = 50;
	this.startGame = function() {
		this.time = mySigma.map.time;
		mySigma.gameStatus = mySigma.GAME_START;
		mySigma.userScore = 0;
		mySigma.userSum = 0;
		mySigma.setSum();
		$("#gameCase").text("Time: " + this.time);
		if (mySigma.isOldGame) {
			var data = JSON.parse(savedGameData);
			mySigma.sum = data.sum;
			mySigma.userScore = data.score;
		}
		$("#sum").text("Sum: " + mySigma.sum);
		$("#score").text("Correct: " + mySigma.userScore);
		this.minusTime();
	};

	this.minusTime = function() {
		setTimeout(function() {
			mySigma.gameModel.effect(mySigma.gameModel.time);
			if (mySigma.gameStatus == mySigma.GAME_OVER) {
				return;
			}
			if (mySigma.gameStatus == mySigma.GAME_START) {
				mySigma.gameModel.time--;
			}
			$("#gameCase").text("Time: " + mySigma.gameModel.time);
			if (mySigma.gameModel.time <= 0 || !mySigma.gameModel.time) {
				$("#gameCase").text("Time: " + 0);
				mySigma.gameModel.gameOver(0);
			} else {
				mySigma.gameModel.minusTime();
			}
		}, 1000);
	}

	this.previousEffect = "shine_blue_5";
	this.effect = function(time) {
		if (time >= 40) {
			if (this.previousEffect != "shine_blue_5") {
				$("#head").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#body").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#foot").removeClass(this.previousEffect).addClass("shine_blue_5");
				this.previousEffect = "shine_blue_5";
			}
		} else if (time >= 30) {
			if (this.previousEffect != "shine_blue_4") {
				$("#head").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_4").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_4";
			}
		} else if (time >= 20) {
			if (this.previousEffect != "shine_blue_3") {
				$("#head").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_3").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_3";
			}
		} else if (time >= 10) {
			if (this.previousEffect != "shine_blue_2") {
				$("#head").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_2").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_2";
			}
		} else if (time >= 5) {
			if (this.previousEffect != "shine_blue_1") {
				$("#head").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_1").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_1";
			}
		} else if (time >= 0) {
			if (this.previousEffect != "shine_blue_0") {
				$("#head").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_0").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_0";
			}
		}
	}

	this.quitGame = function() {
		console.log("quit----")
		this.saveGame({
			time: mySigma.gameModel.time,
			score: mySigma.userScore
		});
		mySigma = new MySigma();
		mySigma.gameStatus = this.GAME_OVER;
		mySigma.arrayChoose = [];
		mySigma.sum = 0;
		mySigma.score = 0;
		this.effect(50);
		console.log("quit")
	}

	this.saveGame = function(obj) {
		localStorage.hasOldGame = "false";
		$("#loadOldBtn").css("display", "none");
		console.log(localStorage.hasOldGame)
	}

	this.gameOver = function(result) {
		mySigma.gameStatus = mySigma.GAME_OVER;
		$("#dealBtn").text("Retry");
		if (result > 0) {
			if (mySigma.map.level && mySigma.map.level == levelData.level) {
				levelData.level++;
				$("#level" + levelData.level).addClass("unlock").removeClass("lock").text(levelData.level);
			}

			$("#title").text("Congratulation!");
			$("#gameContainer").empty();
			$("#gameContainer").append("<div class='nextLevel' onclick='nextLevel()'>Next</div>");
			$(".nextLevel").height($(".nextLevel").width() + "px");
			$(".nextLevel").css("margin-top", $(".nextLevel").height() / 2 + "px").css("top", "50%").css("line-height", $(".nextLevel").height() + "px").css("font-size", $(".nextLevel").height() / 3 + "px");
			if (result == 3) {
				$("#gameContainer").append("<div class='starDiv'>★ ★ ★</div>");
				$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★★</p>");
				levelData.star[mySigma.map.level] = 3;
			} else if (result == 2) {
				$("#gameContainer").append("<div class='starDiv'>★ ★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★</p>");
					levelData.star[mySigma.map.level] = 2;
				}
			} else if (result == 1) {
				$("#gameContainer").append("<div class='starDiv'>★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★</p>");
					levelData.star[mySigma.map.level] = 1;
				}
			}
			$(".starDiv").css("font-size", $(".starDiv").width() / 6 + "px");
		} else {
			$("#title").text("You Lose!");
		}
		localStorage.levelData = JSON.stringify(levelData);
		mySigma = null;
	}

	this.eliminate = function() {
		var chosenList = $(".numBoxChoose");
		mySigma.gameStatus = mySigma.GAME_PAUSE;
		chosenList.animate({
			opacity: '0'
		}, "250", function() {
			mySigma.gameStatus = mySigma.GAME_START;
			var chooseArr = document.getElementsByClassName("numBoxChoose");
			for (var i = 0; i < chooseArr.length; i++) {
				$(chooseArr[i]).text(mySigma.map.number[Math.floor(Math.random() * mySigma.map.number.length)]);
			}
			$(".numBoxChoose").addClass("numBox").removeClass("numBoxChoose");
			$("#sum").text("Sum: " + mySigma.setSum());
		});
		chosenList.animate({
			opacity: '1'
		}, "250");

		if (mySigma.userSum == mySigma.sum) {
			mySigma.userScore++;
			$("#score").text("Correct: " + mySigma.userScore);
			if (mySigma.userScore >= mySigma.map.goalCorrect) {
				if (mySigma.gameModel.time >= mySigma.map.star3) {
					levelData.star[mySigma.map.level] = 3;
					mySigma.gameModel.gameOver(3);
				} else if (mySigma.gameModel.time >= mySigma.map.star2) {
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
						levelData.star[mySigma.map.level] = 2;
					}
					mySigma.gameModel.gameOver(2);
				} else {
					mySigma.gameModel.gameOver(1);
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
						levelData.star[mySigma.map.level] = 1;
					}
				}

			}
		} else {
			//mySigma.userScore -= mySigma.userSum - mySigma.sum;
			$("#score").text("Correct: " + mySigma.userScore);
		}
		mySigma.userSum = 0;
		mySigma.arrayChoose = [];

	}
}

//在规定时间内消除指定数字N次
TimeNumberGame = function(mySigma) {
	this.time = 50;
	this.startGame = function() {
		this.time = mySigma.map.time;
		mySigma.gameStatus = mySigma.GAME_START;
		mySigma.userScore = 0;
		mySigma.userSum = 0;
		mySigma.setSum();
		$("#gameCase").text("Time: " + this.time);
		if (mySigma.isOldGame) {
			var data = JSON.parse(savedGameData);
			mySigma.sum = data.sum;
			mySigma.userScore = data.score;
		}
		$("#sum").text("Sum: " + mySigma.sum);
		$("#score").text("Amount: " + mySigma.userScore);
		this.minusTime();
	};

	this.minusTime = function() {
		setTimeout(function() {
			mySigma.gameModel.effect(mySigma.gameModel.time);
			if (mySigma.gameStatus == mySigma.GAME_OVER) {
				return;
			}
			if (mySigma.gameStatus == mySigma.GAME_START) {
				mySigma.gameModel.time--;
			}
			$("#gameCase").text("Time: " + mySigma.gameModel.time);
			if (mySigma.gameModel.time <= 0 || !mySigma.gameModel.time) {
				$("#gameCase").text("Time: " + 0);
				mySigma.gameModel.gameOver(0);
			} else {
				mySigma.gameModel.minusTime();
			}
		}, 1000);
	}

	this.previousEffect = "shine_blue_5";
	this.effect = function(time) {
		if (time >= 40) {
			if (this.previousEffect != "shine_blue_5") {
				$("#head").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#body").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#foot").removeClass(this.previousEffect).addClass("shine_blue_5");
				this.previousEffect = "shine_blue_5";
			}
		} else if (time >= 30) {
			if (this.previousEffect != "shine_blue_4") {
				$("#head").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_4").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_4";
			}
		} else if (time >= 20) {
			if (this.previousEffect != "shine_blue_3") {
				$("#head").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_3").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_3";
			}
		} else if (time >= 10) {
			if (this.previousEffect != "shine_blue_2") {
				$("#head").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_2").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_2";
			}
		} else if (time >= 5) {
			if (this.previousEffect != "shine_blue_1") {
				$("#head").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_1").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_1";
			}
		} else if (time >= 0) {
			if (this.previousEffect != "shine_blue_0") {
				$("#head").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_0").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_0";
			}
		}
	}

	this.quitGame = function() {
		this.saveGame({
			time: mySigma.gameModel.time,
			score: mySigma.userScore
		});
		mySigma = new MySigma();
		mySigma.gameStatus = this.GAME_OVER;
		mySigma.arrayChoose = [];
		mySigma.sum = 0;
		mySigma.score = 0;
		this.effect(50);
	}

	this.saveGame = function(obj) {
		localStorage.hasOldGame = "false";
		$("#loadOldBtn").css("display", "none");
		console.log(localStorage.hasOldGame)
	}

	this.gameOver = function(result) {
		mySigma.gameStatus = mySigma.GAME_OVER;
		$("#dealBtn").text("Retry");
		if (mySigma.map.level && mySigma.map.level == levelData.level) {
			levelData.level++;
			$("#level" + levelData.level).addClass("unlock").removeClass("lock").text(levelData.level);
		}
		if (result > 0) {
			$("#title").text("Congratulation!");
			$("#gameContainer").empty();
			$("#gameContainer").append("<div class='nextLevel' onclick='nextLevel()'>Next</div>");
			$(".nextLevel").height($(".nextLevel").width() + "px");
			$(".nextLevel").css("margin-top", $(".nextLevel").height() / 2 + "px").css("top", "50%").css("line-height", $(".nextLevel").height() + "px").css("font-size", $(".nextLevel").height() / 3 + "px");
			if (result == 3) {
				$("#gameContainer").append("<div class='starDiv'>★ ★ ★</div>");
				$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★★</p>");
				levelData.star[mySigma.map.level] = 3;
			} else if (result == 2) {
				$("#gameContainer").append("<div class='starDiv'>★ ★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★</p>");
					levelData.star[mySigma.map.level] = 2;
				}
			} else if (result == 1) {
				$("#gameContainer").append("<div class='starDiv'>★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★</p>");
					levelData.star[mySigma.map.level] = 1;
				}
			}
			$(".starDiv").css("font-size", $(".starDiv").width() / 6 + "px");
		} else {
			$("#title").text("You Lose!");
		}
		localStorage.levelData = JSON.stringify(levelData);
		mySigma = null;
	}

	this.eliminate = function() {
		var chosenList = $(".numBoxChoose");
		mySigma.gameStatus = mySigma.GAME_PAUSE;
		var chooseArr = document.getElementsByClassName("numBoxChoose");
		var tmpScore = 0;
		for (var i = 0; i < chooseArr.length; i++) {
			if (parseInt($(chooseArr[i]).text()) == mySigma.map.target) {
				tmpScore++;
			}
		}
		chosenList.animate({
			opacity: '0'
		}, "250", function() {
			mySigma.gameStatus = mySigma.GAME_START;
			var chooseArr = document.getElementsByClassName("numBoxChoose");
			for (var i = 0; i < chooseArr.length; i++) {
				$(chooseArr[i]).text(mySigma.map.number[Math.floor(Math.random() * mySigma.map.number.length)]);
			}
			$(".numBoxChoose").addClass("numBox").removeClass("numBoxChoose");
			$("#sum").text("Sum: " + mySigma.setSum());
		});
		chosenList.animate({
			opacity: '1'
		}, "250");

		if (mySigma.userSum == mySigma.sum) {
			mySigma.userScore += tmpScore;
			$("#score").text("Amount: " + mySigma.userScore);
			if (mySigma.userScore >= mySigma.map.goalTimes) {
				if (mySigma.gameModel.time >= mySigma.map.star3) {
					levelData.star[mySigma.map.level] = 3;
					mySigma.gameModel.gameOver(3);
				} else if (mySigma.gameModel.time >= mySigma.map.star2) {
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
						levelData.star[mySigma.map.level] = 2;
					}
					mySigma.gameModel.gameOver(2);
				} else {
					mySigma.gameModel.gameOver(1);
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
						levelData.star[mySigma.map.level] = 1;
					}
				}

			}
		} else {
			//mySigma.userScore -= mySigma.userSum - mySigma.sum;
			$("#score").text("Amount: " + mySigma.userScore);
		}
		mySigma.userSum = 0;
		mySigma.arrayChoose = [];

	}
}


//在规定时间内消除一定数量的数字
TimeAmountGame = function(mySigma) {
	this.time = 50;
	this.startGame = function() {
		this.time = mySigma.map.time;
		mySigma.gameStatus = mySigma.GAME_START;
		mySigma.userScore = 0;
		mySigma.userSum = 0;
		mySigma.setSum();
		$("#gameCase").text("Time: " + this.time);
		if (mySigma.isOldGame) {
			var data = JSON.parse(savedGameData);
			mySigma.sum = data.sum;
			mySigma.userScore = data.score;
		}
		$("#sum").text("Sum: " + mySigma.sum);
		$("#score").text("Amount: " + mySigma.userScore);
		this.minusTime();
	};

	this.minusTime = function() {
		setTimeout(function() {
			mySigma.gameModel.effect(mySigma.gameModel.time);
			if (mySigma.gameStatus == mySigma.GAME_OVER) {
				return;
			}
			if (mySigma.gameStatus == mySigma.GAME_START) {
				mySigma.gameModel.time--;
			}
			$("#gameCase").text("Time: " + mySigma.gameModel.time);
			if (mySigma.gameModel.time <= 0 || !mySigma.gameModel.time) {
				$("#gameCase").text("Time: " + 0);
				mySigma.gameModel.gameOver(0);
			} else {
				mySigma.gameModel.minusTime();
			}
		}, 1000);
	}

	this.previousEffect = "shine_blue_5";
	this.effect = function(time) {
		if (time >= 40) {
			if (this.previousEffect != "shine_blue_5") {
				$("#head").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#body").removeClass(this.previousEffect).addClass("shine_blue_5");
				$("#foot").removeClass(this.previousEffect).addClass("shine_blue_5");
				this.previousEffect = "shine_blue_5";
			}
		} else if (time >= 30) {
			if (this.previousEffect != "shine_blue_4") {
				$("#head").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_4").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_4").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_4";
			}
		} else if (time >= 20) {
			if (this.previousEffect != "shine_blue_3") {
				$("#head").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_3").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_3").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_3";
			}
		} else if (time >= 10) {
			if (this.previousEffect != "shine_blue_2") {
				$("#head").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_2").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_2").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_2";
			}
		} else if (time >= 5) {
			if (this.previousEffect != "shine_blue_1") {
				$("#head").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_1").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_1").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_1";
			}
		} else if (time >= 0) {
			if (this.previousEffect != "shine_blue_0") {
				$("#head").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#body").addClass("shine_blue_0").removeClass(this.previousEffect);
				$("#foot").addClass("shine_blue_0").removeClass(this.previousEffect);
				this.previousEffect = "shine_blue_0";
			}
		}
	}

	this.quitGame = function() {
		this.saveGame({
			time: mySigma.gameModel.time,
			score: mySigma.userScore
		});
		mySigma = new MySigma();
		mySigma.gameStatus = this.GAME_OVER;
		mySigma.arrayChoose = [];
		mySigma.sum = 0;
		mySigma.score = 0;
		this.effect(50);
		console.log("quit")
	}

	this.saveGame = function(obj) {
		localStorage.hasOldGame = "false";
		$("#loadOldBtn").css("display", "none");
		console.log(localStorage.hasOldGame)
	}

	this.gameOver = function(result) {
		mySigma.gameStatus = mySigma.GAME_OVER;
		$("#dealBtn").text("Retry");
		if (mySigma.map.level && mySigma.map.level == levelData.level) {
			levelData.level++;
			$("#level" + levelData.level).addClass("unlock").removeClass("lock").text(levelData.level);
		}
		if (result > 0) {
			$("#title").text("Congratulation!");
			$("#gameContainer").empty();
			$("#gameContainer").append("<div class='nextLevel' onclick='nextLevel()'>Next</div>");
			$(".nextLevel").height($(".nextLevel").width() + "px");
			$(".nextLevel").css("margin-top", $(".nextLevel").height() / 2 + "px").css("top", "50%").css("line-height", $(".nextLevel").height() + "px").css("font-size", $(".nextLevel").height() / 3 + "px");
			if (result == 3) {
				$("#gameContainer").append("<div class='starDiv'>★ ★ ★</div>");
				$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★★</p>");
				levelData.star[mySigma.map.level] = 3;
			} else if (result == 2) {
				$("#gameContainer").append("<div class='starDiv'>★ ★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★★</p>");
					levelData.star[mySigma.map.level] = 2;
				}
			} else if (result == 1) {
				$("#gameContainer").append("<div class='starDiv'>★</div>");
				if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
					$("#level" + mySigma.map.level).empty().append(mySigma.map.level + "<p class='star'>★</p>");
					levelData.star[mySigma.map.level] = 1;
				}
			}
			$(".starDiv").css("font-size", $(".starDiv").width() / 6 + "px");
		} else {
			$("#title").text("You Lose!");
		}
		localStorage.levelData = JSON.stringify(levelData);
		mySigma = null;
	}

	this.eliminate = function() {
		var chosenList = $(".numBoxChoose");
		mySigma.gameStatus = mySigma.GAME_PAUSE;
		var tmpscore = document.getElementsByClassName("numBoxChoose").length;
		chosenList.animate({
			opacity: '0'
		}, "250", function() {
			mySigma.gameStatus = mySigma.GAME_START;
			var chooseArr = document.getElementsByClassName("numBoxChoose");
			for (var i = 0; i < chooseArr.length; i++) {
				$(chooseArr[i]).text(mySigma.map.number[Math.floor(Math.random() * mySigma.map.number.length)]);
			}
			$(".numBoxChoose").addClass("numBox").removeClass("numBoxChoose");
			$("#sum").text("Sum: " + mySigma.setSum());
		});
		chosenList.animate({
			opacity: '1'
		}, "250");

		if (mySigma.userSum == mySigma.sum) {
			mySigma.userScore += tmpscore;
			$("#score").text("Amount: " + mySigma.userScore);
			if (mySigma.userScore >= mySigma.map.goalAmount) {
				if (mySigma.gameModel.time >= mySigma.map.star3) {
					levelData.star[mySigma.map.level] = 3;
					mySigma.gameModel.gameOver(3);
				} else if (mySigma.gameModel.time >= mySigma.map.star2) {
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 2) {
						levelData.star[mySigma.map.level] = 2;
					}
					mySigma.gameModel.gameOver(2);
				} else {
					mySigma.gameModel.gameOver(1);
					if (!levelData.star[mySigma.map.level] || levelData.star[mySigma.map.level] < 1) {
						levelData.star[mySigma.map.level] = 1;
					}
				}
			}
		} else {
			//mySigma.userScore -= mySigma.userSum - mySigma.sum;
			$("#score").text("Amount: " + mySigma.userScore);
		}
		mySigma.userSum = 0;
		mySigma.arrayChoose = [];

	}
}