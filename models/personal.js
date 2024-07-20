const mongoose = require('mongoose');


const personalSchema = new mongoose.Schema({
    fullname: String,
    cedula: String,
    sereal_carnetpatria: String,
    fecha_de_ingreso: String,
    antiguedad: String,
    tipo_del_personal: String,
    codigo: String,
    cargo_nominal: String,
    funciones: String,
    turno: String,
    fecha_de_nacimiento: String,
    edad: String,
    estadoCivil: String,
    direccion: String,
    Municipio: String,
    email: String,
    telefono: String,
    numeroDeHijos: String,
    especialidad: String,
    Users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
});


personalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    
  }
});

const personal = mongoose.model('personal', personalSchema);

module.exports = personal;
