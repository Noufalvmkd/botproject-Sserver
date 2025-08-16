const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser };
