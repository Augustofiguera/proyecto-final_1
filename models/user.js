const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordpro: String,
    verificar: {
        type: Boolean,
        default: false
    },
    personal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'personal'
    }
});



userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordpro;
  }
});

const user = mongoose.model('user', userSchema);

module.exports = user;
