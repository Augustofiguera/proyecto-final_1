const jwt = require('jsonwebtoken');
const user = require('../models/user'); 

const userExtractor = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.sendStatus(401); 
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const Users = await user.findById(decoded.UserForToken.id);
        request.Users = Users; 
        console.log(Users);
    } catch (error) {
       return response.sendStatus(403);
    }
    next(); 
};

module.exports = { userExtractor };