const { User, Listing } = require('./models.js');

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

async function createListing(){
	await Listing.destroy({where: {} });
	await Listing.create({
		skill: 'plumber',
		isActive: true,
		serviceDetails: 'bathroom sink is clogged',
		suggestedPrice: 80.00,
		location: 'Brooklyn, NY',
	})
};


async function seed(){
	try{
		await createUser();
		await createListing();
	}catch(e){
		console.error(e);
	}
	process.exit();
};

seed();
