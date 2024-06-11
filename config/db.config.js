const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // eslint-disable-next-line no-undef
    url: process.env.DATABASE_URL,
};

