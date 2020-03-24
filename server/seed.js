const { User } = require('./models.js');

// Sample data used for testing and development only
async function createUser(){
	await User.destroy({where: {} });
	await User.create({
		email: 'sampleuser@sample.com',
		password: 'password',
		firstName: 'Joe',
		lastName: 'Sample',
		phone: 0,
		isActive: true,
		isHelper: false,
		skill: 'plumber',
		averageRating: 0,
		location: 'New York City, NY'
	})
};


async function seed(){
	try{
		await createUser();
	}catch(e){
		console.error(e);
	}
	process.exit();
};

seed();
