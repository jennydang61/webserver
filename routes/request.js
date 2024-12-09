const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.post("/send", requestController.sendRequest);
router.post("/accept", requestController.acceptRequest);
router.post("/decline", requestController.declineRequest);
router.get("/status", requestController.getRequestStatus);

module.exports = router;
