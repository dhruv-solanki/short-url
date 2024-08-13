import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
});

export async function signUp(req, res) {
    const { error, value } = userSchema.validate(req.body);
    if(error) return res.status(403).json({ message: "Invalid user values" });

    // check if user already exist
    const existingUser = await User.findOne({ email: value.email });
    if(existingUser) {
        res.status(400).json({ message: "Email already exist" });
    }

    // encrypt user password
    value.password = await bcrypt.hash(value.password, 10);
    await User.create(value);

    return res.status(201).json({ message: "User created successfully" });
}

export async function logIn(req, res) {
    const { email, password } = req.body;

    // check if email is valid from DB
    const user = await User.findOne({ email: email });
    if(!user) res.status(401).json({ message: "Invalid email" });

    // check if password matches with DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) res.status(401).json({ message: "Invalid password" });

    // create a new JWT token and send it in response
    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token: token });
}