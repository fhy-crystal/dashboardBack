var express = require('express'); // 引入express
var router = express.Router();
var MongoClient = require('mongodb').MongoClient; // 引入mongodb
var URL = require('../config/DBconfig.js'); // 连接到数据库

// 查询数据
var queryData = function(tableName, data, db, callback) {
	//连接到表  
	var collection = db.collection(tableName);
	collection.find(data).toArray(function(err, result) {
		if(err) {
		  console.log('Error:'+ err);
		  return;
		}
		callback(result);
  });
}

// 规范返回格式
var responseJSON = function (res, result) {
	if(typeof res === 'undefined') { 
		res.json({
			status:'-200',
			msg: '操作失败'
		}); 
	} else {
		var finalResult = {
			status: 0,
			msg: '操作成功'
		};
		if (Array.isArray(result)) {
			finalResult.data = result;
		}
		res.json(finalResult);
	}
};


// 查询dnakit
router.get('/queryKit', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('kitActive', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询net
router.get('/queryNet', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('netActive', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询third
router.get('/queryThird', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('thirdActive', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询virtual
router.get('/queryVirtual', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('virtualActive', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询设备信息
router.get('/queryDev', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('devData', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})



// 查询app当年激活数量
router.get('/queryAppByYear', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('appYear', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询app当月激活数量
router.get('/queryAppByMonth', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('appMonth', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询app当日激活数量
router.get('/queryAppByDay', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('appDay', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})


// 查询ios当年激活数量
router.get('/queryiosByYear', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('iosYear', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询ios当月激活数量
router.get('/queryiosByMonth', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('iosMonth', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})

// 查询ios当日激活数量
router.get('/queryiosByDay', function(req, res) {
	// 调用mongo查询数据方法
	MongoClient.connect(URL, function(err, db) {
		console.log('查询连接成功');
		queryData('iosDay', {}, db, function(result) {
			responseJSON(res, result);
			db.close();
		})
	})
})


module.exports = router;