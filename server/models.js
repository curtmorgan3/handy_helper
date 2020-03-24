const Sequelize = require('sequelize');
const { createHash } = require('./passwordEncrypt.js');
const DATABASE_NAME = "handy_helper_db";

const sequelize = new Sequelize({
	database: DATABASE_NAME,
	dialect: 'postgres',
	operatorsAliases: false,
	define: {
		underscored: true
	},
});

const User = sequelize.define('user', {
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING,
	phone: Sequelize.INTEGER,
	isActive: Sequelize.BOOLEAN,
	isHelper: Sequelize.BOOLEAN,
	skill: Sequelize.STRING,
	averageRating: Sequelize.INTERGER,
	location: Sequelize.STRING
});

const Booking = sequelize.define('booking', {
	helperId: Sequelize.STRING,
	clientId: Sequelize.STRING,
	skill: Sequelize.STRING,
	created: Sequelize.INTEGER,
	serviceDetails: Sequelize.STRING,
	price: Sequelize.FLOAT,
	location: Sequelize.String,
});

const Listing = sequelize.define('booking', {
	clientId: Sequelize.STRING,
	skill: Sequelize.STRING,
	created: Sequelize.STRING,
	active: Sequelize.BOOLEAN,
	serviceDetails: Sequelize.BOOLEAN,
	suggestedPrice: Sequelize.FLOAT,
	location: Sequelize.String,
});


User.beforeCreate(async (user, options) => {
	const passwordDigest = await createHash(user.password);
	user.password = passwordDigest;
});
User.beforeUpdate(async (user, options) => {
	if (options.fields.includes('password')) {
		const passwordDigest = await createHash(user.password);
		user.password = passwordDigest;
	}
});


module.exports = {
	sequelize,
	User,
	Booking,
	Listing
}
