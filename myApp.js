require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

/** 2) Create a 'Person' Model */
const personSchema = new Schema({
	name : {type:String, required: true},
	age : {type : Number},
	favoriteFoods : {type: [String]}
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	var johnDoe = new Person({name : "John Doe", age:22, favoriteFoods:["pizza", "beer"]});
	johnDoe.save((err,data) => {
		if(err) return console.error(err);
		  done(null, data);
	});
};

var arrayOfPeople = [
  {name: "Dave", age: 12, favoriteFoods: ["milk"]},
  {name: "Kevin", age: 63, favoriteFoods: ["turkey sandwich"]},
  {name: "Alex", age: 104, favoriteFoods: ["candy"]}
];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, people) => {
		if(err) return console.log(err);
		done(null,people);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err,result) => {
		if(err) return console.log(err);
		done(null,result);
	});
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods : food }, (err,result) => {
		if(err) return console.log(err);
		done(null, result);
	});
};



const findPersonById = (personId, done) => {
	Person.findById(personId, (err, person) => {
		if(err) return console.log(err);
		done(null, person)
	});

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
	Person.findById(personId, (err,person) => {
		person.favoriteFoods.push(foodToAdd);
		person.save((err, updatedPerson) => {
			if(err) return console.log(err);
			done(null, updatedPerson)
		})
	})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
	Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};


const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
