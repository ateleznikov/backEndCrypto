const mongoose = require('mongoose');

const favouriteCryptoSchema = new mongoose.Schema({

    id: { type: String, required: true, unique: true},

});

module.exports = mongoose.model('FavouriteCrypto', favouriteCryptoSchema);
