
/**
 * Reads the `.env` file for the USER='' and PASS='' values
 * For MongoDB Atlas access
 */

const dotenv = require('dotenv');

const getUser = () => {
    return dotenv.config().parsed.USER;
}

const getPass = () => {
    return dotenv.config().parsed.PASS;
}

module.exports = {getUser, getPass};