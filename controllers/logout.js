const logoutRouter = require('express').Router();

logoutRouter.delete('/', async (request, response) => {
    const token = request.cookies.accessToken;
    if (!token) {
        return response.sendStatus(401); // No hay token, no autorizado
    }

    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        // Agrega aquí el dominio y la ruta de la cookie si es necesario
    });

    return response.sendStatus(204); // Éxito, sin contenido
});

module.exports = logoutRouter;

