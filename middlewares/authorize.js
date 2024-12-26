const jwt = require('jsonwebtoken');
 

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {

    console.log('Req',req)
  const token = req.headers.token // Assuming "Bearer <token>"
console.log('token',token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request for use in the route
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};



module.exports ={authenticateToken}