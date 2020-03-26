const { User, Listing, Booking } = require('./models.js');

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

async function createBooking(){
	await Booking.destroy({where: {} });
	await Booking.create({
		skill: 'dishwasher repair',
		serviceDetails: 'water is not running, bad smell is coming from dishwasher',
		price: 170.00,
		location: 'Queens, NY'
	})
};


async function seed(){
	try{
		await createUser();
		await createListing();
		await createBooking();
	}catch(e){
		console.error(e);
	}
	process.exit();
};

seed();
