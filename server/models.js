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
	phone: Sequelize.STRING,
	isActive: Sequelize.BOOLEAN,
	isHelper: Sequelize.BOOLEAN,
	skill: Sequelize.TEXT,
	experience: Sequelize.TEXT,
	averageRating: Sequelize.INTEGER,
	location: Sequelize.STRING,
	availability: Sequelize.STRING,
	image: Sequelize.STRING,
	preferences: Sequelize.STRING,
	fee: Sequelize.FLOAT,
});

const Booking = sequelize.define('booking', {
	skill: Sequelize.STRING,
	serviceDetails: Sequelize.STRING,
	price: Sequelize.FLOAT,
	location: Sequelize.STRING,
	title: Sequelize.STRING,
});

const Listing = sequelize.define('listing', {
	skill: Sequelize.STRING,
	isActive: Sequelize.BOOLEAN,
	serviceDetails: Sequelize.STRING,
	suggestedPrice: Sequelize.FLOAT,
	location: Sequelize.STRING,
	title: Sequelize.STRING
});

User.hasMany(Listing);
Listing.belongsTo(User);

User.belongsToMany(Booking, { through: 'user_bookings' });
Booking.belongsToMany(User, { through: 'user_bookings' });

User.beforeBulkCreate(async (users, options) => {
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		const passwordDigest = await createHash(user.password);
		user.password = passwordDigest;
	}
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
