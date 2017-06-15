var MongoClient = require('mongodb').MongoClient; // 引入mongodb
var lineReader = require('line-reader');
var URL = 'mongodb://42.159.144.80:12345/dashboardDB'; // 连接到数据库

MongoClient.connect(URL, function(err, db) {
	if (!err) {
		// 先删除表格,防止重复写入
		db.collection('kitActive').drop();

		lineReader.eachLine('kitdata.csv', function(line, last) {
			var attrName = ['id', 'todayActive', 'curMonActive', 'totalActive', 'yearTotalActive', 'monActive'];
			var finalObj = {};
			// 处理'id', 'todayActive', 'curMonActive', 'totalActive', 'yearTotalActive'
			for (var i = 0; i < attrName.length-1; i++) {
				finalObj[attrName[i]] = Number(line.split(",")[i]);
			}

			// 处理monActive
			var monActiveArray = [];
			var monActiveSplit = line.split(",")[attrName.length-1].split('/');
			for (var i = 0; i < monActiveSplit.length; i++) {
				monActiveArray.push(Number(monActiveSplit[i]));
			}
			finalObj[attrName[attrName.length-1]] = monActiveArray;

			// 表头不插入
			if (!Number.isNaN(finalObj[attrName[0]])) {
				db.collection('kitActive').insert(finalObj, function(err, result) {
					if (!err) {
						console.log('insert successful');
					}
				})
			}
			
		})
	}
})