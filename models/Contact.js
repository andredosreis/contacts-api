const mongoose = require('mongoose');

// Definindo o modelo de dados para o contato (schema) objeto
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: Date, required: true }
});
module.exports = mongoose.model('Contact', contactSchema);