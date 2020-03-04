const userRouter = require('express').Router();
const { User } = require('../models.js');
const { compare } = require('../passwordEncrypt.js');
const { sign, passport } = require('../jwtEncrypt.js');

// Create User
userRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try{
		let { username, password } = req.body;
		let user = await User.create({
			username,
			password
		})
		res.json({msg: `User ${username} created.`})
	}catch (e){
		res.json({Error: `${e}`});
	}
});

// Get User by Username passed in body
userRouter.get('/', async (req, res)=>{
	try{
		let { username } = req.body;
		let user = await User.findOne({
			where: {
				username
			}
		});
		res.json({user})
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Get User by ID passed in params
userRouter.get('/:id', async (req, res)=>{
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
		let { username, password } = req.body;
		user.update({
			username,
			password
		});
		user.save();
		res.json({msg: `User ${user.username} updated`});
	}catch(e){
		res.json({Error: `${e}`})
	}
});

// Delete User
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
		const { username, password } = req.body;
		const user = await User.findOne({where: {username}});
		const isValid = await compare(password, user.password);
		if(isValid){
			const token = sign({
				id: user.id,
				username: user.username,
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
