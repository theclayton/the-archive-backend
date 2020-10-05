const { Project } = require('../models/project');
const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();


router.get('/', asyncHandler(async(req, res) => {
    const terms = req.query.terms

    const projects = await Project.find({ $text: { $search: terms } })

    res.send({ message: "success", projects: projects })
}));


module.exports = router;