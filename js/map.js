var map=[
	{
		gameModel:'eternalGame',//游戏模式
		width: 5,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:50,//初始时间
		amount:4,//选多少个数字,
		text:"Get as more scores as possible",
	},{
		level:1,
		gameModel:'timeCorrectGame',//游戏模式
		width: 3,//盘面宽度
		number:[2,3,4,5],
		time:80,//初始时间
		amount:3,//选多少个数字
		goalCorrect: 3,//目标分数
		star2:20,
		star3:40,
		text:"Get 3 correct results in 80 seconds"
	},{
		level:2,
		gameModel:'timeScoreGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5],
		time:75,//初始时间
		amount:3,//选多少个数字
		goalScore: 35,//目标分数
		star2:20,
		star3:40,
		text:"Get at least 50 scores in 75 seconds"
	},{
		level:3,
		gameModel:'timeCorrectGame',//游戏模式
		width: 3,//盘面宽度
		number:[2,3,4,5],
		time:90,//初始时间
		amount:3,//选多少个数字
		goalCorrect: 5,//目标分数
		star2:20,
		star3:40,
		text:"Get 5 correct results in 80 seconds"
	},{
		level:4,
		gameModel:'timeScoreGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5],
		time:80,//初始时间
		amount:3,//选多少个数字
		goalScore: 50,//目标分数
		star2:20,
		star3:40,
		text:"Get at least 50 scores in 80 seconds"
	},{
		level:5,
		gameModel:'timeNumberGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,2,3,4,2],
		time:80,//初始时间
		amount:3,//选多少个数字
		goalTimes: 5,//消除数量
		target: 2,//目标数字
		star2:20,
		star3:40,
		text:"Eliminate '2' at least 5 times in 80 seconds"
	},{
		level:6,
		gameModel:'timeCorrectGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5,6],
		time:95,//初始时间
		amount:3,//选多少个数字
		goalCorrect: 8,//消除数量
		star2:20,
		star3:40,
		text:"Get 8 correct results in 95 seconds"
	},{
		level:7,
		gameModel:'timeCorrectGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5,6],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 8,//消除数量
		star2:15,
		star3:30,
		text:"Get 8 correct results in 100 seconds"
	},{
		level:8,
		gameModel:'timeCorrectGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 8,//消除数量
		star2:15,
		star3:30,
		text:"Get 8 correct results in 100 seconds"
	},{
		level:9,
		gameModel:'timeCorrectGame',//游戏模式
		width: 4,//盘面宽度
		number:[2,3,4,5,6,7,8],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 8,//消除数量
		star2:15,
		star3:35,
		text:"Get 8 correct results in 95 seconds"
	},{
		level:10,
		gameModel:'timeCorrectGame',//游戏模式
		width: 5,//盘面宽度
		number:[1,3,5,7,9],
		time:95,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 8,//消除数量
		star2:15,
		star3:35,
		text:"Get 8 correct results in 95 seconds"
	},{
		level:11,
		gameModel:'timeScoreGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,2,3,4,5,6,7],
		time:80,//初始时间
		amount:3,//选多少个数字
		goalScore: 65,//目标分数
		star2:20,
		star3:40,
		text:"Get at least 65 scores in 80 seconds"
	},{
		level:12,
		gameModel:'timeScoreGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:85,//初始时间
		amount:3,//选多少个数字
		goalScore: 75,//目标分数
		star2:15,
		star3:35,
		text:"Get at least 75 scores in 85 seconds"
	},{
		level:13,
		gameModel:'timeScoreGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:90,//初始时间
		amount:4,//选多少个数字
		goalScore: 75,//目标分数
		star2:15,
		star3:35,
		text:"Get at least 75 scores in 90 seconds"
	},{
		level:14,
		gameModel:'timeScoreGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalScore: 90,//目标分数
		star2:20,
		star3:40,
		text:"Get at least 90 scores in 100 seconds"
	},{
		level:15,
		gameModel:'timeNumberGame',//游戏模式
		width: 3,//盘面宽度
		number:[1,3,4,5,6,4,7,3],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalTimes: 10,//消除数量
		target: 4,//目标数字
		star2:20,
		star3:45,
		text:"Eliminate '4' at least 10 times in 100 seconds"
	},{
		level:16,
		gameModel:'timeNumberGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,3,4,5,6,4,7,3],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalTimes: 10,//消除数量
		target: 4,//目标数字
		star2:20,
		star3:45,
		text:"Eliminate '4' at least 10 times in 100 seconds"
	},{
		level:17,
		gameModel:'timeNumberGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,3,4,5,6,2,7],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalTimes: 10,//消除数量
		target: 7,//目标数字
		star2:20,
		star3:45,
		text:"Eliminate '7' at least 10 times in 100 seconds"
	},{
		level:18,
		gameModel:'timeAmountGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,2,3,4,5],
		time:85,//初始时间
		amount:3,//选多少个数字
		goalAmount: 20,//消除数量
		star2:15,
		star3:35,
		text:"Eliminate at least 20 numbers in 85 seconds"
	},{
		level:19,
		gameModel:'timeAmountGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,3,5,7,9],
		time:90,//初始时间
		amount:3,//选多少个数字
		goalAmount: 20,//消除数量
		star2:15,
		star3:35,
		text:"Eliminate at least 20 numbers in 90 seconds"
	},{
		level:20,
		gameModel:'timeAmountGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,3,5,7,9],
		time:90,//初始时间
		amount:3,//选多少个数字
		goalAmount: 20,//消除数量
		star2:15,
		star3:35,
		text:"Eliminate at least 20 numbers in 90 seconds"
	},{
		level:21,
		gameModel:'timeCorrectGame',//游戏模式
		width: 4,//盘面宽度
		number:[2,4,6,8],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 10,//目标分数
		star2:20,
		star3:40,
		text:"Get 10 correct results in 100 seconds"
	},{
		level:22,
		gameModel:'timeCorrectGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,3,5,7,9],
		time:100,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 10,//目标分数
		star2:20,
		star3:40,
		text:"Get 10 correct results in 100 seconds"
	},{
		level:23,
		gameModel:'timeCorrectGame',//游戏模式
		width: 4,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:120,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 12,//目标分数
		star2:20,
		star3:40,
		text:"Get 3 correct results in 120 seconds"
	},{
		level:24,
		gameModel:'timeCorrectGame',//游戏模式
		width: 5,//盘面宽度
		number:[1,2,3,4,5,6,7,8,9],
		time:120,//初始时间
		amount:4,//选多少个数字
		goalCorrect: 3,//目标分数
		star2:20,
		star3:45,
		text:"Get 3 correct results in 120 seconds"
	}
]
