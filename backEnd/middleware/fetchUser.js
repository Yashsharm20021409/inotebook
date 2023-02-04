var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ThisIsOurTo$ken'

const fetchUser = (req, res, next) => {
    // get the user from jwt token and add id to req object
    //requesting for the authToken
    const token = req.header('auth-token')

    // if token not exists
    if (!token) {
        res.status(401).send({ error: 'please authenticate using the valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'please authenticate using the valid token' })
    }
}

module.exports = fetchUser;