const express = require('express')
const Interview = require('../views/Interview')
const Candidate = require('../views/Candidates')
const Controller = require('../controller/Controller')

const router = express.Router();

router.get("/all",Interview.all, Controller.interviewController)
router.get("/details",Interview.queryDetails, Controller.interviewController);
router.post("/create",Interview.create, Candidate.sendEmails, Controller.interviewController);
router.post("/update",Interview.update, Candidate.sendEmails, Controller.interviewController);
router.post("/delete", Interview.delete, Candidate.sendEmails, Controller.interviewController);

module.exports = router;