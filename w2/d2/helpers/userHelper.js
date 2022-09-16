const { genSalt, hash } = require("bcrypt");

const hashPassword = (password) => {
    const salt = await genSalt(12)
    const hashedPassword = await hash(password, salt);
    return hashedPassword
}

module.exports = {hashPassword}