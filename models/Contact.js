const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  favoriteColor: { type: String, required: true, trim: true },
  birthday: { type: Date, required: true }
});

// Add indexes for faster queries
contactSchema.index({ firstName: 1 });
contactSchema.index({ lastName: 1 });
contactSchema.index({ email: 1 });


module.exports = mongoose.model('Contact', contactSchema);
