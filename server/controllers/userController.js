const User = require('../models/userModel');
const bcrypt = require('bcryptjs')

exports.user = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.userById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const insertUser = await user.save();
        res.status(201).json(insertUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        if (password) {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            rest.password = hashedPassword;
        }

        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            { $set: rest }
        );
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({_id:req.params.id}) ;
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}