import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(400).json({ message: "Authorization failed" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}