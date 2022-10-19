const userModel = require("./model");
const bcrypt = require('bcryptjs');

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

module.exports = {
    addUser,
    findUserByEmail,
};