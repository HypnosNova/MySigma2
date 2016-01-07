var storage = window.localStorage;
var hightestScore = storage.hightestScore; //最高分
var levelData = storage.levelData; //游戏关卡信息
if (!levelData) {
	levelData = {
		level: 1,//解锁关卡数
		star:[0],
	};
	for(var i=0;i<200;i++){
		levelData.level.push(0);
	}
} else {
	levelData = JSON.parse(levelData);
}
var hasOldGame = storage.hasOldGame; //先前进行一般就推出的游戏
var savedGameData = {};
if (hasOldGame && hasOldGame == "true") {
	savedGameData = localStorage.savedGameInfo;
}