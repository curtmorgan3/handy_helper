const Sequelize = require('sequelize');
const { createHash } = require('./passwordEncrypt.js');
const DATABASE_NAME = "";

const sequelize = new Sequelize({
	database: DATABASE_NAME,
	dialect: 'postgres',
	operatorsAliases: false,
	define: {
		underscored: true
	},
});

const User = sequelize.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING
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
