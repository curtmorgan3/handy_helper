const { User, Listing, Booking } = require('./models.js');

// Sample data used for testing and development only
async function createUser(){
	await User.destroy({where: {} });
	await User.create({
		email: 'curtmorgan3@gmail.com',
		password: 'password',
		firstName: 'Curt',
		lastName: 'Morgan',
		phone: '999-999-9999',
		isActive: true,
		isHelper: false,
		skill: '',
		averageRating: 0,
		location: 'Seattle, WA'
	})
};

async function createFakeHelpers(){
	await User.bulkCreate([
		{
			email: 'helper1@gmail.com',
			password: 'password',
			firstName: 'Joe',
			lastName: 'Helper',
			phone: '999-999-9999',
			isActive: true,
			isHelper: true,
			skill: 'electrician',
			averageRating: 0,
			fee: 50.0,
			location: 'Seattle, WA',
			availability: '{"Mon":true,"Tues":false,"Wed":true,"Thurs":true,"Fri":false,"Sat":false,"Sun":true}',
			image: 'https://images.ctfassets.net/r6ek15msiuv1/1ZCq2LZXgm6Xu9TDpNcezW/20b71993b3ed1cdd572ba2a0d24aa058/electrician-requirements-state.jpg',
		},
		{
			email: 'helper2@gmail.com',
			password: 'password',
			firstName: 'Jane',
			lastName: 'Helper',
			phone: '999-999-9999',
			isActive: true,
			isHelper: true,
			skill: 'plumber, Carpenter',
			averageRating: 0,
			fee: 99.5,
			location: 'Seattle, WA',
			availability: '{"Mon":true,"Tues":false,"Wed":true,"Thurs":true,"Fri":false,"Sat":true,"Sun":false}',
			image: 'https://www.nj.com/resizer/409Xx92tbn63vR-SDZtKLY4HLJA=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/centraljersey_impact/photo/photo---brittany-using-her-carpentry-tooljpg-fae9f0b3396abdb3.jpg'
		},
		{
			email: 'helper3@gmail.com',
			password: 'password',
			firstName: 'Bill',
			lastName: 'Helper',
			phone: '999-999-9999',
			isActive: true,
			isHelper: true,
			skill: 'carpenter',
			averageRating: 0,
			fee: 15.0,
			location: 'Seattle, WA',
			availability: '{"Mon":true,"Tues":true,"Wed":true,"Thurs":true,"Fri":false,"Sat":true,"Sun":false}',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxqnEyorQwMUgkolWUIyzZ5Q-XT1z1umbyzw&usqp=CAU'
		},
		{
			email: 'helper4@gmail.com',
			password: 'password',
			firstName: 'Lydia',
			lastName: 'Helper',
			phone: '999-999-9999',
			isActive: true,
			isHelper: true,
			skill: 'electrician, mechanic',
			averageRating: 0,
			fee: 25.75,
			location: 'Seattle, WA',
			availability: '{"Mon":false,"Tues":false,"Wed":false,"Thurs":false,"Fri":true,"Sat":true,"Sun":true}',
			image: 'https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg'
		},
		{
			email: 'helper5@gmail.com',
			password: 'password',
			firstName: 'Joel',
			lastName: 'Helper',
			phone: '999-999-9999',
			isActive: true,
			isHelper: true,
			skill: 'carpenter, mechanic',
			averageRating: 0,
			fee: 30.5,
			location: 'Seattle, WA',
			availability: '{"Mon":true,"Tues":true,"Wed":true,"Thurs":false,"Fri":false,"Sat":false,"Sun":false}',
			image: 'https://www.trade-schools.net/graphics/become-an-electrician-1-fb.png'
		},
	]);
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
		await createFakeHelpers();
		await createListing();
		await createBooking();
	}catch(e){
		console.error(e);
	}
	process.exit();
};

seed();
