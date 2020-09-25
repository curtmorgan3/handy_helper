const userRouter = require('express').Router();
const { User } = require('../models.js');
const { compare } = require('../passwordEncrypt.js');
const { sign, passport } = require('../jwtEncrypt.js');

// Create User
userRouter.post('/', async (req, res) => {
	try{
		let {
			email,
			password,
			firstName,
			lastName,
			phone,
			isHelper,
			location
		} = req.body;

		const existingUser = await User.findOne({where: {email }});
		if (existingUser) {
			throw Error('Email already registered')
		}

		let user = await User.create({
			email,
			password,
			firstName,
			lastName,
			phone,
			isActive:  true,
			isHelper,
			averageRating: 0,
			location
		})
		res.json({user})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Get Current User 
userRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res)=>{
	try{
		const { user } = req;
		
		res.json({user})
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Get User by ID passed in params
userRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res)=>{
	try{
		let user = await User.findByPk(req.params.id);
		res.json({user})
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Update Curret User
userRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		let { user } = req;
		let { email, password, firstName, lastName, skill, experience, location, phone, isActive, availability, image, preferences } = req.body;
		user.update({
			email,
			password,
			firstName,
			lastName,
			skill,
			experience,
			location,
			phone,
			isActive,
			availability,
			image,
			preferences
		});
		user.save();
		res.json({user, msg: `User ${user.email} updated`});
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Delete Current User
userRouter.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		const user = await User.findOne({where: {id: req.user.id}});
		await user.destroy();
		res.json({msg: `User ${user.username} destroyed.`})
	}catch (e){
		res.json({Error: `${e}`})
	}
});

// User Login
userRouter.post('/login', async (req, res) => {
	try{
		const { email, password } = req.body;
		const user = await User.findOne({where: {email}});
		const isValid = await compare(password, user.password);
		if (isValid){
			const token = sign({
				id: user.id,
				email: user.email,
			});
			res.json({ user, token });
		}else{
			res.json({msg: 'Invalid Credentials'})
		}
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Search Users by Skill
userRouter.post('/search', async (req, res) => {
	try{
		/*
			We need to do a DB lookup of all users whose skill includes a given string.
			Try something like this --

			const users = await User.findAll({
				where: {
					skill: sequelize.where(sequelize.fn('LOWER', sequelize.col('skill')), 'LIKE', '%' + query + '%')
				}
    	});
		*/
	}catch(e){
		res.json({Error: `${e}`})
	}
});

module.exports = {
	userRouter
}
