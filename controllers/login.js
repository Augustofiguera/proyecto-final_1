const loginRouter = require('express').Router();
const user = require('../models/user'); // Nombre del modelo en mayúsculas
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    
    
    const userExist = await user.findOne({ email });
    if (!userExist) {
        return response.status(400).json({ error: 'El email o contraseña es inválido' });
    }

    
    if (!userExist.verificar) { 
        return response.status(400).json({ error: 'Tu email no ha sido verificado' });
    }

    

    const isCorrect = await bcrypt.compare(password, userExist.passwordpro);
    
    if (!isCorrect) {
        return response.status(400).json({ error: 'El email o contraseña es inválido' });
    }

const UserForToken = {
    id: userExist.id
}

const accessToken = jwt.sign({ UserForToken }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

response.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
});

return response.sendStatus(200);

});

module.exports = loginRouter;