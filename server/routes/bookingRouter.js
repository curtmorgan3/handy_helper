const bookingRouter = require('express').Router();
// const { Booking } = require('../models.js'); <- uncomment when Booking model is implemented

// Create
bookingRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Read
bookingRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
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

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

module.exports = {
	bookingRouter
}