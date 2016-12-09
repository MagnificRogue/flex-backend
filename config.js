var config = {};

config.mysql= {};

config.mysql.host =  process.env.MYSQL_HOST || 'localhost';
config.mysql.user = process.env.MYSQL_USER || 'root';
config.mysql.password = process.env.MYSQL_PASSWORD || 'password';
config.mysql.database = process.env.MYSQL_DATABASE || 'hats';

module.exports = config;
