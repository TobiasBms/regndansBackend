const express = require('express');
const router = express.Router();
const Draw = require("../models/Draw");

router.get("/:id", async function(req,res) {
    const theDrawing = await Draw.query().findById(req.params.id);
    res.status(200).json({data: theDrawing});
});

module.exports = router;