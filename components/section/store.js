const sectionModel = require("./model");

const addSection = async (sectionData) => {
    const data = await sectionModel.create(sectionData);

    return data;
};

const listAll = async () => {
    const sections = await sectionModel.find({});

    return sections;
};

module.exports = {
    addSection,
    listAll,
};