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
			skill,
			location
		} = req.body;
		let user = await User.create({
			email,
			password,
			firstName,
			lastName,
			phone,
			isActive:  true,
			isHelper,
			skill,
			averageRating: 0,
			location
		})
		res.json({msg: `User ${user.email} created.`})
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
		let { email, password, firstName, lastName, skill, location, phone } = req.body;
		user.update({
			email,
			password,
			firstName,
			lastName,
			skill,
			location,
			phone
		});
		user.save();
		res.json({msg: `User ${user.email} updated`});
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Delete Current User
userRouter.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		let user = await User.findOne({where: {id: req.body.id}});
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

module.exports = {
	userRouter
}
