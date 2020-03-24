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
	User
}
