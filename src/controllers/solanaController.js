import mongoose from "mongoose";
import { UsersSchema } from "../models/solanaModel";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

const User = mongoose.model("User", UsersSchema);

//Add New User
export const addNewUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.hashKey = bcrypt.hashSync(req.body.key, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hashKey = undefined;
      return res.json(user);
    }
  });
};

//GET all Users
export const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

//GET Specific user by ID
export const getUserByID = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

//Update Specific user Info.
export const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

//Delete Specific user
export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "The User has been deleted Successfully!" });
  });
};


export const requestAuthToken = (req, res) => {
  const wpAdminUserId = req.body.userId
  const signedToken = jwt.sign({userId: wpAdminUserId}, process.env.APP_SECRET)
  res.json(signedToken)
}

function isValidKey(suppliedKey) {
  try {
    const isTrue = jwt.verify(suppliedKey, process.env.APP_SECRET);
    return !!isTrue
  } catch (err) {
    // err
    return false
  }
}

//Verify Plugin
export const isAdminUserRequest = (req, res, next) => {
  const reqAuth = req.headers["authorization"].split("Bearer ")[1];

  if (req.isWpUserReq) {
    return next()
  }

  if (reqAuth && reqAuth === process.env.ADMIN_AUTH_TOKEN) {
    req.isAdminReq = true;
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};
//Verify Plugin
export const isWpUserRequest = (req, res, next) => {
  const reqAuth = req.headers["authorization"].split("Bearer ")[1];

  if (isValidKey(reqAuth)) {
    req.isWpUserReq = true;
    next();
  } else {
    req.isWpUserReq = false;
    next()
  }
};
