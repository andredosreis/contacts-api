const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // email único evita duplicidade
  favoriteColor: { type: String, required: true },
  birthday: { type: Date, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);

