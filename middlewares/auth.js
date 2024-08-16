import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(400).json({ message: "Authentication failed" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}

export function restrictTo(roles = []) {
    return function (req, res, next) {
        if(!req.user) return res.status(400).json({ message: "Authorization failed" });

        if(!roles.includes(req.user.role))
            return res.status(403).json({ message: "UnAuthorized" });

        return next();
    }
}