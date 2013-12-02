
// database connect function for heroku
var mongo = require("mongodb");
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  "mongodb://localhost/mydb"; 
var db;
// define database connection function 
var connect = function(){
	// Connect to database if we haven"t already
	if(!db){
		mongo.Db.connect(mongoUri,function(err,myDB){
			if(err) console.log(err);
			else db = myDB;
			insertStores();
		})
	}else{
		console.log("we are already connected");
	}
	// insert our hard coded list of apps into the database
	// return database object
	return db;
}
db=connect();
/*
var mongo = require("mongodb");
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db;

// define database connection function 
var connect = function(){
	// Connect to database if we haven"t already
	if(!db){
		var db = new mongo.Db("MPAshop", new mongo.Server(host,port),{safe:true});
		db.open(function(error){
			if(error)console.log(error);
			else{
				console.log("we connected to the database");
				console.log("checking for empty database");
				insertStores();
			}
		});
	}else{
		console.log("we are already connected");
	}

	// return database object
	return db;
}
db= connect();
*/
var insertStores = function(){
	var Asos = {
		name: "Asos",
		type: "both",
		links: [{ name: "women-all",link: "http://asos.com/Women"},
				{ name: "women-footwear",link: "http://asos.com/Women"},
				{ name: "women-accessories",link: "http://asos.com/Women"},
				{ name: "women-bottomwear",link: "http://asos.com/Women"},
				{ name: "women-topwear",link: "http://asos.com/Women"},
				{ name: "women-outerwear",link: "http://asos.com/Women"},
				{ name: "men-all",link: "http://asos.com/men"},
				{ name: "men-outerwear",link: "http://asos.com/men"},
				{ name: "men-footwear",link: "http://asos.com/men"},
				{ name: "men-topwear",link: "http://asos.com/men"},
				{ name: "men-bottomwear",link: "http://asos.com/men"},
				{ name: "men-accessories",link: "http://asos.com/men"}
			],
		image: "images/asos-logo.png"
	};
	var Nastygal = {
		name: "Nastygal",
		type: "women",
		links: [{ name: "women-all",link: "http://nastygal.com"},
				{ name: "women-footwear",link: "http://nastygal.com/shoes/"},
				{ name: "women-accessories",link: "http://nastygal.com/accessories"},
				{ name: "women-bottomwear",link: "http://nastygal.com/clothes-bottoms"},
				{ name: "women-topwear",link: "http://nastygal.com/clothes-tops/"},
				{ name: "women-outerwear",link: "http://nastygal.com/clothes-outerwear/"}
			],

		image: "images/nastygal-logo.png"
		
	};
	var mrporter = {
		name: "MrPorter",
		type: "men",
		links: [{ name: "men-all",link: "http://mrporter.com"},
				{ name: "men-footwear",link: "http://mrporter.com/Shop/Shoes"},
				{ name: "men-accessories",link: "http://mrporter.com/Shop/Accessories"},
				{ name: "men-bottomwear",link: "http://nastygal.com/clothes-bottoms"},
				{ name: "men-topwear",link: "http://mrporter.com/Shop/Clothing"},
				{ name: "men-outerwear",link: "http://mrporter.com/Shop/Clothing/Jeans"}
			],
		image:"images/mrporter-logo.png"
	};
	var storesArray = [];
	storesArray.push(Asos);
	storesArray.push(Nastygal);
	storesArray.push(mrporter);

	db.collection("stores",function(error,collection){
		if(error) console.log(error);
		else console.log("we have the collection");
		collection.find().count(function(error,count){
			console.log('checking  if need to insert');
			if(count == 0){
				console.log(' empty database');
				collection.insert(storesArray,function(error){
					if(error) console.log(error);
				});
			}
		});
		
	});
}

exports.getStores = function (callback){
	db.collection("stores",function(error,collection){  
		collection.find(function(error,cursor){
			cursor.toArray(function(error,list){
				callback(list);
			});
		});
	});
};
