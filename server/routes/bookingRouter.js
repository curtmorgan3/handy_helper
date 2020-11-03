const bookingRouter = require('express').Router();
const { Booking, User } = require('../models.js');
const { passport } = require('../jwtEncrypt.js');

// Create
bookingRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		const { user } = req;
		const { 
			skill,
			serviceDetails,
			suggestedPrice: price,
			location,
			title,
			customer: customerId
		} = req.body;
		const details = { skill, serviceDetails, price, location, title };

		const booking = await Booking.create(details);

		const customer = await User.findByPk(customerId);

		customer.addBooking(booking);
		user.addBooking(booking);

		res.json(booking)
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Read
bookingRouter.get('/my-bookings', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		const { user } = req;

		const bookings = await user.getBookings();

		res.json(bookings)

	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Read
bookingRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Update
bookingRouter.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Destroy
bookingRouter.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		const booking = await Booking.findByPk(req.params.id);
		await booking.destroy();

		res.json({msg: `booking deleted`})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

module.exports = {
	bookingRouter
}