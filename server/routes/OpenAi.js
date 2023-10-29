const express = require("express")
const router = express.Router()

const { chatBox } = require("../controllers/chatbot")

router.post("/chatBox", chatBox)

module.exports = router