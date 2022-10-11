/* eslint-disable no-async-promise-executor */
const store = require('./store');

const addSection = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdData = await store.addSection(body);

            resolve(createdData);
        } catch (e) {
            reject(e.message);
        }
    });
};

const listAllSections = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sectionsList = await store.listAll();

            resolve(sectionsList);
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports = {
    addSection,
    listAllSections,
};