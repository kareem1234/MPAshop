var db = require("../database.js");


exports.index = function(req, res){
	db.getStores(function(stores){
		res.render('index',{Stores:stores});
	});
};

exports.frame = function(req,res){
	res.render('frame',{frameSrc: req.body.store.link});
};