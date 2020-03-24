const listingRouter = require('express').Router();
// const { Listing } = require('../models.js'); <- uncomment when Listing model is implemented

// Create
listingRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Read
listingRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Update
listingRouter.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Destroy
listingRouter.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{

		res.json({msg: ``})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

module.exports = {
	listingRouter
}