
const usersRouter = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');


usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    
    if (!name || !email || !password) {
        return response.status(400).json({ error: 'todos los espacios son requeridos' });
    }

    const UserExist = await user.findOne({ email });

if (UserExist) {
    return response.status(400).json({ error: 'El email ya se encuentra en uso'});
}

    const saltRounds = 10

    const passwordpro = await bcrypt.hash(password, saltRounds);

const newuser = new user({
    name,
    email,
    passwordpro
});

const saveUser = await newuser.save();

const token = jwt.sign({ id: saveUser.id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12h'
});
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

   await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: saveUser.email, // list of receivers
    subject: "Verificacion de Usuario", // Subject line
    html: `<a href="${PAGE_URL}/verify/${saveUser.id}/${token}">Verificar correo electronico</a>`, // html body
  });

   return response.status(201).json('Usuario creado, por favor verifica tu correo');

});

usersRouter.patch('/:id/:token', async (request, response) => {
    try {
    const token = request.params.token;
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await user.findByIdAndUpdate(id, { verificar: true });
    return response.sendStatus(200);
    } catch (error) {
        //firmar el nuevo token
        const id = request.params.id;
        //encontrar el email
        const { email } = await user.findById(id);
        console.log(email);
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '12h'
        });

//enviar el token

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
        
           await transporter.sendMail({
            from: process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: "Verificacion de Usuario", // Subject line
            html: `<a href="${PAGE_URL}/verify/${token}">Verificar correo electronico</a>`, // html body
          });
       return response.status(400).json({error: 'el link ya expiro. Se ha enviado un nuevo link de verificacion.'})
    }
    

});


module.exports = usersRouter;