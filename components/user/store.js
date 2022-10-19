const userModel = require("./model");
const bcrypt = require("bcryptjs");

const addUser = async (userData, emptyStickersObject) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userData.password, salt);
  const createdUser = await userModel.create({
    ...userData,
    password: hashedPassword,
    stickers: emptyStickersObject,
    duplicates: emptyStickersObject,
  });

  return createdUser;
};

const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email }).exec();

  return user;
};

const getUserDetails = async (email) => {
  const user = await userModel
    .findOne({ email })
    .select("email username country stickers duplicates")
    .exec();

  return user;
};

const updateUserStickersData = async (email, newStickersObject) => {
  const filter = {
    email,
  };

  const update = {
    stickers: newStickersObject,
  };

  const updatedUser = await userModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser.stickers;
};

const updateUserDuplicatesData = async (email, newDuplicatesObject) => {
  const filter = {
    email,
  };

  const update = {
    duplicates: newDuplicatesObject,
  };

  const updatedUser = await userModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser.duplicates;
};

module.exports = {
  addUser,
  findUserByEmail,
  getUserDetails,
  updateUserStickersData,
  updateUserDuplicatesData,
};
