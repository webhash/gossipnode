var mongoose = require('mongoose');
var fake = require('faker');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;

var updatesSchema = new mongoose.Schema({
	season : Number,
	episode : Number,
	release : Date,
	title : String,
	cast : [String]},
	{
		capped: { size: 10000000, autoIndexId: true }
	}
);

var Updates = mongoose.model('Updates', updatesSchema);

db.on('error', console.error);

db.on('data', function(document) {
	console.log('Data Recieved')
});
db.once('open', function(){
	console.log("Connected to DB");
});

var fakeUpdate = new Updates({
	'season' : 1,
	'episode' : 1,
	'release' : fake.date.recent(),
	'title' : fake.lorem.words(),
	'cast' : [fake.lorem.word(), fake.lorem.word(), fake.lorem.word(), fake.lorem.word() ]
});

fakeUpdate.save(function(err){
	if (err) throw err;
	console.log('fake data added')
})

module.exports = Updates;