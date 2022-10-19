const express = require("express");
const { success, error } = require("../../network/response");
const { verifyToken } = require("../../utils/token");
const router = express.Router();
const controller = require("./controller");

router.get("/", (req, res) => {
  controller
    .listAllSections()
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.post("/", (req, res) => {
  const { body } = req;

  controller
    .addSection(body)
    .then((data) => success(req, res, data, 201))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.post("/:sectionKey/sticker/:stickerNumber", verifyToken, (req, res) => {
  const { sectionKey, stickerNumber } = req.params;
  const { user } = req;

  controller
    .markStickerAsAdded(user, sectionKey, stickerNumber)
    .then((data) => success(req, res, data, 201))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.delete(
  "/:sectionKey/sticker/:stickerNumber",
  verifyToken,
  (req, res) => {
    const { sectionKey, stickerNumber } = req.params;
    const { user } = req;

    controller
      .removeAddedSticker(user, sectionKey, stickerNumber)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.post(
  "/:sectionKey/duplicate/:stickerNumber",
  verifyToken,
  (req, res) => {
    const { sectionKey, stickerNumber } = req.params;
    const { user } = req;

    controller
      .markStickerAsDuplicate(user, sectionKey, stickerNumber)
      .then((data) => success(req, res, data, 201))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.delete(
  "/:sectionKey/duplicate/:stickerNumber",
  verifyToken,
  (req, res) => {
    const { sectionKey, stickerNumber } = req.params;
    const { user } = req;

    controller
      .removeDuplicateSticker(user, sectionKey, stickerNumber)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

module.exports = router;
