const crypto = require("crypto");

exports.makeId = () => {
    return crypto.randomBytes(20).toString('hex');
}