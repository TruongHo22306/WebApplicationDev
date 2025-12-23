import User from '../models/User.js'; // Extension is required
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { first, last, email, password, phone } = req.body;
        console.log("Registration attempt for:", email); // ADD THIS LINE

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ first, last, email, password: hashedPassword, phone });
        
        const savedUser = await user.save(); // Capture the saved object
        console.log("User successfully saved to Atlas:", savedUser._id); // ADD THIS LINE

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, first, email } });
    } catch (err) {
        console.error("Save Error:", err.message); // ADD THIS LINE
        res.status(500).send("Server Error");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, first: user.first, email: user.email } });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};