const listingRouter = require('express').Router();
const { Listing, User } = require('../models.js');
const { passport } = require('../jwtEncrypt.js');

// Create listing
listingRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const {
			skill,
			serviceDetails,
			suggestedPrice,
			location,
			title,
			userId
		} = req.body;
		const listing = await Listing.create({
			skill,
			isActive: true,
			serviceDetails,
			suggestedPrice,
			location,
			title
		});
		const user = await User.findByPk(userId);
		user.addListing(listing);
		res.json(listing)
	} catch (e) {
		res.json({ Error: `${e}` });
	}
});

// Read all listings
listingRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		let listings = await Listing.findAll();
		res.json({ listings })
	} catch (e) {
		res.json({ Error: `${e}` });
	}
});

// Read individual listing
listingRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		let listing = await Listing.findByPk(req.params.id);
		res.json({ listing })
	} catch (e) {
		res.json({ Error: `${e}` });
	}
});

// Update listing
// TODO: Ensure that a user can only update his/her own listings
listingRouter.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		let listing = await Listing.findByPk(req.params.id);
		let { skill, isActive, serviceDetails, suggestedPrice, location } = req.body;
		listing.update({
			skill,
			isActive,
			serviceDetails,
			suggestedPrice,
			location
		});
		listing.save();
		res.json({ msg: `Listing ${listing.skill} updated` });
	} catch (e) {
		res.json({ Error: `${e}` });
	}
});

// Destroy listing
listingRouter.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		let listing = await Listing.findByPk(req.params.id);
		await listing.destroy();
		res.json({ msg: `Listing ${listing.skill} destroyed` });
	} catch (e) {
		res.json({ Error: `${e}` });
	}
});

module.exports = {
	listingRouter
}