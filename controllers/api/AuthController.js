const { User } = require("../../models");
const { generateToken } = require("../../helpers/jwt");
const bcrypt = require("bcryptjs");

const format = (user) => {
  const { id, fullname, email, username } = user;

  const payload = {
    id,
    email,
    username,
  };

  return {
    result: "success",
    message: "Login Berhasil!",
    data: {
      id,
      fullname,
      email,
      username,
      accessToken: generateToken(payload),
    },
  };
};

const index = async (req, res) => {
  res.send("API Binar Challenge Chapter 9");
};

const register = async (req, res) => {
  const { fullname, email, username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
      return res.status(401).json({
        result: "failed",
        message: "Username yang anda gunakan sudah terdaftar!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      result: "failed",
      error: err.message,
    });
  }

  try {
    const user = await User.create({
      fullname,
      email,
      username,
      password,
    });

    return res.status(201).json({
      result: "success",
      message: "Selamat, akun anda berhasil dibuat!",
      data: {
        fullname,
        email,
        username,
      },
    });
  } catch (err) {
    return res.status(400).json({
      result: "failed",
      message: "Registrasi gagal!",
      error: err.errors[0].message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        result: "failed",
        message: "User tidak ditemukan!",
      });
    }

    bcrypt.compare(password, user.password, function (err, matches) {
      if (err) {
        return res.status(401).json({
          result: "failed",
          message: "Terjadi kesalahan pada sistem!",
        });
      } else if (matches) {
        return res.status(200).json(format(user));
      } else {
        return res.status(401).json({
          result: "failed",
          message: "Password yang anda masukkan tidak sesuai!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      result: "failed",
      message: "Login gagal!",
      error: err.message,
    });
  }
};

module.exports = { index, register, login };
