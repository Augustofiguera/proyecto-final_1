const personalRouter = require('express').Router();
const user = require('../models/user');
const Personal = require('../models/personal');

personalRouter.get('/', async (request, response) => {
    const Users = request.Users;
    const personals = await Personal.find({ Users: Users.id });
    return response.status(200).json(personals);
});

personalRouter.post('/', async (request, response) => {
    const Users = request.Users;

    const { 
        fullname, 
        cedula, 
        sereal_carnetpatria, 
        fecha_de_ingreso, 
        antiguedad, 
        tipo_del_personal, 
        codigo, 
        cargo_nominal, 
        funciones, 
        turno, 
        fecha_de_nacimiento, 
        edad, 
        estadoCivil, 
        direccion, 
        Municipio, 
        email, 
        telefono, 
        numeroDeHijos, 
        especialidad,
        
    } = request.body;

    const newPersonal = new Personal({
        fullname,
        cedula,
        sereal_carnetpatria,
        fecha_de_ingreso,
        antiguedad,
        tipo_del_personal,
        codigo,
        cargo_nominal,
        funciones,
        turno,
        fecha_de_nacimiento,
        edad,
        estadoCivil,
        direccion,
        Municipio,
        email,
        telefono,
        numeroDeHijos,
        especialidad,
        Users: request.Users._id
        
    });

    
        const savedPersonal = await newPersonal.save();
        // Users.personal = Users.personal.concat(savedPersonal._id);
        // await Users.save();
        return response.status(201).json(savedPersonal);
     
    
});

personalRouter.delete('/:id', async (request, response) => {
    const personalId = request.params.id;
    await Personal.findByIdAndDelete(personalId);
    return response.sendStatus(204);
    
});

personalRouter.put('/:id', async (request, response) => {
    const personalId = request.params.id;
    const updateData = request.body;

    try {
        // Find and update the document
        const updatedPersonal = await Personal.findByIdAndUpdate(
            personalId,
            updateData,
            { new: true } // Option to return the updated document
        );

        if (updatedPersonal) {
            return response.status(200).json(updatedPersonal);
        } else {
            return response.status(404).json({ error: 'Personal not found' });
        }
    } catch (error) {
        console.error(error);
    }
});



personalRouter.get('/:id', async (request, response) => {
    const { fullname, cedula } = request.query;
    const Users = request.Users;

    const query = {
        Users: Users.id
    };

    if (fullname) {
        query.fullname = new RegExp(fullname, 'i'); // Para una búsqueda insensible a mayúsculas y minúsculas
    }

    if (cedula) {
        query.cedula = cedula;
    }

    const personals = await Personal.find(query);
    return response.status(200).json(personals);
});



module.exports = personalRouter;




