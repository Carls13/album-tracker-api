/* eslint-disable no-async-promise-executor */
const sectionStore = require("./store");
const userStore = require("./../user/store");

const markStickerAsAdded = (userData, sectionKey, stickerNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userStore.getUserDetails(userData.email);

      if (!user) {
        reject("User does not exist");
        return;
      }

      let userStickers = user.stickers;

      if (typeof userStickers[sectionKey] === "undefined") {
        reject("Incorrect section key");
        return;
      }

      if (userStickers[sectionKey].includes(stickerNumber)) {
        reject("Sticker is already marked as saved");
        return;
      }

      const newSectionStickersArray = [
        ...userStickers[sectionKey],
        stickerNumber,
      ];

      userStickers[sectionKey] = newSectionStickersArray;

      const newStickersData = await userStore.updateUserStickersData(
        userData.email,
        userStickers
      );

      resolve({ stickers: newStickersData });
    } catch (e) {
      reject(e.message);
    }
  });
};

const removeDuplicateSticker = (userData, sectionKey, stickerNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userStore.getUserDetails(userData.email);

      if (!user) {
        reject("User does not exist");
        return;
      }

      let userDuplicates = user.duplicates;

      if (typeof userDuplicates[sectionKey] === "undefined") {
        reject("Incorrect section key");
        return;
      }

      if (!userDuplicates[sectionKey].includes(stickerNumber)) {
        reject("Sticker is not marked as duplicate");
        return;
      }

      const newSectionDuplicatesArray = userDuplicates[sectionKey].filter(
        (sticker) => sticker !== stickerNumber
      );

      userDuplicates[sectionKey] = newSectionDuplicatesArray;

      const newDuplicatesData = await userStore.updateUserDuplicatesData(
        userData.email,
        userDuplicates
      );

      resolve({ duplicates: newDuplicatesData });
    } catch (e) {
      reject(e.message);
    }
  });
};

const markStickerAsDuplicate = (userData, sectionKey, stickerNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userStore.getUserDetails(userData.email);

      if (!user) {
        reject("User does not exist");
        return;
      }

      let userDuplicates = user.duplicates;

      if (typeof userDuplicates[sectionKey] === "undefined") {
        reject("Incorrect section key");
        return;
      }

      if (userDuplicates[sectionKey].includes(stickerNumber)) {
        reject("Sticker is already marked as duplicate");
        return;
      }

      const newSectionDuplicatesArray = [
        ...userDuplicates[sectionKey],
        stickerNumber,
      ];

      userDuplicates[sectionKey] = newSectionDuplicatesArray;

      const newDuplicatesData = await userStore.updateUserDuplicatesData(
        userData.email,
        userDuplicates
      );

      resolve({ duplicates: newDuplicatesData });
    } catch (e) {
      reject(e.message);
    }
  });
};

const removeAddedSticker = (userData, sectionKey, stickerNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userStore.getUserDetails(userData.email);

      if (!user) {
        reject("User does not exist");
        return;
      }

      let userStickers = user.stickers;

      if (typeof userStickers[sectionKey] === "undefined") {
        reject("Incorrect section key");
        return;
      }

      if (!userStickers[sectionKey].includes(stickerNumber)) {
        reject("Sticker is not marked as saved");
        return;
      }

      const newSectionStickersArray = userStickers[sectionKey].filter(
        (sticker) => sticker !== stickerNumber
      );

      userStickers[sectionKey] = newSectionStickersArray;

      const newStickersData = await userStore.updateUserStickersData(
        userData.email,
        userStickers
      );

      resolve({ stickers: newStickersData });
    } catch (e) {
      reject(e.message);
    }
  });
};

const addSection = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdData = await sectionStore.addSection(body);

      resolve(createdData);
    } catch (e) {
      reject(e.message);
    }
  });
};

const listAllSections = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sectionsList = await sectionStore.listAll();

      resolve(sectionsList);
    } catch (e) {
      reject(e.message);
    }
  });
};

module.exports = {
  addSection,
  listAllSections,
  markStickerAsAdded,
  removeAddedSticker,
  markStickerAsDuplicate,
  removeDuplicateSticker,
};
