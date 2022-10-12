const express = require('express')
const Controller = require('../controller/Controller')
const Candidates = require('../views/Candidates')
const Interview = require('../views/Interview')

const router = express.Router()

router.post("/slots", Candidates.availableSlots, Controller.candidateController)
router.get("/list", Candidates.listCandidates, Controller.candidateController)

module.exports = router