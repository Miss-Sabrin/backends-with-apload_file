const User = require("./model");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const photo = req.file ? req.file.path : null;
      let correctedPath = photo
        ? process.env.IMAGE_URL + photo.replace(/\\/g, "/")
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      console.log("PHOTO", photo);
      console.log("password", password);
      console.log("username", username);
      console.log("name", name);

      const encryptedPassword = CryptoJS.AES.encrypt(
        password.toString(),
        process.env.PASS_SEC
      ).toString();

      const user = await User({
        username: username,
        password: encryptedPassword,
        name: name,
        photo: correctedPath,
      }).save();

      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        message: "user created successfully",
        data: { ...user._doc, token },
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  //todo login

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // console.log(user.password);
      const decryptedPassword = CryptoJS.AES.decrypt(
        user._doc.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);

      console.log(decryptedPassword);
      console.log(password);
      if (decryptedPassword != password) {
        return res.status(400).json({ error: "Wrong password" });
      }

      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        status: "success",
        data: { ...user._doc, token },
      });
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  },
//todo get users
getUsers: async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ status: "success", data: users });
  } catch (e) {
    res.status(401).json({ status: "fail", message: e.toString() });
  }
},




  //todo get user
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("id", id);
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.status(200).json({
        status: "success",
        data: { ...user._doc },
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, username, password, userType } = req.body;
      const photo = req.file ? req.file.path : null;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update fields if provided
      if (name) user.name = name;
      if (username) user.username = username;
      if (password) {
        user.password = CryptoJS.AES.encrypt(
          password.toString(),
          process.env.PASS_SEC
        ).toString();
      }
      if (photo) {
        user.photo = process.env.IMAGE_URL + photo.replace(/\\/g, "/");
      }
      if (userType) user.userType = userType;

      await user.save();

      return res.status(200).json({
        status: "success",
        data: { ...user._doc },
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  //todo update user
updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, username, password } = req.body;
      const photo = req.file ? req.file.path : null;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let updatedData = {
        name: name || user.name,
        username: username || user.username,
        photo: photo ? process.env.IMAGE_URL + photo.replace(/\\/g, "/") : user.photo,
      };

      if (password) {
        updatedData.password = CryptoJS.AES.encrypt(
          password.toString(),
          process.env.PASS_SEC
        ).toString();
      }

      await User.findByIdAndUpdate(id, updatedData, { new: true });

      const updatedUser = await User.findById(id);

      return res.status(200).json({
        status: "success",
        data: { ...updatedUser._doc },
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ status: "success", data: "succesfullay deleted" });
    } catch (e) {
      res.status(401).json({ status: "fail", message: e.toString() });
    }
  },

};
