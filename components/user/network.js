const express = require("express");
const { success, error } = require("../../network/response");
const router = express.Router();
const controller = require("./controller");

router.post(
  "/",
  (req, res) => {
    const { body } = req;

    controller
      .registerUser(body)
      .then((data) => success(req, res, data, 201))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.post(
  "/login",
  (req, res) => {
    const { body } = req;
    const { email, password } = body;

    controller
      .login(email, password)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

module.exports = router;
