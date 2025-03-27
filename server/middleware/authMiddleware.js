import jwt from 'jsonwebtoken';

export const authenticateUser = (roles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no token' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ 
          success: false,
          message: 'Not authorized for this resource' 
        });
      }
      
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, token failed' 
      });
    }
  };
};

export const checkAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  req.isAuthenticated = !!token;
  next();
}; 