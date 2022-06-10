/*
  IMPORT MODULE JWT, BCRYPT, USER MODELS
*/
const Users = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register function
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Email is already taken!",
        });
        return;
      }
    });

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Registration Successful!" });
  } catch (error) {
    res.status(500).json({ msg: "Registration Error!" });
  }
};

// login function
exports.login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, msg: "Login successful" });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

// success login
exports.home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Hallo! Welcome to Studu App" });
  } catch (error) {
    res.status(500).json({ msg: "Error!" });
  }
};

// get user data by ID from database
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["name", "email", "gender", "date_of_birth", "phone_number"],
    });
    const data = user[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Cannot find user!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving user!" });
  }
};

// update data profile user
exports.updateUser = async (req, res) => {
  try {
    await Users.update(req.body, {
      where: {
        id: req.params.id,
      },
      attributes: ["name", "email", "gender", "date_of_birth", "phone_number"],
    });
    res.status(200).json({
      msg: "update successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating profile" });
  }
};

// logout function
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({ msg: "Logged out!" });
};
