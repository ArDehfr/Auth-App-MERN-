const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const createError = require('../utils/appError');

//Register
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError('User already exists', 400));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        //Assign JWT
        const token = jwt.sign({_id: newUser._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'Success',
            message: 'User Registered Successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    }catch (error) {
        next(error);
    }
};

//Login
exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne ({email});

        if (!user) {
            return next(new createError('User Not Found', 404))
        };

        const IsPasswordValid = await bcrypt.compare(password, user.password);

        if(!IsPasswordValid) {
            return next(new createError('Invalid Email or Password', 401))
        };

        //Assign JWT
        const token = jwt.sign({_id: User._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'Success',
            message: 'Logged in Successfully',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        next(error);
    }
};