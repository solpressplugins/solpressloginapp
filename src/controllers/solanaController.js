import mongoose from "mongoose";
import { UsersSchema } from "../models/solanaModel";
import bcrypt from "bcrypt"


const User = mongoose.model('User', UsersSchema)

//Add New User
export const addNewUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.hashKey = bcrypt.hashSync(req.body.key, 10)
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            user.hashKey = undefined;
            return res.json(user);
        }
    })
}

//GET all Users
export const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    })
}

//GET Specific user by ID
export const getUserByID = (req, res) => {
    User.findById(req.params.userID, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}

//Update Specific user Info.
export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}

//Delete Specific user
export const deleteUser = (req, res) => {
    User.remove({ _id: req.params.userID }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "The User has been deleted Successfully!" });
    })
}

//Verify Plugin
export const verifyPlugin = (req, res, next) => {
    if (req.body.key && req.body.key === process.env.KEY) {
        next()
    } else {
        return res.status(401).json({ message: "Unauthorized user!" })
    }
}

