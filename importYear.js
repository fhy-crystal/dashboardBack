var MongoClient = require('mongodb').MongoClient; // 引入mongodb
var lineReader = require('line-reader');
var URL = 'mongodb://42.159.144.80:12345/dashboardDB'; // 连接到数据库

MongoClient.connect(URL, function(err, db) {
	if (!err) {
		// 先删除表格,防止重复写入
		db.collection('appYear').drop();

		lineReader.eachLine('appYear.csv', function(line, last) {
			var attrName = ['id', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
			var finalObj = {};
			finalObj[attrName[0]] = Number(line.split(",")[0]);
			finalObj['data'] = [];
			for (var i = 1; i < attrName.length; i++) {
				finalObj['data'].push(Number(line.split(",")[i]));
			}
			// console.log(finalObj);
			// 表头不插入
			if (!Number.isNaN(finalObj[attrName[0]])) {
				db.collection('appYear').insert(finalObj, function(err, result) {
					if (!err) {
						console.log('insert successful');
					}
				})
			}
			
		})
	}
})