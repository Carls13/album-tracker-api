/* eslint-disable no-async-promise-executor */
const sectionStore = require('./../section/store');
const userStore = require('./store');

const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/token');

const registerUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userWithEmail = await userStore.findUserByEmail(userData.email);

            if (userWithEmail) {
                reject("Email already used");
                return;
            }
            
            const allSections = await sectionStore.listAll();

            let emptyStickersData = {};
        
            for (const section of allSections) {
                const { key } = section;
                
                emptyStickersData[key] = [];
            }
        
            const createdUser = await userStore.addUser(userData, emptyStickersData);

            const token = generateToken(createdUser);

            resolve({ token });
        } catch (e) {
            reject(e.message);
        }
    });
};

const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userWithEmail = await userStore.findUserByEmail(email);
            if (!userWithEmail) reject("Invalid credentials");

            const isPasswordCorrect = bcrypt.compareSync(password, userWithEmail.password); 
            if (!isPasswordCorrect) reject("Invalid credentials");

            const token = generateToken(userWithEmail);
            resolve({ token });
        } catch (e) {
            reject(e.message);
        }
    });
}

const getUserDetails = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userStore.getUserDetails(email);

            resolve(user);
        } catch (e) {
            reject(e.message);
        } 
    })
  
}

module.exports = {
    registerUser,
    login,
    getUserDetails,
};